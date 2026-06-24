/**
 * Visited countries map.
 * Renders an interactive D3 world map highlighting the countries I've visited,
 * plus the stat block and the chip list. The `VISITED` array below is the single
 * source of truth — add a country there (and its ISO numeric id, or its name for
 * places without a stable id) and the count, percentage and chips all follow.
 */
(function () {
  "use strict";

  const VISITED = [
    "Türkiye", "Albania", "Austria", "Belgium", "Bosnia and Herzegovina", "Czech Republic",
    "France", "Germany", "Italy", "Kazakhstan", "Kosovo", "Kyrgyzstan", "Montenegro",
    "Netherlands", "North Macedonia", "Serbia", "Slovenia", "Spain", "Switzerland",
    "Uzbekistan",
  ];

  // ISO numeric ids as used by world-atlas (countries-110m).
  const VISITED_IDS = new Set([
    "792", "008", "040", "056", "070", "203", "250", "276", "380", "398",
    "417", "499", "528", "807", "688", "705", "724", "756", "860",
  ]);
  // Kosovo has no stable iso_n3 in the atlas, so match it by name.
  const VISITED_NAMES = new Set(["Kosovo"]);

  // Atlas display names → the names I prefer to show.
  const NAME_FIX = {
    Turkey: "Türkiye",
    Czechia: "Czech Republic",
    "Bosnia and Herz.": "Bosnia and Herzegovina",
    Macedonia: "North Macedonia",
    "N. Macedonia": "North Macedonia",
  };

  const CONTINENTS = 2;
  const WORLD_TOTAL = 195;

  const root = document.getElementById("visited-map");
  if (!root) return;

  const mapEl = root.querySelector("[data-vm-map]");
  const tip = root.querySelector("[data-vm-tip]");
  const tipName = root.querySelector("[data-vm-tip-name]");
  const tipBadge = root.querySelector("[data-vm-tip-badge]");

  // --- Stats + chips (rendered from the single source of truth above) -------
  function fillStaticBits() {
    const set = (key, val) => {
      const el = root.querySelector('[data-vm-stat="' + key + '"]');
      if (el) el.textContent = val;
    };
    set("countries", VISITED.length);
    set("continents", CONTINENTS);
    set("pct", ((VISITED.length / WORLD_TOTAL) * 100).toFixed(1) + "%");

    const chips = root.querySelector("[data-vm-chips]");
    if (chips) {
      const sorted = [...VISITED].sort((a, b) => a.localeCompare(b));
      chips.innerHTML = "";
      for (const name of sorted) {
        const span = document.createElement("span");
        span.className = "vm-chip";
        span.textContent = name;
        chips.appendChild(span);
      }
    }
  }

  // --- Tooltip --------------------------------------------------------------
  function showTip(name, visited, x, y) {
    if (!name) {
      tip.hidden = true;
      return;
    }
    tipName.textContent = name;
    tipBadge.hidden = !visited;
    tip.style.left = x + "px";
    tip.style.top = y + "px";
    tip.hidden = false;
  }

  // --- Map ------------------------------------------------------------------
  function waitForLibs() {
    return new Promise((resolve) => {
      const tick = () =>
        window.d3 && window.d3.geoNaturalEarth1 && window.topojson
          ? resolve()
          : setTimeout(tick, 60);
      tick();
    });
  }

  // Keep only the contiguous/European part of countries with far-flung overseas
  // territories (e.g. France's French Guiana, Réunion) so they don't render as
  // stray dots across the map.
  function pruneOverseas(f) {
    const limits = { 250: [-12, 12, 40, 55] }; // France: [lonMin, lonMax, latMin, latMax]
    const box = limits[String(f.id).padStart(3, "0")];
    if (!box || !f.geometry || f.geometry.type !== "MultiPolygon") return f;
    const inBox = (poly) => {
      const ring = poly[0];
      let lon = 0,
        lat = 0;
      for (const [x, y] of ring) {
        lon += x;
        lat += y;
      }
      lon /= ring.length;
      lat /= ring.length;
      return lon >= box[0] && lon <= box[1] && lat >= box[2] && lat <= box[3];
    };
    const polys = f.geometry.coordinates.filter(inBox);
    return { ...f, geometry: { ...f.geometry, coordinates: polys } };
  }

  let topo = null;
  let resizeTimer = null;

  async function draw() {
    if (!mapEl) return;
    try {
      if (!topo) {
        const res = await fetch(
          "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json"
        );
        topo = await res.json();
      }
      const d3 = window.d3;
      const topojson = window.topojson;
      const fc = topojson.feature(topo, topo.objects.countries);
      // Drop Antarctica (010) and trim far-flung territories.
      const feats = fc.features
        .filter((f) => f.id !== "010")
        .map((f) => pruneOverseas(f));

      const w = mapEl.clientWidth || 900;
      const h = Math.round(w * 0.52);
      const proj = d3
        .geoNaturalEarth1()
        .fitSize([w, h], { type: "FeatureCollection", features: feats });
      const path = d3.geoPath(proj);

      const NS = "http://www.w3.org/2000/svg";
      const svg = document.createElementNS(NS, "svg");
      svg.setAttribute("viewBox", "0 0 " + w + " " + h);
      svg.setAttribute("preserveAspectRatio", "xMidYMid meet");
      svg.setAttribute("role", "img");
      svg.setAttribute("aria-label", "World map with visited countries highlighted");

      const display = (f) => NAME_FIX[f.properties.name] || f.properties.name;
      const isVisited = (f) =>
        VISITED_IDS.has(String(f.id).padStart(3, "0")) ||
        VISITED_NAMES.has(f.properties.name);

      const g = document.createElementNS(NS, "g");
      for (const f of feats) {
        const d = path(f);
        if (!d) continue;
        const p = document.createElementNS(NS, "path");
        p.setAttribute("d", d);
        const vis = isVisited(f);
        p.setAttribute("class", vis ? "visited" : "land");
        p.dataset.name = display(f);
        p.dataset.vis = vis ? "1" : "";
        g.appendChild(p);
      }
      svg.appendChild(g);

      const rect = () => mapEl.getBoundingClientRect();
      const point = (e) => {
        const t = e.target;
        if (t && t.tagName === "path") {
          const r = rect();
          showTip(t.dataset.name, t.dataset.vis === "1", e.clientX - r.left, e.clientY - r.top);
        } else {
          showTip(null);
        }
      };
      svg.addEventListener("pointermove", point);
      svg.addEventListener("pointerdown", point);
      svg.addEventListener("pointerleave", () => showTip(null));

      mapEl.innerHTML = "";
      mapEl.appendChild(svg);
    } catch (err) {
      mapEl.innerHTML = '<div class="vm-loading">Map could not load.</div>';
      // eslint-disable-next-line no-console
      console.error("visited map failed to load", err);
    }
  }

  fillStaticBits();
  waitForLibs().then(() => {
    draw();
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(draw, 180);
    });
  });
})();
