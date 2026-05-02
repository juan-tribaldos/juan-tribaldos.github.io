
// ── CONFIGURACIÓN ─────────────────────────────────────────
const DRAW_CONFIG = {
  // Color del trazo. Acepta cualquier valor CSS:
  //   'black'  '#00FF88'  'rgba(0,0,0,0.8)'
  // También puede ser 'auto' para que cambie según velocidad
  // (negro lento → gris rápido, efecto presión de pluma)
  color: 'black',

  // Grosor mínimo y máximo en px
  minWidth: 0.4,
  maxWidth: 4.0,

  // Velocidad (px/frame) a partir de la cual se aplica maxWidth.
  // Movimientos más lentos = trazo más fino.
  maxSpeed: 28,
};
// ─────────────────────────────────────────────────────────

let prevX = null;
let prevY = null;
let isDrawing = false;
let lastSpeed = 1;

function getLineWidth(dx, dy) {
  const speed = Math.sqrt(dx * dx + dy * dy);
  lastSpeed = speed;
  const t = Math.min(speed / DRAW_CONFIG.maxSpeed, 1);
  return DRAW_CONFIG.minWidth + t * (DRAW_CONFIG.maxWidth - DRAW_CONFIG.minWidth);
}

function getColor(speed) {
  if (DRAW_CONFIG.color !== 'auto') return DRAW_CONFIG.color;
  // Modo auto: movimiento lento = negro denso, rápido = gris suave
  const t = Math.min(speed / DRAW_CONFIG.maxSpeed, 1);
  const lightness = Math.round(t * 55); // 0% (negro) → 55% (gris medio)
  return `hsl(0, 0%, ${lightness}%)`;
}

function drawLine(x, y) {
  if (prevX === null || prevY === null) {
    prevX = x;
    prevY = y;
    return;
  }

  const dx = x - prevX;
  const dy = y - prevY;
  const length = Math.sqrt(dx * dx + dy * dy);

  if (length < 0.5) return; // ignora micro-movimientos

  const angle = Math.atan2(dy, dx) * (180 / Math.PI);
  const width = getLineWidth(dx, dy);
  const color = getColor(lastSpeed);

  const line = document.createElement('div');
  line.className = 'line';
  line.style.cssText = `
    width: ${length}px;
    height: ${width}px;
    position: absolute;
    left: ${prevX}px;
    top: ${prevY - width / 2}px;
    transform: rotate(${angle}deg);
    transform-origin: 0 50%;
    background-color: ${color};
    border-radius: ${width > 1.5 ? width / 2 : 0}px;
    pointer-events: none;
  `;

  document.body.appendChild(line);

  prevX = x;
  prevY = y;
}

document.addEventListener('mousemove', (event) => {
  drawLine(event.clientX, event.clientY);
});

document.addEventListener('touchstart', (event) => {
  if (event.target.tagName === 'A') return;
  event.preventDefault();
  isDrawing = true;
  const touch = event.touches[0];
  prevX = touch.clientX;
  prevY = touch.clientY;
});

document.addEventListener('touchmove', (event) => {
  if (!isDrawing) return;
  event.preventDefault();
  const touch = event.touches[0];
  drawLine(touch.clientX, touch.clientY);
});

document.addEventListener('touchend', () => {
  isDrawing = false;
  prevX = null;
  prevY = null;
});