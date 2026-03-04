/* ── Data ──────────────────────────────────────────── */

const birthDate = new Date("1991-04-15");
const MS_WEEK = 604800000;

const lifeEvents = [
  { name: "Kindergarten", startDate: new Date(1997, 8, 1), endDate: new Date(1998, 7, 31), color: "#f6c453", icon: "pencil" },
  { name: "Elementary School", startDate: new Date(1998, 8, 1), endDate: new Date(1999, 5, 31), color: "#3ea66b", icon: "book" },
  { name: "Summer Vacation", startDate: new Date(1999, 6, 1), endDate: new Date(1999, 7, 31), color: "#f2db74", icon: "sun" },
  { name: "Elementary School", startDate: new Date(1999, 8, 1), endDate: new Date(2000, 5, 31), color: "#3ea66b", icon: "book" },
  { name: "Summer Vacation", startDate: new Date(2000, 6, 1), endDate: new Date(2000, 7, 31), color: "#f2db74", icon: "sun" },
  { name: "Elementary School", startDate: new Date(2000, 8, 1), endDate: new Date(2001, 5, 31), color: "#3ea66b", icon: "book" },
  { name: "Summer Vacation", startDate: new Date(2001, 6, 1), endDate: new Date(2001, 7, 31), color: "#f2db74", icon: "sun" },
  { name: "Middle School", startDate: new Date(2001, 8, 1), endDate: new Date(2002, 5, 31), color: "#4b93d5", icon: "book" },
  { name: "Summer Vacation", startDate: new Date(2002, 6, 1), endDate: new Date(2002, 7, 31), color: "#f2db74", icon: "sun" },
  { name: "Middle School", startDate: new Date(2002, 8, 1), endDate: new Date(2003, 5, 31), color: "#4b93d5", icon: "book" },
  { name: "Summer Vacation", startDate: new Date(2003, 6, 1), endDate: new Date(2003, 7, 31), color: "#f2db74", icon: "sun" },
  { name: "Middle School", startDate: new Date(2003, 8, 1), endDate: new Date(2004, 5, 31), color: "#4b93d5", icon: "book" },
  { name: "Summer Vacation", startDate: new Date(2004, 6, 1), endDate: new Date(2004, 7, 31), color: "#f2db74", icon: "sun" },
  { name: "Middle School", startDate: new Date(2004, 8, 1), endDate: new Date(2005, 5, 31), color: "#4b93d5", icon: "book" },
  { name: "Summer Vacation", startDate: new Date(2005, 6, 1), endDate: new Date(2005, 7, 31), color: "#f2db74", icon: "sun" },
  { name: "Middle School", startDate: new Date(2005, 8, 1), endDate: new Date(2006, 5, 31), color: "#4b93d5", icon: "book" },
  { name: "Summer Vacation", startDate: new Date(2006, 6, 1), endDate: new Date(2006, 7, 31), color: "#f2db74", icon: "sun" },
  { name: "College", startDate: new Date(2006, 8, 1), endDate: new Date(2007, 5, 31), color: "#8e78d5", icon: "graduation" },
  { name: "Summer Vacation", startDate: new Date(2007, 6, 1), endDate: new Date(2007, 7, 31), color: "#f2db74", icon: "sun" },
  { name: "College", startDate: new Date(2007, 8, 1), endDate: new Date(2008, 5, 31), color: "#8e78d5", icon: "graduation" },
  { name: "Summer Vacation", startDate: new Date(2008, 6, 1), endDate: new Date(2008, 7, 31), color: "#f2db74", icon: "sun" },
  { name: "College", startDate: new Date(2008, 8, 1), endDate: new Date(2009, 5, 31), color: "#8e78d5", icon: "graduation" },
  { name: "Summer Vacation", startDate: new Date(2009, 6, 1), endDate: new Date(2009, 7, 31), color: "#f2db74", icon: "sun" },
  { name: "College", startDate: new Date(2009, 8, 1), endDate: new Date(2010, 5, 31), color: "#8e78d5", icon: "graduation" },
  { name: "Army", startDate: new Date(2010, 6, 1), endDate: new Date(2011, 5, 31), color: "#c55656", icon: "shield" },
  { name: "Mechnikov Research Institute", startDate: new Date(2011, 9, 1), endDate: new Date(2014, 6, 31), color: "#6577c4", icon: "flask" },
  { name: "Playflock", startDate: new Date(2014, 7, 1), endDate: new Date(2015, 7, 31), color: "#de6f9a", icon: "gamepad" },
  { name: "Rambler & LiveJournal", startDate: new Date(2015, 7, 1), endDate: new Date(2017, 5, 31), color: "#d58e49", icon: "globe" },
  { name: "Booking.com", startDate: new Date(2017, 7, 1), endDate: new Date(2024, 4, 31), color: "#3560b7", icon: "plane" },
  { name: "AI Freelance", startDate: new Date(2023, 2, 1), endDate: new Date(), color: "#3a9156", icon: "cpu" },
];

/* ── Helpers ───────────────────────────────────────── */

function weekInfo(weekIndex, now) {
  const weekDate = new Date(birthDate.getTime() + weekIndex * MS_WEEK);
  const isPast = weekDate <= now;
  if (!isPast) return { weekDate, isPast, event: null, color: null };
  const event = lifeEvents.find(e => weekDate >= e.startDate && weekDate <= e.endDate) || null;
  return { weekDate, isPast, event, color: event ? event.color : "var(--empty)" };
}

function merged() {
  const out = [];
  for (const ev of lifeEvents) {
    const last = out[out.length - 1];
    if (last && last.name === ev.name) {
      last.endDate = ev.endDate;
    } else {
      out.push({ ...ev, startDate: new Date(ev.startDate), endDate: new Date(ev.endDate) });
    }
  }
  return out;
}

function dur(ms) {
  const mo = Math.round(ms / (MS_WEEK * 4.345));
  const y = Math.floor(mo / 12), m = mo % 12;
  if (y === 0) return `${m}mo`;
  if (m === 0) return `${y}y`;
  return `${y}y ${m}mo`;
}

function fmtDate(d) {
  return d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

/* ── HUD ───────────────────────────────────────────── */

function renderHUD() {
  const now = new Date();
  const weeksLived = Math.floor((now - birthDate) / MS_WEEK);
  const age = Math.floor((now - birthDate) / (MS_WEEK * 52));
  const pct = ((weeksLived / (80 * 52)) * 100).toFixed(1);

  document.getElementById("hud-age").textContent = `${age} years`;
  document.getElementById("hud-detail").textContent =
    `${weeksLived.toLocaleString()} weeks \u00b7 ${pct}% of 80y`;
}

/* ── Legend ─────────────────────────────────────────── */

let activeFilter = null;

function renderLegend() {
  const events = merged();
  const now = new Date();
  const totalWeeks = Math.floor((now - birthDate) / MS_WEEK);
  const inner = document.getElementById("legend-inner");

  inner.innerHTML = events.map(ev => {
    const weeks = Math.floor((ev.endDate - ev.startDate) / MS_WEEK);
    const pct = ((weeks / totalWeeks) * 100).toFixed(1);
    return `<div class="leg" data-name="${ev.name}">
      <div class="leg-dot" style="background:${ev.color}"></div>
      <div class="leg-text">
        <div class="leg-name">${ev.name}</div>
        <div class="leg-meta">${fmtDate(ev.startDate)} — ${fmtDate(ev.endDate)} \u00b7 ${dur(ev.endDate - ev.startDate)}</div>
      </div>
      <div class="leg-pct">${pct}%</div>
    </div>`;
  }).join("");

  inner.addEventListener("click", e => {
    const leg = e.target.closest(".leg");
    if (!leg) return;
    const name = leg.dataset.name;
    const grid = document.getElementById("grid");

    if (activeFilter === name) {
      activeFilter = null;
      grid.classList.remove("filtered");
      inner.querySelectorAll(".leg").forEach(l => l.classList.remove("active"));
      grid.querySelectorAll(".w.hl").forEach(w => w.classList.remove("hl"));
    } else {
      activeFilter = name;
      inner.querySelectorAll(".leg").forEach(l =>
        l.classList.toggle("active", l.dataset.name === name)
      );
      grid.classList.add("filtered");
      grid.querySelectorAll(".w").forEach(w =>
        w.classList.toggle("hl", w.dataset.event === name)
      );
    }
  });

  // Toggle drawer
  const drawer = document.getElementById("legend-drawer");
  const btn = document.getElementById("legend-toggle");
  btn.addEventListener("click", () => {
    const showing = !drawer.hidden;
    drawer.hidden = showing;
    btn.classList.toggle("active", !showing);
  });
}

/* ── Grid ──────────────────────────────────────────── */

function renderGrid() {
  const grid = document.getElementById("grid");
  const tip = document.getElementById("tip");
  const now = new Date();
  const weeksLived = Math.floor((now - birthDate) / MS_WEEK);
  const totalWeeks = weeksLived + 52 * 5;
  const totalYears = Math.ceil(totalWeeks / 52);
  const startYear = birthDate.getFullYear();

  const frag = document.createDocumentFragment();
  let nowEl = null;

  for (let y = 0; y < totalYears; y++) {
    const yr = startYear + y;

    // Year label
    const label = document.createElement("div");
    label.className = "yr";
    if (y % 5 === 0) label.classList.add(y % 10 === 0 ? "decade" : "show");
    label.textContent = yr;
    label.style.gridRow = y + 1;
    frag.appendChild(label);

    // 52 weeks
    for (let w = 0; w < 52; w++) {
      const idx = y * 52 + w;
      const { weekDate, isPast, event, color } = weekInfo(idx, now);

      const cell = document.createElement("div");
      cell.className = "w";
      cell.style.gridColumn = w + 2;
      cell.style.gridRow = y + 1;

      if (isPast) {
        cell.style.background = color;
      } else {
        cell.style.background = "var(--future)";
      }

      if (idx === weeksLived) {
        cell.classList.add("w-now");
        nowEl = cell;
      }

      cell.dataset.week = String(idx + 1);
      cell.dataset.date = weekDate.toISOString().slice(0, 10);
      cell.dataset.event = event ? event.name : "";
      cell.dataset.past = String(isPast);
      if (event) cell.dataset.color = event.color;

      frag.appendChild(cell);
    }

    // Age label
    if (y % 5 === 0) {
      const age = document.createElement("div");
      age.className = "ag show";
      age.textContent = y;
      age.style.gridColumn = 54;
      age.style.gridRow = y + 1;
      frag.appendChild(age);
    }
  }

  grid.appendChild(frag);

  // Scroll current week into view
  if (nowEl) {
    requestAnimationFrame(() => {
      nowEl.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  }

  // Tooltip
  grid.addEventListener("mousemove", e => {
    const t = e.target;
    if (!t.classList.contains("w")) { tip.hidden = true; return; }

    const evName = t.dataset.event;
    const isPast = t.dataset.past === "true";
    const dateStr = t.dataset.date;

    tip.innerHTML =
      `<div class="tip-date">Week ${t.dataset.week} \u00b7 ${dateStr}</div>` +
      (evName ? `<div class="tip-event" style="color:${t.dataset.color}">${evName}</div>` : "") +
      `<div class="tip-sub">${isPast ? "past" : "future"} \u00b7 age ${Math.floor(parseInt(t.dataset.week) / 52)}</div>`;

    const x = e.clientX, y = e.clientY;
    tip.style.left = (x > window.innerWidth - 220 ? x - 210 : x + 14) + "px";
    tip.style.top = (y > window.innerHeight - 100 ? y - 80 : y + 14) + "px";
    tip.hidden = false;
  });

  grid.addEventListener("mouseleave", () => { tip.hidden = true; });
}

/* ── Init ──────────────────────────────────────────── */

renderHUD();
renderLegend();
renderGrid();
