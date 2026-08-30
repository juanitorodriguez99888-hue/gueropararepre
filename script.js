// =====================================================================
// NAV MÓVIL
// =====================================================================
const navToggle = document.getElementById('navToggle');
const mainNav = document.getElementById('mainNav');

navToggle.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('is-open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

mainNav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mainNav.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// =====================================================================
// SCROLL REVEAL
// =====================================================================
document.querySelectorAll(
  '.section-title, .lead, .card-grid, .impact-grid, .stat-cards, .chart-block, .timeline, .video-grid, .gallery-grid, .source-list, .game, .callout'
).forEach(el => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// =====================================================================
// CONTADORES ANIMADOS
// =====================================================================
function animateCount(el) {
  const target = parseFloat(el.dataset.count);
  const isDecimal = el.dataset.count.includes('.');
  const duration = 1400;
  const start = performance.now();

  function tick(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = target * eased;
    el.textContent = isDecimal ? value.toFixed(2) : Math.round(value);
    if (progress < 1) requestAnimationFrame(tick);
    else el.textContent = isDecimal ? target.toFixed(2) : target;
  }
  requestAnimationFrame(tick);
}

const countObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCount(entry.target);
      countObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('[data-count]').forEach(el => countObserver.observe(el));

// =====================================================================
// JUEGO: CLASIFICA EL RESIDUO
// =====================================================================
const MATERIALS = [
  { name: 'Concreto',        bin: 'inerte' },
  { name: 'Ladrillo',        bin: 'inerte' },
  { name: 'Piedra / tierra', bin: 'inerte' },
  { name: 'Madera',          bin: 'no-peligroso' },
  { name: 'Metal (fierro)',  bin: 'no-peligroso' },
  { name: 'Plástico',        bin: 'no-peligroso' },
  { name: 'Vidrio',          bin: 'no-peligroso' },
  { name: 'Cartón',          bin: 'no-peligroso' },
  { name: 'Pintura / solvente', bin: 'peligroso' },
  { name: 'Asbesto',         bin: 'peligroso' },
];

const chipsContainer = document.getElementById('gameChips');
const statusEl = document.getElementById('gameStatus');
const scoreEl = document.getElementById('gameScore');
const totalEl = document.getElementById('gameTotal');
const resetBtn = document.getElementById('gameReset');
const bins = document.querySelectorAll('.bin');

let selectedChip = null;
let score = 0;
let answered = 0;

function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}

function buildGame() {
  chipsContainer.innerHTML = '';
  score = 0;
  answered = 0;
  selectedChip = null;
  scoreEl.textContent = '0';
  totalEl.textContent = String(MATERIALS.length);
  statusEl.textContent = 'Selecciona un material para comenzar.';
  bins.forEach(b => { b.disabled = false; b.classList.remove('is-target'); });

  shuffle(MATERIALS).forEach(mat => {
    const chip = document.createElement('button');
    chip.type = 'button';
    chip.className = 'chip';
    chip.textContent = mat.name;
    chip.dataset.bin = mat.bin;
    chip.addEventListener('click', () => selectChip(chip));
    chipsContainer.appendChild(chip);
  });
}

function selectChip(chip) {
  if (chip.classList.contains('is-done')) return;
  if (selectedChip) selectedChip.classList.remove('is-selected');
  selectedChip = chip;
  chip.classList.add('is-selected');
  statusEl.textContent = `"${chip.textContent}" seleccionado — ahora toca el contenedor correcto.`;
}

bins.forEach(bin => {
  bin.addEventListener('click', () => {
    if (!selectedChip) {
      statusEl.textContent = 'Primero selecciona un material de la lista.';
      return;
    }
    const correct = selectedChip.dataset.bin === bin.dataset.bin;
    answered++;

    if (correct) {
      score++;
      selectedChip.classList.add('is-correct');
      statusEl.textContent = `¡Correcto! "${selectedChip.textContent}" va en ${bin.querySelector('.bin-name').textContent.toLowerCase()}.`;
    } else {
      selectedChip.classList.add('is-wrong');
      statusEl.textContent = `No exactamente. "${selectedChip.textContent}" no va en ${bin.querySelector('.bin-name').textContent.toLowerCase()}. Intenta con el siguiente.`;
    }

    scoreEl.textContent = String(score);
    selectedChip.classList.remove('is-selected');
    selectedChip.classList.add('is-done');
    selectedChip = null;

    if (answered === MATERIALS.length) {
      bins.forEach(b => b.disabled = true);
      setTimeout(() => {
        statusEl.textContent = `Terminaste: ${score} de ${MATERIALS.length} correctos. Toca "Reiniciar" para volver a intentarlo.`;
      }, 300);
    }
  });
});

resetBtn.addEventListener('click', buildGame);

buildGame();
