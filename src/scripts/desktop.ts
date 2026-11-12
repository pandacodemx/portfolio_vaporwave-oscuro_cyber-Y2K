type State = 'open' | 'maximized' | 'minimized' | 'closed';
const windows = Array.from(document.querySelectorAll<HTMLElement>('[data-window]'));
const tray = document.getElementById('taskbar-windows');
const startBtn = document.getElementById('start-button');
const startMenu = document.getElementById('start-menu');
const mobile = window.matchMedia('(max-width: 639px)');
let layer = 10;
let active: HTMLElement | undefined;
const previous = new Map<HTMLElement, State>();
const stateOf = (win: HTMLElement) => win.dataset.state as State;
const visible = (win: HTMLElement) => ['open', 'maximized'].includes(stateOf(win));
const titleOf = (win: HTMLElement) => win.querySelector('h2')?.textContent?.trim() ?? win.id;
const buttonFor = (win: HTMLElement) => tray?.querySelector<HTMLButtonElement>(`[data-restore="${win.id}"]`);

function sync() {
  for (const win of windows) {
    const state = stateOf(win);
    win.hidden = !visible(win);
    win.classList.toggle('is-maximized', state === 'maximized');
    win.dataset.active = String(win === active && visible(win));
    let button = buttonFor(win);
    if (state === 'closed') { button?.remove(); continue; }
    if (!button && tray) {
      button = document.createElement('button');
      button.type = 'button';
      button.className = 'taskbtn';
      button.dataset.restore = win.id;
      const marker = document.createElement('span');
      marker.className = 'sparkle block size-3 shrink-0 bg-neon-pink';
      marker.setAttribute('aria-hidden', 'true');
      const label = document.createElement('span');
      label.className = 'truncate';
      label.textContent = titleOf(win);
      button.append(marker, label);
      tray.append(button);
    }
    button?.setAttribute('aria-pressed', String(win === active && visible(win)));
    const max = win.querySelector<HTMLElement>('[data-window-action="maximize"]');
    const label = state === 'maximized' ? max?.dataset.labelRestore : max?.dataset.labelMax;
    if (max && label) { max.setAttribute('aria-label', label); max.title = label; }
  }
  if (tray) tray.dataset.count = String(tray.children.length);
}

function focusWindow(win: HTMLElement, moveFocus = true) {
  if (mobile.matches) {
    windows.filter((other) => other !== win && visible(other)).forEach((other) => {
      previous.set(other, stateOf(other)); other.dataset.state = 'minimized';
    });
  }
  active = win;
  win.style.zIndex = String(++layer);
  sync();
  if (moveFocus) win.focus({ preventScroll: true });
}

function setState(win: HTMLElement, next: State) {
  if (visible(win)) previous.set(win, stateOf(win));
  win.dataset.state = next;
  if (visible(win)) focusWindow(win);
  else {
    const top = windows.filter(visible).sort((a, b) => Number(b.style.zIndex) - Number(a.style.zIndex))[0];
    active = top;
    sync();
    if (top) top.focus({ preventScroll: true });
    else if (next === 'minimized') buttonFor(win)?.focus();
    else document.querySelector<HTMLElement>(`.desktop-shortcut[href="#${win.id.replace('win-', '')}"]`)?.focus();
  }
}

function openSection(id: string) {
  const win = document.getElementById(`win-${id}`);
  if (!win?.matches('[data-window]')) return false;
  if (!visible(win)) win.dataset.state = previous.get(win) ?? 'open';
  focusWindow(win);
  return true;
}

function setMenu(open: boolean, returnFocus = false) {
  if (!startMenu || !startBtn) return;
  startMenu.hidden = !open;
  startBtn.setAttribute('aria-expanded', String(open));
  if (open) startMenu.querySelector<HTMLElement>('[role="menuitem"]')?.focus();
  else if (returnFocus) startBtn.focus();
}

// Enable the desktop only once its controls are ready; without JS the content stays readable.
windows.forEach((win, i) => {
  win.dataset.state = win.id === 'win-welcome' ? 'open' : 'closed';
  win.style.setProperty('--window-offset', `${i * 22}px`);
});
document.documentElement.dataset.desktop = 'ready';
openSection(location.hash.slice(1) || 'welcome') || openSection('welcome');

function clampPosition(win: HTMLElement) {
  const workspace = document.getElementById('desktop-workspace');
  if (!workspace) return;
  const rect = win.getBoundingClientRect();
  win.style.left = `${Math.max(0, Math.min(rect.left, workspace.clientWidth - rect.width))}px`;
  win.style.top = `${Math.max(0, Math.min(rect.top, workspace.clientHeight - rect.height))}px`;
}

let drag: { win: HTMLElement; pointer: number; x: number; y: number; left: number; top: number; handle: HTMLElement } | undefined;
document.addEventListener('pointerdown', (event) => {
  const target = event.target;
  if (!(target instanceof Element)) return;
  if (!startMenu?.hidden && !target.closest('#start-menu, #start-button')) setMenu(false);
  const win = target.closest<HTMLElement>('[data-window]');
  if (!win) return;
  focusWindow(win, false);
  const handle = target.closest<HTMLElement>('[data-window-handle]');
  if (!handle || target.closest('button') || event.button !== 0 || mobile.matches || stateOf(win) === 'maximized') return;
  const rect = win.getBoundingClientRect();
  drag = { win, pointer: event.pointerId, x: event.clientX, y: event.clientY, left: rect.left, top: rect.top, handle };
  handle.setPointerCapture(event.pointerId);
  win.classList.add('is-dragging');
  event.preventDefault();
});
document.addEventListener('pointermove', (event) => {
  if (!drag || drag.pointer !== event.pointerId) return;
  drag.win.style.left = `${drag.left + event.clientX - drag.x}px`;
  drag.win.style.top = `${drag.top + event.clientY - drag.y}px`;
  clampPosition(drag.win);
});
function endDrag() { drag?.win.classList.remove('is-dragging'); drag = undefined; }
document.addEventListener('pointerup', endDrag);
document.addEventListener('pointercancel', endDrag);
document.addEventListener('lostpointercapture', endDrag);
document.addEventListener('focusin', (event) => {
  const win = (event.target as Element)?.closest<HTMLElement>('[data-window]');
  if (win && win !== active) focusWindow(win, false);
});
document.addEventListener('dblclick', (event) => {
  const target = event.target as Element;
  const win = target.closest<HTMLElement>('[data-window]');
  if (win && target.closest('[data-window-handle]') && !target.closest('button')) setState(win, stateOf(win) === 'maximized' ? 'open' : 'maximized');
});
document.addEventListener('click', (event) => {
  const target = event.target as Element;
  const action = target.closest<HTMLElement>('[data-window-action]');
  if (action) {
    const win = action.closest<HTMLElement>('[data-window]');
    if (!win) return;
    const next = action.dataset.windowAction;
    if (next === 'maximize') setState(win, stateOf(win) === 'maximized' ? 'open' : 'maximized');
    else setState(win, next === 'minimize' ? 'minimized' : 'closed');
    return;
  }
  const restore = target.closest<HTMLElement>('[data-restore]');
  if (restore) {
    const win = document.getElementById(restore.dataset.restore ?? '');
    if (win) setState(win, active === win && visible(win) ? 'minimized' : previous.get(win) ?? 'open');
    return;
  }
  if (target.closest('#start-button')) { setMenu(!!startMenu?.hidden); return; }
  if (target.closest('#show-desktop')) {
    const shown = windows.filter(visible);
    if (shown.length) {
      shown.forEach((win) => { previous.set(win, stateOf(win)); win.dataset.state = 'minimized'; });
      active = undefined; sync();
    } else {
      const minimized = windows.filter((win) => stateOf(win) === 'minimized');
      (mobile.matches ? minimized.slice(-1) : minimized).forEach((win) => setState(win, previous.get(win) ?? 'open'));
    }
    return;
  }
  if (target.closest('[data-start-action="restore-all"]')) {
    (mobile.matches ? windows.slice(0, 1) : windows).forEach((win) => setState(win, 'open'));
    setMenu(false); return;
  }
  const link = target.closest<HTMLAnchorElement>('a[href^="#"]');
  const id = link?.getAttribute('href')?.slice(1);
  if (id && openSection(id)) {
    event.preventDefault(); history.replaceState(null, '', `#${id}`); setMenu(false);
  }
});
window.addEventListener('hashchange', () => openSection(location.hash.slice(1) || 'welcome'));
window.addEventListener('resize', () => {
  if (mobile.matches && active) focusWindow(active, false);
  else windows.filter((win) => visible(win) && stateOf(win) !== 'maximized').forEach(clampPosition);
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    if (startMenu && !startMenu.hidden) setMenu(false, true);
    else if (active && stateOf(active) === 'maximized') setState(active, 'open');
  }
  if (startMenu && !startMenu.hidden && ['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) {
    event.preventDefault();
    const items = Array.from(startMenu.querySelectorAll<HTMLElement>('[role="menuitem"]'));
    const current = items.indexOf(document.activeElement as HTMLElement);
    const next = event.key === 'Home' ? 0 : event.key === 'End' ? items.length - 1 : (current + (event.key === 'ArrowDown' ? 1 : -1) + items.length) % items.length;
    items[next]?.focus();
  }
});
