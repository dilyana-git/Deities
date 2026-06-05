/* ════════════════════════════════════════════════════════════════════════
   THEOGONY · Celestial Atlas — core graph engine
   Muted star-map: brightness = renown, category = subtle halo hue.
   Exposes window.Atlas API for the feature scripts (search / tours / paths).
   ════════════════════════════════════════════════════════════════════════ */
(function () {
  const D = window; // globals from theogony-data.js
  const nodes = D.nodes.map(n => ({ ...n }));
  const rawLinks = D.links;

  const byId = Object.fromEntries(nodes.map(n => [n.id, n]));
  // keep only links whose endpoints both exist
  const links = rawLinks
    .filter(l => byId[l.source] && byId[l.target])
    .map((l, i) => ({ ...l, _i: i, source: l.source, target: l.target }));

  /* ── muted palettes ─────────────────────────────────────────────── */
  const CAT = {
    primordial : 'oklch(0.64 0.062 300)',
    titan      : 'oklch(0.70 0.060 75)',
    olympian   : 'oklch(0.66 0.058 250)',
    chthonic   : 'oklch(0.62 0.018 285)',
    monster    : 'oklch(0.62 0.078 25)',
    hero       : 'oklch(0.68 0.058 150)',
    sea_deity  : 'oklch(0.68 0.055 220)',
    nymph_minor: 'oklch(0.68 0.052 330)',
    mortal     : 'oklch(0.66 0.012 250)',
  };
  const LCOL = {
    parent_of       : 'oklch(0.56 0.012 270)',
    birthed         : 'oklch(0.62 0.052 150)',
    transformed_into: 'oklch(0.62 0.060 300)',
    cursed_into     : 'oklch(0.56 0.080 22)',
    created_by      : 'oklch(0.64 0.055 75)',
    lover_of        : 'oklch(0.64 0.062 12)',
    enemy_of        : 'oklch(0.60 0.090 25)',
    merged_with     : 'oklch(0.70 0.050 90)',
    split_from      : 'oklch(0.60 0.020 250)',
  };
  const GOLD = '#cdb88a';

  /* category cluster anchors (fractions of canvas) */
  const ANCHOR = {
    primordial : [0.85, 0.30],
    chthonic   : [0.45, 0.12],
    titan      : [0.58, 0.45],
    olympian   : [0.31, 0.50],
    nymph_minor: [0.11, 0.20],
    mortal     : [0.09, 0.62],
    monster    : [0.28, 0.82],
    hero       : [0.42, 0.90],
    sea_deity  : [0.70, 0.74],
  };
  const CAT_LABEL = {
    primordial:'PRIMORDIALS', titan:'TITANS', olympian:'OLYMPIANS', chthonic:'CHTHONIC',
    monster:'MONSTERS', hero:'HEROES', sea_deity:'SEA DEITIES', nymph_minor:'NYMPHS & MINOR', mortal:'MORTALS',
  };

  /* ── adjacency + degree (renown) ────────────────────────────────── */
  const adj = {};
  nodes.forEach(n => (adj[n.id] = new Set()));
  links.forEach(l => { adj[l.source].add(l.target); adj[l.target].add(l.source); });
  nodes.forEach(n => { n.degree = adj[n.id].size; });
  const maxDeg = Math.max(...nodes.map(n => n.degree));
  // prominence 0..1 (sqrt for gentler spread)
  nodes.forEach(n => { n.prom = Math.sqrt(n.degree) / Math.sqrt(maxDeg); });
  const radius = n => 3.0 + n.prom * 8.0;

  /* ── svg scaffold ───────────────────────────────────────────────── */
  const svg = d3.select('#sky');
  const defs = svg.append('defs');
  // soft blur for star glow
  const f = defs.append('filter').attr('id', 'glow').attr('x', '-80%').attr('y', '-80%').attr('width', '260%').attr('height', '260%');
  f.append('feGaussianBlur').attr('stdDeviation', 3.2).attr('result', 'b');
  const fm = f.append('feMerge'); fm.append('feMergeNode').attr('in', 'b'); fm.append('feMergeNode').attr('in', 'SourceGraphic');

  const zoomLayer = svg.append('g').attr('class', 'zoom');
  const bgLayer   = zoomLayer.append('g').attr('class', 'bg');
  const clusterLayer = zoomLayer.append('g').attr('class', 'clusters');
  const linkLayer = zoomLayer.append('g').attr('class', 'links');
  const nodeLayer = zoomLayer.append('g').attr('class', 'nodes');

  // Fixed user-space coordinate system — the viewBox scales it to any container,
  // so layout never depends on async pixel measurement (no first-paint race).
  const W = 1200, H = 740;
  svg.attr('viewBox', `0 0 ${W} ${H}`).attr('preserveAspectRatio', 'xMidYMid meet');

  /* faint decorative background stars (depth) */
  function sprinkle() {
    bgLayer.selectAll('*').remove();
    const big = Math.max(W, H) * 2.2;
    let s = 7;
    const rnd = () => { s = (s * 1103515245 + 12345) & 0x7fffffff; return s / 0x7fffffff; };
    const data = d3.range(420).map(() => ({
      x: -big * 0.3 + rnd() * big, y: -big * 0.3 + rnd() * big,
      r: 0.4 + rnd() * 1.1, o: 0.12 + rnd() * 0.4,
    }));
    bgLayer.selectAll('circle').data(data).join('circle')
      .attr('cx', d => d.x).attr('cy', d => d.y).attr('r', d => d.r)
      .attr('fill', '#cdd2dc').attr('opacity', d => d.o);
  }
  sprinkle();

  /* ── simulation ─────────────────────────────────────────────────── */
  nodes.forEach(n => {
    const a = ANCHOR[n.category] || [0.5, 0.5];
    n.ax = a[0]; n.ay = a[1];
    n.x = a[0] * W + (Math.random() - 0.5) * 120;
    n.y = a[1] * H + (Math.random() - 0.5) * 120;
  });

  const sim = d3.forceSimulation(nodes)
    .force('link', d3.forceLink(links).id(d => d.id).distance(l => {
      const base = 46;
      return base + (4 - Math.min(4, (byId[l.source]?.prom||0)*4));
    }).strength(0.25))
    .force('charge', d3.forceManyBody().strength(-150).distanceMax(360))
    .force('cluster', clusterForce(0.09))
    .force('collide', d3.forceCollide().radius(d => radius(d) + 13).strength(0.85))
    .alpha(1).alphaDecay(0.028);

  function clusterForce(strength) {
    let ns;
    function force(alpha) {
      const k = strength * alpha;
      for (const n of ns) {
        n.vx += (n.ax * W - n.x) * k;
        n.vy += (n.ay * H - n.y) * k;
      }
    }
    force.initialize = _ => (ns = _);
    return force;
  }

  /* ── links ──────────────────────────────────────────────────────── */
  const linkSel = linkLayer.selectAll('line').data(links).join('line')
    .attr('class', 'link')
    .attr('stroke', d => LCOL[d.type] || '#555')
    .attr('stroke-width', d => d.type === 'enemy_of' ? 1.4 : 1.1)
    .attr('stroke-linecap', 'round')
    .attr('opacity', 0.22)
    .attr('stroke-dasharray', d => ({
      transformed_into:'7 5', cursed_into:'6 4', created_by:'2 4', split_from:'6 3 2 3', enemy_of:'5 3',
    }[d.type] || null));

  /* ── cluster labels ─────────────────────────────────────────────── */
  const cats = [...new Set(nodes.map(n => n.category))];
  const clusterSel = clusterLayer.selectAll('text').data(cats).join('text')
    .attr('class', 'cluster-label')
    .attr('text-anchor', 'middle')
    .text(c => CAT_LABEL[c] || c);

  /* ── nodes ──────────────────────────────────────────────────────── */
  const gNode = nodeLayer.selectAll('g').data(nodes).join('g')
    .attr('class', 'node')
    .classed('prominent', d => d.prom > 0.55)
    .style('cursor', 'pointer')
    .on('click', (e, d) => { e.stopPropagation(); api.select(d.id, true); })
    .on('mouseenter', (e, d) => hoverOn(d))
    .on('mouseleave', () => hoverOff())
    .call(d3.drag()
      .on('start', (e, d) => { if (!e.active) sim.alphaTarget(0.18).restart(); d.fx = d.x; d.fy = d.y; })
      .on('drag',  (e, d) => { d.fx = e.x; d.fy = e.y; d.x = e.x; d.y = e.y; ticked(); })
      .on('end',   (e, d) => { if (!e.active) sim.alphaTarget(0); d.fx = null; d.fy = null; }));

  gNode.append('circle').attr('class', 'glow')
    .attr('r', d => radius(d) * 2.4)
    .attr('fill', d => CAT[d.category])
    .attr('opacity', d => 0.05 + d.prom * 0.14)
    .attr('filter', 'url(#glow)');
  gNode.append('circle').attr('class', 'core')
    .attr('r', d => radius(d))
    .attr('fill', '#ece6d6')
    .attr('opacity', d => 0.5 + d.prom * 0.5);
  gNode.append('circle').attr('class', 'ring')
    .attr('r', d => radius(d) + 1.6)
    .attr('fill', 'none')
    .attr('stroke', d => CAT[d.category])
    .attr('stroke-width', 1.1)
    .attr('opacity', 0.55);
  gNode.append('text').attr('class', 'node-label')
    .attr('x', d => radius(d) + 6).attr('y', 4)
    .text(d => d.name);

  /* ── tick ───────────────────────────────────────────────────────── */
  function ticked() {
    linkSel.attr('x1', d => d.source.x).attr('y1', d => d.source.y)
           .attr('x2', d => d.target.x).attr('y2', d => d.target.y);
    gNode.attr('transform', d => `translate(${d.x},${d.y})`);
    // cluster label = centroid of its members, lifted above
    clusterSel.each(function (c) {
      const ms = nodes.filter(n => n.category === c);
      if (!ms.length) return;
      const cx = d3.mean(ms, n => n.x), cy = d3.min(ms, n => n.y) - 26;
      d3.select(this).attr('x', cx).attr('y', cy);
    });
  }

  // Deterministic layout: relax the simulation synchronously so the graph is
  // fully positioned on first paint, independent of the background timer.
  sim.stop();
  for (let i = 0; i < 320; i++) sim.tick();
  ticked();
  sim.on('tick', ticked);

  /* ── zoom / pan ─────────────────────────────────────────────────── */
  const zoom = d3.zoom().scaleExtent([0.35, 4.5])
    .on('zoom', (e) => {
      zoomLayer.attr('transform', e.transform);
      svg.classed('zoomed-in', e.transform.k > 1.7);
    });
  svg.call(zoom).on('dblclick.zoom', null);
  svg.on('click', () => api.clearSelection());

  /* positions are already final — fit immediately, then once more next frame */
  let fitted = false;
  fitView();
  requestAnimationFrame(fitView);
  function fitView() {
    fitted = true;
    const pad = 80;
    const xs = nodes.map(n => n.x), ys = nodes.map(n => n.y);
    const x0 = Math.min(...xs), x1 = Math.max(...xs), y0 = Math.min(...ys), y1 = Math.max(...ys);
    const bw = x1 - x0, bh = y1 - y0;
    if (!(bw > 0 && bh > 0 && W > 0 && H > 0)) return;
    const k = Math.min((W - pad * 2) / bw, (H - pad * 2) / bh, 1.1);
    if (!isFinite(k) || k <= 0) return;
    const tx = W / 2 - k * (x0 + bw / 2), ty = H / 2 - k * (y0 + bh / 2);
    svg.transition().duration(900).call(zoom.transform, d3.zoomIdentity.translate(tx, ty).scale(k));
  }

  /* ── hover ──────────────────────────────────────────────────────── */
  const tip = document.getElementById('tip');
  function hoverOn(d) {
    if (state.pathLock || state.tourLock) return;
    const near = adj[d.id];
    nodeLayer.classed('focusing', true);
    gNode.classed('faded', n => n.id !== d.id && !near.has(n.id));
    gNode.classed('lit', n => n.id === d.id || near.has(n.id));
    linkSel.classed('faded', l => srcId(l) !== d.id && tgtId(l) !== d.id)
           .classed('lit',   l => srcId(l) === d.id || tgtId(l) === d.id);
    tip.textContent = d.name;
    tip.style.opacity = 1;
  }
  function hoverOff() {
    if (state.pathLock || state.tourLock) return;
    nodeLayer.classed('focusing', false);
    gNode.classed('faded', false).classed('lit', false);
    linkSel.classed('faded', false).classed('lit', false);
    tip.style.opacity = 0;
  }
  svg.on('mousemove', (e) => {
    tip.style.left = (e.clientX + 14) + 'px';
    tip.style.top  = (e.clientY - 8) + 'px';
  });

  /* ── selection ──────────────────────────────────────────────────── */
  const state = { selected: null, pathLock: false, tourLock: false };
  const selectCbs = [];

  function applySelectVisual(id) {
    gNode.classed('selected', n => n.id === id);
    if (id) {
      const near = adj[id];
      gNode.classed('faded', n => n.id !== id && !near.has(n.id))
           .classed('lit',   n => n.id === id || near.has(n.id));
      linkSel.classed('faded', l => srcId(l) !== id && tgtId(l) !== id)
             .classed('lit',   l => srcId(l) === id || tgtId(l) === id);
      nodeLayer.classed('focusing', true);
    } else {
      gNode.classed('faded', false).classed('lit', false);
      linkSel.classed('faded', false).classed('lit', false);
      nodeLayer.classed('focusing', false);
    }
  }

  const srcId = l => (typeof l.source === 'object' ? l.source.id : l.source);
  const tgtId = l => (typeof l.target === 'object' ? l.target.id : l.target);

  /* ── public API ─────────────────────────────────────────────────── */
  const api = {
    nodes, links, byId, adj, CAT, LCOL, GOLD,
    catLabel: c => CAT_LABEL[c] || c,
    radius,
    srcId, tgtId,
    onSelect(fn) { selectCbs.push(fn); },
    select(id, fly) {
      if (state.pathLock) return;
      state.selected = id;
      applySelectVisual(id);
      if (fly) api.flyTo(id, 1.9);
      selectCbs.forEach(fn => fn(id));
    },
    clearSelection() {
      if (state.pathLock || state.tourLock) return;
      state.selected = null;
      applySelectVisual(null);
      selectCbs.forEach(fn => fn(null));
    },
    flyTo(id, scale) {
      const n = byId[id]; if (!n) return;
      const k = scale || 1.9;
      const t = d3.zoomIdentity.translate(W / 2 - k * n.x, H / 2 - k * n.y).scale(k);
      svg.transition().duration(820).call(zoom.transform, t);
    },
    resetView() { fitView(); },
    state,
    /* highlight an ordered path of node ids as a glowing route */
    highlightPath(ids) {
      state.pathLock = true;
      const set = new Set(ids);
      const edgeSet = new Set();
      for (let i = 0; i < ids.length - 1; i++) edgeSet.add(ids[i] + '|' + ids[i + 1]);
      gNode.classed('faded', n => !set.has(n.id)).classed('lit', n => set.has(n.id)).classed('selected', false);
      gNode.classed('route', n => set.has(n.id));
      linkSel.classed('faded', true).classed('lit', false).classed('route', l => {
        const a = srcId(l), b = tgtId(l);
        return edgeSet.has(a + '|' + b) || edgeSet.has(b + '|' + a);
      });
      nodeLayer.classed('focusing', true);
      // frame the path
      frameNodes(ids);
    },
    clearPathHighlight() {
      state.pathLock = false;
      gNode.classed('route', false);
      linkSel.classed('route', false).classed('faded', false);
      applySelectVisual(state.selected);
    },
    /* tour control: lock so hover doesn't fight the walk */
    setTourLock(v) { state.tourLock = v; },
    /* light just one edge between a..b (tours) */
    litEdge(a, b) {
      linkSel.classed('route', l => {
        const s = srcId(l), t = tgtId(l);
        return (s === a && t === b) || (s === b && t === a);
      });
    },
    clearLitEdge() { linkSel.classed('route', false); },
    frameNodes,
  };

  function frameNodes(ids) {
    const ns = ids.map(i => byId[i]).filter(Boolean);
    if (!ns.length) return;
    const pad = 130;
    const x0 = Math.min(...ns.map(n => n.x)), x1 = Math.max(...ns.map(n => n.x));
    const y0 = Math.min(...ns.map(n => n.y)), y1 = Math.max(...ns.map(n => n.y));
    const bw = Math.max(x1 - x0, 60), bh = Math.max(y1 - y0, 60);
    const k = Math.min((W - pad * 2) / bw, (H - pad * 2) / bh, 2.4);
    const tx = W / 2 - k * (x0 + bw / 2), ty = H / 2 - k * (y0 + bh / 2);
    svg.transition().duration(820).call(zoom.transform, d3.zoomIdentity.translate(tx, ty).scale(k));
  }

  window.Atlas = api;
})();
