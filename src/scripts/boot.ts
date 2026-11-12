/**
 * Pantalla de arranque: líneas de texto + barra de carga (~2.5 s).
 * - Se salta con clic, toque o cualquier tecla.
 * - Solo se muestra una vez por sesión del navegador.
 * - Si el sistema pide movimiento reducido, el <head> ya la salta.
 */
const root = document.documentElement;
const boot = document.getElementById('boot');

if (boot && root.dataset.boot !== 'skip') {
  const lines: string[] = JSON.parse(boot.dataset.lines ?? '[]');
  const list = document.getElementById('boot-lines');
  const bar = document.getElementById('boot-bar');

  const DURATION = 2200;
  let finished = false;
  let shown = 0;
  const startedAt = performance.now();

  const finish = () => {
    if (finished) return;
    finished = true;

    try {
      sessionStorage.setItem('booted', '1');
    } catch {
      /* modo privado: se mostrará de nuevo en la próxima visita */
    }

    window.removeEventListener('keydown', finish);
    boot.removeEventListener('pointerdown', finish);

    boot.classList.add('boot-out');
    window.setTimeout(() => {
      root.dataset.boot = 'done';
    }, 450);
  };

  const tick = (now: number) => {
    if (finished) return;

    const progress = Math.min((now - startedAt) / DURATION, 1);
    if (bar) bar.style.width = `${Math.round(progress * 100)}%`;

    // Una línea nueva cada tramo del progreso
    const target = Math.min(lines.length, Math.floor(progress * (lines.length + 1)));
    while (list && shown < target) {
      const item = document.createElement('li');
      item.textContent = `> ${lines[shown]}`;
      list.append(item);
      shown += 1;
    }

    if (progress < 1) requestAnimationFrame(tick);
    else window.setTimeout(finish, 300);
  };

  window.addEventListener('keydown', finish);
  boot.addEventListener('pointerdown', finish);
  requestAnimationFrame(tick);
}