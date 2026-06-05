/* ════════════════════════════════════════════════════════════════════════
   THEOGONY · Celestial Atlas — features
   Detail panel · search/jump · guided story tours · path-finding
   Depends on window.Atlas (atlas-core.js) and data globals.
   ════════════════════════════════════════════════════════════════════════ */
(function () {
  const A = window.Atlas;
  const { byId, adj, CAT, LCOL, GOLD } = A;
  const linkCfg = window.linkTypeConfig;
  const catCfg = window.categoryConfig;
  const arch = window.archetypeMap;
  const esc = s => String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;');

  /* ───────────────────────────────────────────────────────────────────
     DETAIL PANEL
     ─────────────────────────────────────────────────────────────────── */
  const panel = document.getElementById('panel');

  function sigil(node) {
    // mini constellation: node centre + its neighbours on a ring
    const W = 320, H = 132, cx = W / 2, cy = H / 2 + 6;
    const near = [...adj[node.id]].map(id => byId[id]).filter(Boolean)
      .sort((a, b) => b.degree - a.degree).slice(0, 9);
    const R = 46;
    let lines = '', dots = '';
    near.forEach((m, i) => {
      const ang = (-90 + (360 / Math.max(near.length, 1)) * i) * Math.PI / 180;
      const x = cx + Math.cos(ang) * (R + (i % 2) * 14);
      const y = cy + Math.sin(ang) * (R * 0.62 + (i % 2) * 9);
      lines += `<line x1="${cx}" y1="${cy}" x2="${x.toFixed(1)}" y2="${y.toFixed(1)}" stroke="${CAT[m.category]}" stroke-width="0.8" opacity="0.4" stroke-dasharray="1 4"/>`;
      dots += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${2 + m.prom * 2.4}" fill="#ece6d6" opacity="${0.5 + m.prom * 0.4}"/>`;
      dots += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${3.6 + m.prom * 2.4}" fill="none" stroke="${CAT[m.category]}" stroke-width="0.8" opacity="0.5"/>`;
    });
    const cr = 4 + node.prom * 4;
    const centre = `
      <circle cx="${cx}" cy="${cy}" r="${cr * 2.4}" fill="${CAT[node.category]}" opacity="0.18"/>
      <circle cx="${cx}" cy="${cy}" r="${cr}" fill="#f3eede"/>
      <circle cx="${cx}" cy="${cy}" r="${cr + 2}" fill="none" stroke="${GOLD}" stroke-width="1.1" opacity="0.85"/>`;
    return `<svg viewBox="0 0 ${W} ${H}" class="sigil" preserveAspectRatio="xMidYMid meet">
      <rect x="0" y="0" width="${W}" height="${H}" fill="none"/>${lines}${dots}${centre}</svg>`;
  }

  function connections(node) {
    const out = [];
    A.links.forEach(l => {
      const s = A.srcId(l), t = A.tgtId(l);
      if (s === node.id && byId[t]) out.push({ other: byId[t], type: l.type, label: l.label, dir: '→' });
      else if (t === node.id && byId[s]) out.push({ other: byId[s], type: l.type, label: l.label, dir: '←' });
    });
    const seen = new Set();
    return out.filter(c => { const k = c.other.id + c.type + c.dir; if (seen.has(k)) return false; seen.add(k); return true; });
  }

  function renderPanel(id) {
    if (!id) { panel.classList.remove('open'); panel.style.transform = ''; setTimeout(() => { if (!panel.classList.contains('open')) panel.innerHTML = ''; }, 340); return; }
    const n = byId[id]; if (!n) return;
    const cc = catCfg[n.category] || {};
    const ar = arch[n.jungian_archetype];
    const cons = connections(n);

    const domains = (n.domains || []).map(d => `<span class="chip">${esc(d)}</span>`).join('');
    const myths = (n.notable_myths || []).map(m => `<li><span class="myth-mark">✦</span>${esc(m)}</li>`).join('');
    const consHTML = cons.map(c => {
      const lc = LCOL[c.type] || '#888';
      return `<button class="conn" data-go="${c.other.id}">
        <span class="conn-stripe" style="background:${lc}"></span>
        <span class="conn-body">
          <span class="conn-rel" style="color:${lc}">${esc(linkCfg[c.type]?.label || c.type)} ${c.dir}</span>
          <span class="conn-name" style="color:${CAT[c.other.category]}">${esc(c.other.name)}</span>
          ${c.label ? `<span class="conn-note">${esc(c.label)}</span>` : ''}
        </span></button>`;
    }).join('');

    panel.innerHTML = `
      <button class="panel-close" aria-label="Close">✕</button>
      <div class="sigil-wrap">${sigil(n)}</div>
      <div class="panel-head" style="border-left-color:${CAT[n.category]}">
        <div class="panel-tags">
          <span class="cat-badge" style="color:${CAT[n.category]};border-color:${CAT[n.category]}">${esc((cc.label||n.category).toUpperCase())}</span>
          ${n.roman_equivalent ? `<span class="roman">≡ ${esc(n.roman_equivalent)}</span>` : ''}
        </div>
        <h2 class="panel-name">${esc(n.name)}</h2>
        <p class="panel-epithet">${esc(n.epithet || '')}</p>
      </div>
      <div class="panel-body">
        ${n.jungian_archetype ? `<section>
          <span class="lab">Jungian Archetype</span>
          <div class="arch-row">
            <span class="arch-pill" style="color:${ar?.color||'#94a3b8'};border-color:${(ar?.color||'#94a3b8')}66">${esc(n.jungian_archetype)}</span>
          </div>
          ${ar ? `<p class="muted">${esc(ar.description)}</p>` : ''}
        </section>` : ''}
        <section><span class="lab">Description</span><p>${esc(n.description)}</p></section>
        ${n.origins ? `<section><span class="lab">Origins</span><p>${esc(n.origins)}</p></section>` : ''}
        ${domains ? `<section><span class="lab">Domains</span><div class="chips">${domains}</div></section>` : ''}
        ${myths ? `<section><span class="lab">Myths</span><ul class="myths">${myths}</ul></section>` : ''}
        ${n.symbols?.length ? `<section><span class="lab">Symbols</span><p class="symbols">${esc(n.symbols.join(' · '))}</p></section>` : ''}
        ${cons.length ? `<section><span class="lab">Connections · ${cons.length}</span><div class="conns">${consHTML}</div></section>` : ''}
      </div>`;
    panel.classList.add('open');
    panel.style.transform = 'translateX(0)';
    panel.querySelector('.panel-close').onclick = (e) => { e.stopPropagation(); A.clearSelection(); };
    panel.querySelectorAll('.conn').forEach(b => b.onclick = () => A.select(b.dataset.go, true));
    panel.scrollTop = 0;
  }
  A.onSelect(renderPanel);

  /* ───────────────────────────────────────────────────────────────────
     AUTOCOMPLETE helper (shared by search + path slots)
     ─────────────────────────────────────────────────────────────────── */
  const allSorted = A.nodes.slice().sort((a, b) => a.name.localeCompare(b.name));
  function attachAutocomplete(input, list, onPick) {
    function render(q) {
      q = q.trim().toLowerCase();
      if (!q) { list.classList.remove('open'); list.innerHTML = ''; return; }
      const matches = allSorted.filter(n => n.name.toLowerCase().includes(q)).slice(0, 8);
      if (!matches.length) { list.innerHTML = `<div class="ac-empty">no figure found</div>`; list.classList.add('open'); return; }
      list.innerHTML = matches.map(n =>
        `<button class="ac-item" data-id="${n.id}">
           <span class="ac-dot" style="background:${CAT[n.category]}"></span>
           <span class="ac-name">${esc(n.name)}</span>
           <span class="ac-cat">${esc(A.catLabel(n.category))}</span>
         </button>`).join('');
      list.classList.add('open');
      list.querySelectorAll('.ac-item').forEach(b => b.onclick = () => {
        const n = byId[b.dataset.id];
        input.value = n.name;
        list.classList.remove('open');
        onPick(n.id);
      });
    }
    input.addEventListener('input', () => render(input.value));
    input.addEventListener('focus', () => { if (input.value) render(input.value); });
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') { const first = list.querySelector('.ac-item'); if (first) first.click(); }
      if (e.key === 'Escape') { list.classList.remove('open'); input.blur(); }
    });
    document.addEventListener('click', (e) => { if (!list.contains(e.target) && e.target !== input) list.classList.remove('open'); });
  }

  /* search box ─────────────────────────────────────────────────────── */
  attachAutocomplete(
    document.getElementById('searchInput'),
    document.getElementById('searchResults'),
    (id) => { A.select(id, true); }
  );

  /* ───────────────────────────────────────────────────────────────────
     GUIDED STORY TOURS
     ─────────────────────────────────────────────────────────────────── */
  const TOURS = [
    { id: 'titans', title: 'The Fall of the Titans',
      steps: [
        ['chaos',  'In the beginning was only Chaos — the formless gap from which all becoming erupts.'],
        ['gaia',   'From the void rose Gaia, the broad-breasted Earth, mother of all that has form.'],
        ['uranus', 'Gaia bore Uranus, the starry Sky, and took him as her equal and her mate.'],
        ['cronus', 'Their son Cronus seized a sickle, unmanned his father, and claimed the cosmos as his own.'],
        ['rhea',   'Cronus swallowed each child Rhea bore him — until she hid one away and fed him a stone.'],
        ['zeus',   'That hidden child was Zeus, who freed his siblings and cast the Titans down into Tartarus.'],
      ] },
    { id: 'night', title: 'The Children of Night',
      steps: [
        ['nyx',      'Nyx, Lady of Night, is so old and so dread that even Zeus feared to cross her.'],
        ['erebus',   'With Erebus, the deep darkness, she shares the unlit places between the worlds.'],
        ['thanatos', 'From her alone came Thanatos — Death, who carries the breathless away.'],
        ['hypnos',   'And Hypnos, gentle Sleep, his twin, who can still even the king of the gods.'],
        ['nemesis',  'She bore Nemesis too, the weight that balances every excess of fortune.'],
        ['eris',     'And Eris, Strife, whose single golden apple would set the world to war.'],
      ] },
    { id: 'gorgon', title: 'Perseus & the Gorgon',
      steps: [
        ['poseidon', 'Poseidon lay with the maiden Medusa within Athena’s own temple.'],
        ['medusa',   'For that desecration Medusa was cursed — her hair to serpents, her gaze to stone.'],
        ['athena',   'Athena, wronged, later armed the hero who would end the monster she had made.'],
        ['perseus',  'Perseus, watching only her reflection, struck off Medusa’s head.'],
        ['andromeda','With that same severed head he turned a sea-beast to rock, and won Andromeda.'],
      ] },
  ];

  const tourBtn = document.getElementById('tourBtn');
  const tourMenu = document.getElementById('tourMenu');
  const tourBar = document.getElementById('tourBar');
  let tour = null, step = 0;

  tourMenu.innerHTML = TOURS.map(t =>
    `<button class="tour-item" data-id="${t.id}"><span class="ti-mark">✦</span>${esc(t.title)}<span class="ti-n">${t.steps.length}</span></button>`).join('');
  tourBtn.onclick = (e) => { e.stopPropagation(); tourMenu.classList.toggle('open'); };
  document.addEventListener('click', (e) => { if (!tourMenu.contains(e.target) && e.target !== tourBtn) tourMenu.classList.remove('open'); });
  tourMenu.querySelectorAll('.tour-item').forEach(b => b.onclick = () => { tourMenu.classList.remove('open'); startTour(b.dataset.id); });

  function startTour(tid) {
    tour = TOURS.find(t => t.id === tid); step = 0;
    exitPath();
    A.setTourLock(true);
    tourBtn.classList.add('active');
    showStep();
    tourBar.classList.add('open');
    tourBar.style.opacity = '1';
    tourBar.style.pointerEvents = 'auto';
  }
  function showStep() {
    const [id, caption] = tour.steps[step];
    A.setTourLock(false); A.select(id, true); A.setTourLock(true);
    if (step > 0) A.litEdge(tour.steps[step - 1][0], id); else A.clearLitEdge();
    tourBar.querySelector('.tour-title').textContent = tour.title;
    tourBar.querySelector('.tour-caption').textContent = caption;
    tourBar.querySelector('.tour-progress').textContent = `${step + 1} / ${tour.steps.length}`;
    tourBar.querySelector('.tour-prev').disabled = step === 0;
    tourBar.querySelector('.tour-next').textContent = step === tour.steps.length - 1 ? 'Finish' : 'Next ▸';
    // dots
    tourBar.querySelector('.tour-dots').innerHTML = tour.steps.map((s, i) =>
      `<span class="tdot ${i === step ? 'on' : ''} ${i < step ? 'done' : ''}"></span>`).join('');
  }
  function endTour() {
    tour = null;
    A.setTourLock(false); A.clearLitEdge();
    tourBar.classList.remove('open');
    tourBar.style.opacity = '';
    tourBar.style.pointerEvents = '';
    tourBtn.classList.remove('active');
    A.clearSelection();
    A.resetView();
  }
  tourBar.querySelector('.tour-prev').onclick = () => { if (step > 0) { step--; showStep(); } };
  tourBar.querySelector('.tour-next').onclick = () => { if (step < tour.steps.length - 1) { step++; showStep(); } else endTour(); };
  tourBar.querySelector('.tour-exit').onclick = endTour;

  /* ───────────────────────────────────────────────────────────────────
     PATH-FINDING (shortest path between two figures, BFS)
     ─────────────────────────────────────────────────────────────────── */
  const pathBtn = document.getElementById('pathBtn');
  const pathPanel = document.getElementById('pathPanel');
  let from = null, to = null;

  function bfs(a, b) {
    if (a === b) return [a];
    const q = [a], prev = { [a]: null }; 
    while (q.length) {
      const cur = q.shift();
      for (const nb of adj[cur]) {
        if (!(nb in prev)) { prev[nb] = cur; if (nb === b) { const p = [b]; let c = b; while (prev[c] != null) { c = prev[c]; p.unshift(c); } return p; } q.push(nb); }
      }
    }
    return null;
  }

  function openPath() {
    pathBtn.classList.add('active');
    pathPanel.classList.add('open');
    if (tour) endTour();
    A.clearSelection();
  }
  function exitPath() {
    pathBtn.classList.remove('active');
    pathPanel.classList.remove('open');
    from = to = null;
    document.getElementById('pathFrom').value = '';
    document.getElementById('pathTo').value = '';
    pathPanel.querySelector('.path-result').innerHTML = '';
    A.clearPathHighlight();
  }
  pathBtn.onclick = (e) => { e.stopPropagation(); pathPanel.classList.contains('open') ? exitPath() : openPath(); };
  pathPanel.querySelector('.path-close').onclick = exitPath;

  attachAutocomplete(document.getElementById('pathFrom'), document.getElementById('pathFromResults'), id => { from = id; tryPath(); });
  attachAutocomplete(document.getElementById('pathTo'), document.getElementById('pathToResults'), id => { to = id; tryPath(); });

  function tryPath() {
    const res = pathPanel.querySelector('.path-result');
    if (!from || !to) return;
    const path = bfs(from, to);
    if (!path) {
      res.innerHTML = `<p class="path-none">No chain of relation links these two.</p>`;
      A.clearPathHighlight();
      return;
    }
    A.highlightPath(path);
    res.innerHTML = `<div class="path-steps">` + path.map((id, i) => {
      const n = byId[id];
      let rel = '';
      if (i < path.length - 1) {
        const l = A.links.find(l => {
          const s = A.srcId(l), t = A.tgtId(l);
          return (s === id && t === path[i + 1]) || (t === id && s === path[i + 1]);
        });
        rel = l ? (linkCfg[l.type]?.label || l.type) : 'linked';
      }
      return `<button class="path-node" data-go="${id}">
          <span class="pn-dot" style="background:${CAT[n.category]}"></span>
          <span class="pn-name">${esc(n.name)}</span>
        </button>` + (i < path.length - 1 ? `<span class="path-rel">${esc(rel)}</span>` : '');
    }).join('') + `</div><p class="path-meta">${path.length - 1} steps · ${path.length} figures</p>`;
    res.querySelectorAll('.path-node').forEach(b => b.onclick = () => A.flyTo(b.dataset.go, 2.2));
  }

  /* ───────────────────────────────────────────────────────────────────
     LEGEND
     ─────────────────────────────────────────────────────────────────── */
  const legendBtn = document.getElementById('legendBtn');
  const legend = document.getElementById('legend');
  legendBtn.onclick = (e) => { e.stopPropagation(); legend.classList.toggle('open'); legendBtn.classList.toggle('active'); };
  document.getElementById('legendClose').onclick = () => { legend.classList.remove('open'); legendBtn.classList.remove('active'); };

  const catLeg = window.categoryOrder.map(c =>
    `<div class="leg-row"><span class="leg-star" style="background:#ece6d6;box-shadow:0 0 0 1.5px ${CAT[c]}"></span>${esc(catCfg[c].label)}</div>`).join('');
  const relLeg = window.linkTypeOrder.map(t =>
    `<div class="leg-row"><span class="leg-line" style="background:${LCOL[t]}"></span>${esc(linkCfg[t].label)}</div>`).join('');
  legend.querySelector('.leg-cats').innerHTML = catLeg;
  legend.querySelector('.leg-rels').innerHTML = relLeg;

  /* reset view */
  document.getElementById('resetBtn').onclick = () => { A.clearSelection(); A.resetView(); };
})();
