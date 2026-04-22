/* ============================================================
   CITIGOV — app.js
   Interactive Dashboard Logic
   ============================================================ */

'use strict';

// ── Utility ──────────────────────────────────────────────────
const qs  = (sel, root = document) => root.querySelector(sel);
const qsa = (sel, root = document) => [...root.querySelectorAll(sel)];
const lerp = (a, b, t) => a + (b - a) * t;

/* ── IntersectionObserver for reveal animations ──────────── */
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('in-view');
      if (e.target.dataset.revealOnce !== 'false') revealObs.unobserve(e.target);
    }
  });
}, { threshold: 0.15 });

/* ═══════════════════════════════════════════════════════════
   1. NAVIGATION
═══════════════════════════════════════════════════════════ */
function initNav() {
  const navbar    = qs('#navbar');
  const hamburger = qs('#hamburger');
  const navLinks  = qs('#navLinks');
  const links     = qsa('.nav-link');

  // Hamburger toggle
  hamburger.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', open);
  });

  // Close on link click (mobile)
  links.forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('open'));
  });

  // Active link on scroll
  const sections = qsa('section[id]');
  const onScroll = () => {
    const scrollY = window.scrollY + 100;
    sections.forEach(sec => {
      const top    = sec.offsetTop;
      const height = sec.offsetHeight;
      const id     = sec.getAttribute('id');
      if (scrollY >= top && scrollY < top + height) {
        links.forEach(l => l.classList.toggle('active', l.dataset.section === id));
      }
    });
    // Navbar shadow on scroll
    navbar.style.boxShadow = window.scrollY > 10
      ? '0 4px 24px rgba(0,0,0,.5)'
      : '0 4px 24px rgba(0,0,0,.4)';
  };
  window.addEventListener('scroll', onScroll, { passive: true });

  // Smooth scroll for nav links
  links.forEach(link => {
    link.addEventListener('click', e => {
      const target = qs(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

/* ═══════════════════════════════════════════════════════════
   2. SECTION 1 — TRUST GAUGE (Semicircle)
═══════════════════════════════════════════════════════════ */
function initGauge() {
  const ctx = qs('#gaugeChart')?.getContext('2d');
  if (!ctx) return;

  const value = 54;
  const remaining = 100 - value;

  const gaugeChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      datasets: [{
        data: [value, remaining],
        backgroundColor: [
          createGradient(ctx, ['#2563eb', '#0ea5e9']),
          'rgba(255,255,255,0.05)'
        ],
        borderWidth: 0,
        borderRadius: 6,
        hoverOffset: 0,
      }]
    },
    options: {
      rotation: -90,
      circumference: 180,
      cutout: '75%',
      responsive: false,
      animation: { duration: 1400, easing: 'easeOutQuart' },
      plugins: { legend: { display: false }, tooltip: { enabled: false } },
    }
  });

  // Count-up animation for gauge number
  animateNumber(qs('#gaugeNumber'), 0, 54, 1400);

  return gaugeChart;
}

function createGradient(ctx, colors) {
  const g = ctx.createLinearGradient(0, 0, 260, 0);
  colors.forEach((c, i) => g.addColorStop(i / (colors.length - 1), c));
  return g;
}

/* ═══════════════════════════════════════════════════════════
   3. SECTOR COMPARISON BAR CHART
═══════════════════════════════════════════════════════════ */
function initSectorChart() {
  const ctx = qs('#sectorChart')?.getContext('2d');
  if (!ctx) return;

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: [
        'Gov Services', 'Banking & BFSI', 'Healthcare', 'Education', 
        'Retail & E-comm', 'Telecom', 'IT & Tech', 'Media & Ent.',
        'Transport', 'Energy & Power', 'Manufacturing', 'Agriculture'
      ],
      datasets: [
        {
          label: 'Public Sector Trust %',
          data: [42, 44, 55, 49, 38, 41, 45, 33, 47, 50, 43, 58],
          backgroundColor: 'rgba(37, 99, 235, 0.8)',
          borderColor: 'rgba(37, 99, 235, 1)',
          borderWidth: 1,
          borderRadius: 4,
        },
        {
          label: 'Private Sector Trust %',
          data: [null, 62, 58, 52, 68, 52, 71, 48, 55, 53, 61, null],
          backgroundColor: 'rgba(14, 165, 233, 0.75)',
          borderColor: 'rgba(14, 165, 233, 1)',
          borderWidth: 1,
          borderRadius: 4,
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      animation: { duration: 1200, easing: 'easeOutQuart', delay: ctx => ctx.dataIndex * 80 },
      plugins: {
        legend: {
          display: true,
          position: 'top',
          labels: {
            color: '#94a3b8', font: { size: 10, weight: '600' },
            boxWidth: 12, padding: 15
          }
        },
        tooltip: {
          callbacks: {
            label: (c) => c.raw !== null ? ` ${c.raw}% citizen trust` : ''
          },
          backgroundColor: 'rgba(10, 22, 40, 0.95)',
          borderColor: 'rgba(14, 165, 233, 0.3)',
          borderWidth: 1,
        }
      },
      scales: {
        x: {
          grid: { display: false, color: 'rgba(255,255,255,0.04)' },
          ticks: { 
            color: '#94a3b8', 
            font: { size: 11, weight: '500' }, 
            maxRotation: 45, 
            minRotation: 45,
            autoSkip: false,
            padding: 8
          }
        },
        y: {
          grid: { color: 'rgba(255,255,255,0.06)' },
          ticks: { color: '#94a3b8', font: { size: 12, weight: '500' }, callback: v => v + '%' },
          max: 90, min: 0
        }
      }
    }
  });
}

/* ═══════════════════════════════════════════════════════════
   4. REGIONAL HEATMAP
═══════════════════════════════════════════════════════════ */
const regions = [
  { name: 'Kerala',       flag: '🇮🇳', pct: 72, tier: 'high' },
  { name: 'Tamil Nadu',   flag: '🇮🇳', pct: 68, tier: 'high' },
  { name: 'Karnataka',    flag: '🇮🇳', pct: 65, tier: 'high' },
  { name: 'Gujarat',      flag: '🇮🇳', pct: 61, tier: 'high' },
  { name: 'Maharashtra',  flag: '🇮🇳', pct: 58, tier: 'high' },
  { name: 'India Avg',    flag: '🇮🇳', pct: 54, tier: 'mid'  },
  { name: 'Uttar Pradesh',flag: '🇮🇳', pct: 48, tier: 'mid'  },
  { name: 'Bihar',        flag: '🇮🇳', pct: 42, tier: 'low'  },
  { name: 'Other States', flag: '🇮🇳', pct: 39, tier: 'low'  },
];

const globalRegions = [
  { name: 'Singapore',    flag: '🇸🇬', pct: 67, tier: 'high' },
  { name: 'Australia',    flag: '🇦🇺', pct: 59, tier: 'high' },
  { name: 'Canada',       flag: '🇨🇦', pct: 53, tier: 'mid'  },
  { name: 'Netherlands',  flag: '🇳🇱', pct: 48, tier: 'mid'  },
  { name: 'United States',flag: '🇺🇸', pct: 29, tier: 'low'  },
  { name: 'Japan',        flag: '🇯🇵', pct: 25, tier: 'low'  }
];

function renderRegions(filter = 'all') {
  const list = qs('#regionList');
  const gList = qs('#globalList');
  if (!list || !gList) return;

  list.innerHTML = '';
  gList.innerHTML = '';

  const filtered = filter === 'all' ? regions : regions.filter(r => r.tier === filter);
  const gFiltered = filter === 'all' ? globalRegions : globalRegions.filter(r => r.tier === filter);

  filtered.forEach(r => list.appendChild(createRegionItem(r)));
  gFiltered.forEach(r => gList.appendChild(createRegionItem(r)));
}

function createRegionItem(r) {
  const item = document.createElement('div');
  item.className = 'region-item';
  item.setAttribute('role', 'listitem');
  item.innerHTML = `
    <div style="display:flex;align-items:center;gap:8px;">
      <span class="region-flag">${r.flag}</span>
      <span class="region-name">${r.name}</span>
    </div>
    <span class="region-pct">${r.pct}%</span>
    <div class="region-bar">
      <div class="region-fill ${r.tier}" style="width:0%" data-target="${r.pct}%"></div>
    </div>`;
  setTimeout(() => {
    const f = item.querySelector('.region-fill');
    if (f) f.style.width = r.pct + '%';
  }, 100);
  return item;
}

function initRegions() {
  renderRegions();
  qsa('.filter-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      qsa('.filter-tab').forEach(b => { b.classList.remove('active'); b.setAttribute('aria-selected', 'false'); });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');
      renderRegions(btn.dataset.filter);
    });
  });
}

/* ═══════════════════════════════════════════════════════════
   5. PILLAR CARDS (expand/collapse)
═══════════════════════════════════════════════════════════ */
function initPillars() {
  qsa('.pillar-card').forEach(card => {
    const toggle = () => {
      const detailId = card.getAttribute('aria-controls');
      const detail   = qs('#' + detailId);
      const isOpen   = card.getAttribute('aria-expanded') === 'true';

      // Close all others
      qsa('.pillar-card[aria-expanded="true"]').forEach(c => {
        if (c !== card) {
          c.setAttribute('aria-expanded', 'false');
          const d = qs('#' + c.getAttribute('aria-controls'));
          if (d) d.classList.remove('open');
        }
      });

      card.setAttribute('aria-expanded', !isOpen);
      if (detail) detail.classList.toggle('open', !isOpen);

      // Animate progress fills inside
      if (!isOpen && detail) {
        setTimeout(() => {
          detail.querySelectorAll('.progress-fill[data-target]').forEach(fill => {
            fill.style.width = fill.dataset.target;
          });
        }, 100);
      }
    };

    card.addEventListener('click', toggle);
    card.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); } });
  });
}

/* ═══════════════════════════════════════════════════════════
   6. COUNT-UP ANIMATION
═══════════════════════════════════════════════════════════ */
function animateNumber(el, from, to, duration) {
  if (!el) return;
  const start = performance.now();
  const update = (now) => {
    const t = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - t, 3);
    el.textContent = Math.round(lerp(from, to, eased));
    if (t < 1) requestAnimationFrame(update);
  };
  requestAnimationFrame(update);
}

/* ═══════════════════════════════════════════════════════════
   7. PAIN POINT BAR ANIMATION (IntersectionObserver)
═══════════════════════════════════════════════════════════ */
function initPainBars() {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const bars   = e.target.querySelectorAll('.pain-bar-inner[data-target]');
      const counts = e.target.querySelectorAll('.count-up[data-target]');
      bars.forEach(bar => { setTimeout(() => { bar.style.width = bar.dataset.target + '%'; }, 200); });
      counts.forEach(span => { animateNumber(span, 0, +span.dataset.target, 1200); });
      obs.unobserve(e.target);
    });
  }, { threshold: 0.3 });
  const section = qs('#reality-gap');
  if (section) obs.observe(section);
}

/* ═══════════════════════════════════════════════════════════
   8. JOURNEY MAP
═══════════════════════════════════════════════════════════ */
const journeyBefore = [
  { icon: '🔍', title: 'Finding the right agency', desc: 'Citizens search across 6+ websites', frustration: 'high',   level: 'High Friction' },
  { icon: '🔐', title: 'Multiple logins required', desc: 'Different credentials per service', frustration: 'high',   level: 'High Friction' },
  { icon: '📄', title: 'Redundant form filling',   desc: 'Same data entered 3–5 times',      frustration: 'high',   level: 'High Friction' },
  { icon: '⏳', title: 'Long wait & follow-up',    desc: 'No status updates; repeated calls', frustration: 'med', level: 'Medium Friction' },
  { icon: '😞', title: 'Outcome uncertainty',      desc: 'No clear notification or resolution', frustration: 'med', level: 'Medium Friction' },
];
const journeyAfter = [
  { icon: '✅', title: 'Single unified portal',   desc: 'One site for all government services', frustration: 'low', level: 'Minimal Friction' },
  { icon: '🛂', title: 'Digital Identity login',  desc: 'One secure login for all services',    frustration: 'low', level: 'Minimal Friction' },
  { icon: '📱', title: 'Pre-filled smart forms',  desc: 'Data reused from your profile',        frustration: 'low', level: 'Minimal Friction' },
  { icon: '🔔', title: 'Real-time notifications', desc: 'SMS/email status at every step',       frustration: 'low', level: 'Minimal Friction' },
  { icon: '🎉', title: 'Instant resolution',      desc: 'Clear confirmation + next steps',      frustration: 'low', level: 'Low Friction' },
];

function renderJourney(steps) {
  const map = qs('#journeyMap');
  if (!map) return;
  map.innerHTML = '';
  steps.forEach((step, i) => {
    const div = document.createElement('div');
    div.className = 'journey-step';
    div.style.animationDelay = (i * 80) + 'ms';
    div.innerHTML = `
      <div class="step-node ${step.frustration}">${step.icon}</div>
      <div class="step-content">
        <div class="step-title">${step.title}</div>
        <div class="step-desc">${step.desc}</div>
        <span class="step-frustration ${step.frustration}">${step.level}</span>
      </div>`;
    map.appendChild(div);
  });
}

function initJourney() {
  renderJourney(journeyBefore);
  const beforeBtn = qs('#beforeBtn');
  const afterBtn  = qs('#afterBtn');
  if (!beforeBtn || !afterBtn) return;

  beforeBtn.addEventListener('click', () => {
    beforeBtn.classList.add('active');   beforeBtn.setAttribute('aria-pressed', 'true');
    afterBtn.classList.remove('active'); afterBtn.setAttribute('aria-pressed', 'false');
    renderJourney(journeyBefore);
  });
  afterBtn.addEventListener('click', () => {
    afterBtn.classList.add('active');     afterBtn.setAttribute('aria-pressed', 'true');
    beforeBtn.classList.remove('active'); beforeBtn.setAttribute('aria-pressed', 'false');
    renderJourney(journeyAfter);
  });
}

/* ═══════════════════════════════════════════════════════════
   9. BARRIER ANALYSIS MATRIX
═══════════════════════════════════════════════════════════ */
const barriers = [
  { icon: '🔐', label: 'Security & Privacy',   x: 75, y: 75, severity: 'high-sev'    },
  { icon: '🧩', label: 'Complexity & UX',       x: 70, y: 60, severity: 'medium-sev'  },
  { icon: '📚', label: 'Digital Literacy',      x: 40, y: 65, severity: 'medium-sev'  },
  { icon: '👁️', label: 'Lack of Transparency',  x: 55, y: 40, severity: 'medium-sev'  },
];

function initBarriers() {
  const dotsContainer = qs('#barrierDots');
  if (!dotsContainer) return;

  barriers.forEach((b, i) => {
    const dot = document.createElement('div');
    dot.className = `barrier-dot ${b.severity}`;
    dot.textContent = b.icon;
    dot.style.left = b.x + '%';
    dot.style.top  = (100 - b.y) + '%';
    dot.setAttribute('role', 'listitem');
    dot.setAttribute('aria-label', b.label);
    dot.title = b.label;
    dotsContainer.appendChild(dot);
    setTimeout(() => dot.classList.add('show'), 300 + i * 150);
  });

  // Barrier cards
  const bpFills = qsa('.bp-fill[data-target]');
  const cardObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      bpFills.forEach(f => { f.style.width = f.dataset.target + '%'; });
      cardObs.unobserve(e.target);
    });
  }, { threshold: 0.3 });
  const section = qs('#barriers');
  if (section) cardObs.observe(section);

  // Solution toggling removed as requested
}

/* ═══════════════════════════════════════════════════════════
   10. ADOPTION IMPACT SIMULATOR
═══════════════════════════════════════════════════════════ */
let adoptionChart;

function buildAdoptionGauge() {
  const ctx = qs('#adoptionGauge')?.getContext('2d');
  if (!ctx) return;
  adoptionChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      datasets: [{
        data: [55, 45],
        backgroundColor: ['rgba(34,197,94,0.8)', 'rgba(255,255,255,0.05)'],
        borderWidth: 0, borderRadius: 4, hoverOffset: 0,
      }]
    },
    options: {
      rotation: -90, circumference: 180, cutout: '75%',
      responsive: false,
      animation: { duration: 600 },
      plugins: { legend: { display: false }, tooltip: { enabled: false } },
    }
  });
}

function updateSimulator() {
  const vals = [1,2,3,4].map(i => +qs(`#slider${i}`).value);
  vals.forEach((v, i) => {
    qs(`#val${i+1}`).textContent = v + '%';
  });

  const baseline = 42;
  const contributions = vals.map((v, i) => {
    const baselines = [51, 56, 55, 58];
    return parseFloat(((v / baselines[i]) * [12.8, 14.0, 13.8, 14.5][i]).toFixed(1));
  });
  const total = contributions.reduce((a, b) => a + b, 0);
  const projected = Math.min(Math.round(baseline + total * 0.4), 98);

  // Update gauge
  if (adoptionChart) {
    adoptionChart.data.datasets[0].data = [projected, 100 - projected];
    adoptionChart.update();
  }
  qs('#adoptionResult').textContent = projected + '%';
  const diff = projected - baseline;
  qs('#adoptionChange').innerHTML = `<span class="trend-up">↑ +${diff}pp vs baseline</span>`;

  // Breakdown
  const ids = ['breakdown1','breakdown2','breakdown3','breakdown4'];
  contributions.forEach((c, i) => {
    qs('#' + ids[i]).textContent = '+' + c.toFixed(1) + 'pp';
  });
  qs('#breakdownTotal').textContent = '+' + total.toFixed(1) + 'pp';
}

function initSimulator() {
  buildAdoptionGauge();
  [1,2,3,4].forEach(i => {
    qs(`#slider${i}`)?.addEventListener('input', updateSimulator);
  });
  qs('#resetSliders')?.addEventListener('click', () => {
    const defaults = [51, 56, 55, 58];
    [1,2,3,4].forEach(i => {
      const sl = qs(`#slider${i}`);
      if (sl) sl.value = defaults[i-1];
    });
    updateSimulator();
  });
  updateSimulator();
}

/* ═══════════════════════════════════════════════════════════
   11. STORY TIMELINE SLIDERS
═══════════════════════════════════════════════════════════ */
function initStorySliders() {
  const sliders = [
    { id: 'vaSlider',  fillClass: 'va-fill'  },
    { id: 'irsSlider', fillClass: 'irs-fill' },
    { id: 'nswSlider', fillClass: 'nsw-fill' },
  ];
  sliders.forEach(({ id, fillClass }) => {
    const slider = qs('#' + id);
    if (!slider) return;
    const fill = slider.closest('.story-timeline')?.querySelector('.' + fillClass);
    if (!fill) return;

    // Animate on view
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          fill.style.width = slider.value + '%';
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.5 });
    obs.observe(slider);

    slider.style.opacity = '0.01'; // visually hidden but functional
    slider.addEventListener('input', () => { fill.style.width = slider.value + '%'; });
  });
}

/* ═══════════════════════════════════════════════════════════
   12. STRATEGIC ACTION PLANNER — Drag & Drop
═══════════════════════════════════════════════════════════ */
const actions = [
  { id: 'a1', num: '1', text: '🔒 Prioritize Cybersecurity',           phase: 'quick'  },
  { id: 'a2', num: '2', text: '🪪 Implement Unified Digital Identity',   phase: 'medium' },
  { id: 'a3', num: '3', text: '📚 Invest in Digital Literacy',           phase: 'quick'  },
  { id: 'a4', num: '4', text: '🤖 Establish Transparent AI Governance',  phase: 'medium' },
  { id: 'a5', num: '5', text: '💬 Create Feedback Loops ("You said…")',  phase: 'quick'  },
  { id: 'a6', num: '6', text: '📈 Focus on Continuous Improvement',      phase: 'medium' },
  { id: 'a7', num: '7', text: '🔗 Develop Cross-Agency Integration',     phase: 'long'   },
  { id: 'a8', num: '8', text: '📊 Measure Trust Metrics Regularly',      phase: 'long'   },
];

function createActionEl(action) {
  const el = document.createElement('div');
  el.className = 'action-item';
  el.draggable = true;
  el.dataset.id = action.id;
  el.setAttribute('role', 'listitem');
  el.setAttribute('aria-label', action.text);
  el.setAttribute('tabindex', '0');
  el.innerHTML = `<div class="action-num">${action.num}</div><div class="action-text">${action.text}</div>`;

  el.addEventListener('dragstart', e => {
    e.dataTransfer.setData('text/plain', action.id);
    el.classList.add('dragging');
  });
  el.addEventListener('dragend', () => el.classList.remove('dragging'));
  return el;
}

function initPlanner() {
  const cols = {
    quick:  qs('#qw-items'),
    medium: qs('#mt-items'),
    long:   qs('#lt-items'),
  };
  if (!cols.quick) return;

  actions.forEach(a => {
    const el = createActionEl(a);
    cols[a.phase]?.appendChild(el);
  });

  // Drop targets
  qsa('.col-items').forEach(col => {
    col.addEventListener('dragover', e => { e.preventDefault(); col.style.background = 'rgba(14,165,233,0.07)'; });
    col.addEventListener('dragleave', () => { col.style.background = ''; });
    col.addEventListener('drop', e => {
      e.preventDefault();
      col.style.background = '';
      const id  = e.dataTransfer.getData('text/plain');
      const el  = qs(`.action-item[data-id="${id}"]`);
      if (el) col.appendChild(el);
    });
  });
}

/* ═══════════════════════════════════════════════════════════
   13. FEEDBACK FORM
═══════════════════════════════════════════════════════════ */
function initFeedback() {
  let selectedRating = 0;

  qsa('.rating-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      selectedRating = +btn.dataset.rating;
      qsa('.rating-btn').forEach(b => b.classList.toggle('selected', +b.dataset.rating === selectedRating));
    });
  });

  qs('#submitFeedback')?.addEventListener('click', () => {
    const text = qs('#feedbackText')?.value?.trim();
    if (!selectedRating) { alert('Please select a rating first.'); return; }
    qs('#feedbackText').value = '';
    qsa('.rating-btn').forEach(b => b.classList.remove('selected'));
    selectedRating = 0;
    const success = qs('#feedbackSuccess');
    success?.classList.remove('hidden');
    setTimeout(() => success?.classList.add('hidden'), 4000);
  });
}

/* ═══════════════════════════════════════════════════════════
   14. TOOLTIP SYSTEM
═══════════════════════════════════════════════════════════ */
function initTooltips() {
  const popup = qs('#tooltipPopup');
  if (!popup) return;

  document.addEventListener('mouseover', e => {
    const trigger = e.target.closest('.tooltip-trigger[data-tooltip]');
    if (!trigger) return;
    popup.textContent = trigger.dataset.tooltip;
    popup.classList.add('visible');
  });
  document.addEventListener('mousemove', e => {
    popup.style.left = (e.clientX + 14) + 'px';
    popup.style.top  = (e.clientY - 10) + 'px';
  });
  document.addEventListener('mouseout', e => {
    if (!e.target.closest('.tooltip-trigger')) popup.classList.remove('visible');
  });
}

/* ═══════════════════════════════════════════════════════════
   15. EXPORT MODAL
═══════════════════════════════════════════════════════════ */
function initExport() {
  const exportBtn   = qs('#exportBtn');
  const modal       = qs('#exportModal');
  const cancelBtn   = qs('#cancelExport');
  const confirmBtn  = qs('#confirmExport');
  if (!exportBtn || !modal) return;

  exportBtn.addEventListener('click', () => modal.classList.remove('hidden'));
  cancelBtn?.addEventListener('click', () => modal.classList.add('hidden'));
  modal.addEventListener('click', e => { if (e.target === modal) modal.classList.add('hidden'); });

  confirmBtn?.addEventListener('click', () => {
    const selected = qsa('.modal-option input:checked').map(i => i.parentElement.textContent.trim());
    modal.classList.add('hidden');

    // Simulate PDF generation
    const report = `CITIGOV TRUST ANALYTICS REPORT
Generated: ${new Date().toLocaleDateString('en-AU', { year: 'numeric', month: 'long', day: 'numeric' })}
============================================================

INCLUDED SECTIONS:
${selected.map(s => '• ' + s).join('\n')}

EXECUTIVE SUMMARY:
Global Trust Index: 42% (↑ from 37% in 2024)
Top Region: Singapore (67%)
Key Finding: 9× more likely to trust when satisfied

KEY STATISTICS:
• 74% of citizens faced access problems
• 66% visited 6+ websites for a single service
• 76% of people with disability face digital barriers
• 79% want AI decision disclosure

TRUST PILLARS:
🔒 Security: 63% reconsidering post-breach
🔍 Transparency: 62.4% cite as top driver
⚡ Service Quality: 75% satisfaction
👤 User Design: 67% say ease is critical

SUCCESS STORIES:
• VA.gov: 70.4% → 79.3% trust, 19M users
• IRS Direct File: +86% trust, 140,803 returns
• Service NSW: 340 services, 68 languages

SOURCE: 2025 Thales Digital Trust Index
© CiTiGov Analytics Platform`;

    const blob = new Blob([report], { type: 'text/plain' });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href = url; a.download = 'CiTiGov_Trust_Report_2025.txt';
    a.click();
    URL.revokeObjectURL(url);
  });
}

/* ═══════════════════════════════════════════════════════════
   16. LANGUAGE MODAL
═══════════════════════════════════════════════════════════ */
function initLangModal() {
  const langBtn   = qs('#langToggle');
  const langModal = qs('#langModal');
  const closeBtn  = qs('#closeLangModal');
  const langLabel = qs('#langLabel');
  if (!langBtn || !langModal) return;

  langBtn.addEventListener('click', () => langModal.classList.remove('hidden'));
  closeBtn?.addEventListener('click', () => langModal.classList.add('hidden'));
  langModal.addEventListener('click', e => { if (e.target === langModal) langModal.classList.add('hidden'); });

  qsa('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const code = btn.dataset.lang;

      /* update active state across ALL lang-btn elements */
      qsa('.lang-btn').forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      /* update navbar label */
      if (langLabel) langLabel.textContent = code;

      /* apply real translations */
      if (window._applyLang) window._applyLang(code);

      langModal.classList.add('hidden');
      showToast(`🌐 Language changed to ${btn.textContent.trim()}`);
    });
  });

  /* restore saved language on init */
  if (window._initI18n) window._initI18n();
}

/* ═══════════════════════════════════════════════════════════
   17. VIEW TOGGLE (Official / Citizen)
═══════════════════════════════════════════════════════════ */
function initViewToggle() {
  const viewBtn   = qs('#viewToggle');
  const viewLabel = qs('#viewLabel');
  if (!viewBtn) return;
  let isOfficial = true;

  viewBtn.addEventListener('click', () => {
    isOfficial = !isOfficial;
    viewLabel.textContent = isOfficial ? 'Official View' : 'Citizen View';
    document.body.setAttribute('data-view', isOfficial ? 'official' : 'citizen');

    if (!isOfficial) {
      showToast('🏛️ Citizen View: Simplified trust insights for the public. Jump to Service Quality or Success Stories.');
      // Scroll to scorecard for citizens
      qs('#scorecard')?.scrollIntoView({ behavior: 'smooth' });
    } else {
      showToast('📊 Official View: Full analytics dashboard for government administrators.');
    }
  });
}

/* ═══════════════════════════════════════════════════════════
   18. TOAST NOTIFICATION
═══════════════════════════════════════════════════════════ */
function showToast(msg, duration = 3500) {
  const existing = qs('.toast-notif');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = 'toast-notif';
  toast.setAttribute('role', 'status');
  toast.setAttribute('aria-live', 'polite');
  toast.textContent = msg;
  Object.assign(toast.style, {
    position: 'fixed', bottom: '28px', left: '50%',
    transform: 'translateX(-50%) translateY(20px)',
    background: 'rgba(10,22,40,0.97)',
    border: '1px solid rgba(14,165,233,0.35)',
    color: '#e2e8f0', padding: '12px 24px',
    borderRadius: '10px', fontSize: '.88rem',
    boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
    zIndex: '9999', opacity: '0',
    transition: 'all 0.3s cubic-bezier(.4,0,.2,1)',
    maxWidth: '420px', textAlign: 'center',
  });
  document.body.appendChild(toast);
  requestAnimationFrame(() => {
    toast.style.opacity = '1';
    toast.style.transform = 'translateX(-50%) translateY(0)';
  });
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(-50%) translateY(20px)';
    setTimeout(() => toast.remove(), 350);
  }, duration);
}

/* ═══════════════════════════════════════════════════════════
   19. SECTION REVEAL ANIMATIONS
═══════════════════════════════════════════════════════════ */
function initRevealAnimations() {
  // Add animation styles dynamically
  const style = document.createElement('style');
  style.textContent = `
    .card, .story-card, .pillar-card, .barrier-card, .stat-item {
      opacity: 0; transform: translateY(24px);
      transition: opacity .55s ease, transform .55s ease;
    }
    .card.in-view, .story-card.in-view, .pillar-card.in-view,
    .barrier-card.in-view, .stat-item.in-view {
      opacity: 1; transform: translateY(0);
    }
    .journey-step {
      opacity: 0; transform: translateX(-12px);
      animation: slideIn .4s ease forwards;
    }
    @keyframes slideIn { to { opacity:1; transform:translateX(0); } }
  `;
  document.head.appendChild(style);

  qsa('.card, .story-card, .pillar-card, .barrier-card, .stat-item').forEach((el, i) => {
    el.dataset.revealOnce = 'false';
    el.style.transitionDelay = (i % 4) * 80 + 'ms';
    revealObs.observe(el);
  });
}

/* ═══════════════════════════════════════════════════════════
   INIT — DOMContentLoaded
═══════════════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initGauge();
  initSectorChart();
  initRegions();
  initPillars();
  initPainBars();
  initJourney();
  initBarriers();
  initSimulator();
  initStorySliders();
  initPlanner();
  initFeedback();
  initTooltips();
  initExport();
  initLangModal();
  initViewToggle();
  initRevealAnimations();

  // Initial greeting toast after 1.5s
  setTimeout(() => {
    showToast('👋 Welcome to CiTiGov. Use "Official View" or "Citizen View" to toggle perspectives.', 4500);
  }, 1500);
});
