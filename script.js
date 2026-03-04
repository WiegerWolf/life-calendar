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

const seasonColors = {
  Winter: "#2a3a5c",
  Spring: "#2a4a35",
  Summer: "#5c3a2a",
  Fall: "#5c4a2a",
};

// ── Helpers ──────────────────────────────────────

function getSeasonInfo(date) {
  const m = date.getMonth(), d = date.getDate();
  if ((m === 11 && d >= 21) || m < 2 || (m === 2 && d < 20)) {
    return { currentSeason: "Winter", weeksUntilNextSeason: Math.ceil((new Date(date.getFullYear(), 2, 20) - date) / MS_WEEK) };
  }
  if (m < 5 || (m === 5 && d < 21)) {
    return { currentSeason: "Spring", weeksUntilNextSeason: Math.ceil((new Date(date.getFullYear(), 5, 21) - date) / MS_WEEK) };
  }
  if (m < 8 || (m === 8 && d < 23)) {
    return { currentSeason: "Summer", weeksUntilNextSeason: Math.ceil((new Date(date.getFullYear(), 8, 23) - date) / MS_WEEK) };
  }
  return { currentSeason: "Fall", weeksUntilNextSeason: Math.ceil((new Date(date.getFullYear() + 1, 11, 21) - date) / MS_WEEK) };
}

function weekData(weekIndex, now) {
  const weekDate = new Date(birthDate.getTime() + weekIndex * MS_WEEK);
  const isPast = weekDate <= now;
  if (!isPast) return { weekDate, isPast, event: null, color: "var(--future)" };
  const event = lifeEvents.find(e => weekDate >= e.startDate && weekDate <= e.endDate) || null;
  return { weekDate, isPast, event, color: event ? event.color : "#2a3045" };
}

function fmtDuration(ms) {
  const totalMonths = Math.round(ms / (MS_WEEK * 4.345));
  const y = Math.floor(totalMonths / 12);
  const m = totalMonths % 12;
  if (y === 0) return `${m}mo`;
  if (m === 0) return `${y}y`;
  return `${y}y ${m}mo`;
}

function fmtDate(d) {
  return d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

// Deduplicate events for legend/breakdown (merge consecutive same-name events)
function mergedEvents() {
  const merged = [];
  for (const ev of lifeEvents) {
    const last = merged[merged.length - 1];
    if (last && last.name === ev.name) {
      last.endDate = ev.endDate;
    } else {
      merged.push({ ...ev, startDate: new Date(ev.startDate), endDate: new Date(ev.endDate) });
    }
  }
  return merged;
}

// ── Stats strip ──────────────────────────────────

function renderStats() {
  const now = new Date();
  const weeksLived = Math.floor((now - birthDate) / MS_WEEK);
  const ageYears = Math.floor((now - birthDate) / (MS_WEEK * 52));
  const daysAlive = Math.floor((now - birthDate) / 86400000);
  const pctIf80 = ((weeksLived / (80 * 52)) * 100).toFixed(1);
  const currentEvent = lifeEvents.find(e => now >= e.startDate && now <= e.endDate);

  const chips = [
    { label: "Age", value: ageYears },
    { label: "Weeks lived", value: weeksLived.toLocaleString() },
    { label: "Days alive", value: daysAlive.toLocaleString() },
    { label: "Life (if 80y)", value: `${pctIf80}%` },
  ];
  if (currentEvent) {
    chips.push({ label: "Now", value: currentEvent.name });
  }

  document.getElementById("stats-strip").innerHTML = chips
    .map(c => `<div class="stat-chip"><span>${c.label}</span> <strong>${c.value}</strong></div>`)
    .join("");
}

// ── Legend ────────────────────────────────────────

let activeFilter = null;

function renderLegend() {
  const events = mergedEvents();
  const container = document.getElementById("legend");
  container.innerHTML = events.map((ev, i) => {
    const dur = fmtDuration(ev.endDate - ev.startDate);
    return `<button class="legend-item" data-event-name="${ev.name}" title="${fmtDate(ev.startDate)} — ${fmtDate(ev.endDate)}">
      <span class="legend-dot" style="background:${ev.color}"></span>
      <span>${ev.name}</span>
      <span class="legend-dur">${dur}</span>
    </button>`;
  }).join("");

  container.addEventListener("click", (e) => {
    const btn = e.target.closest(".legend-item");
    if (!btn) return;
    const name = btn.dataset.eventName;
    const wasActive = btn.classList.contains("active");

    container.querySelectorAll(".legend-item").forEach(b => b.classList.remove("active"));

    if (wasActive) {
      activeFilter = null;
      document.querySelector(".calendar-wrap").classList.remove("calendar-filtered");
      document.querySelectorAll(".week.highlight").forEach(w => w.classList.remove("highlight"));
    } else {
      btn.classList.add("active");
      activeFilter = name;
      document.querySelector(".calendar-wrap").classList.add("calendar-filtered");
      document.querySelectorAll(".week").forEach(w => {
        w.classList.toggle("highlight", w.dataset.event === name);
      });
    }
  });
}

// ── Decade nav ───────────────────────────────────

function renderDecadeNav(totalYears) {
  const startYear = birthDate.getFullYear();
  const nav = document.getElementById("decade-nav");
  const decades = [];
  for (let y = 0; y < totalYears; y += 10) {
    decades.push(startYear + y);
  }
  nav.innerHTML = decades.map(d =>
    `<button class="decade-btn" data-year="${d}">${d}s</button>`
  ).join("");

  nav.addEventListener("click", (e) => {
    const btn = e.target.closest(".decade-btn");
    if (!btn) return;
    const row = document.getElementById("row-" + btn.dataset.year);
    if (row) row.scrollIntoView({ behavior: "smooth", block: "center" });
  });
}

// ── Breakdown cards ──────────────────────────────

function renderBreakdown() {
  const events = mergedEvents();
  const now = new Date();
  const totalWeeksLived = Math.floor((now - birthDate) / MS_WEEK);
  const container = document.getElementById("breakdown");

  container.innerHTML = events.map(ev => {
    const weeks = Math.floor((ev.endDate - ev.startDate) / MS_WEEK);
    const pct = ((weeks / totalWeeksLived) * 100).toFixed(1);
    return `<div class="bd-card">
      <div class="bd-color" style="background:${ev.color}"></div>
      <div class="bd-info">
        <div class="bd-name">${ev.name}</div>
        <div class="bd-meta">${fmtDate(ev.startDate)} — ${fmtDate(ev.endDate)} &middot; ${weeks}w &middot; ${pct}%</div>
        <div class="bd-bar"><div class="bd-bar-fill" style="width:${pct}%;background:${ev.color}"></div></div>
      </div>
    </div>`;
  }).join("");
}

// ── Calendar ─────────────────────────────────────

function renderCalendar() {
  const container = document.getElementById("calendar-container");
  const tooltip = document.getElementById("tooltip");
  const now = new Date();
  const weeksLived = Math.floor((now - birthDate) / MS_WEEK);
  const totalWeeks = weeksLived + 52 * 5;
  const totalYears = Math.ceil(totalWeeks / 52);

  const table = document.createElement("table");

  // Season headers
  const thead = document.createElement("thead");
  const seasonRow = document.createElement("tr");
  seasonRow.appendChild(document.createElement("th"));

  const seasonOrder = ["Winter", "Spring", "Summer", "Fall"];
  const seasonInfo = getSeasonInfo(birthDate);
  const seasonLengths = [seasonInfo.weeksUntilNextSeason, 13, 13, 13, 52 - seasonInfo.weeksUntilNextSeason - 39];

  for (let i = 0; i < 4; i++) {
    const season = seasonOrder[(seasonOrder.indexOf(seasonInfo.currentSeason) + i) % 4];
    const th = document.createElement("th");
    th.colSpan = seasonLengths[i];
    th.className = "season-hdr";
    th.style.background = seasonColors[season];
    th.style.color = "rgba(255,255,255,0.7)";
    th.textContent = season;
    seasonRow.appendChild(th);
  }

  if (seasonLengths[4] > 0) {
    const th = document.createElement("th");
    th.colSpan = seasonLengths[4];
    th.className = "season-hdr";
    th.style.background = seasonColors.Spring;
    th.style.color = "rgba(255,255,255,0.7)";
    th.textContent = "Spring";
    seasonRow.appendChild(th);
  }

  seasonRow.appendChild(document.createElement("th"));
  thead.appendChild(seasonRow);
  table.appendChild(thead);

  // Body
  const tbody = document.createElement("tbody");

  for (let yearIndex = 0; yearIndex < totalYears; yearIndex++) {
    const tr = document.createElement("tr");
    const yr = birthDate.getFullYear() + yearIndex;
    tr.id = "row-" + yr;

    const yearCell = document.createElement("th");
    yearCell.className = "col-year";
    yearCell.textContent = yr;
    tr.appendChild(yearCell);

    for (let week = 0; week < 52; week++) {
      const absWeek = yearIndex * 52 + week;
      const { weekDate, isPast, event, color } = weekData(absWeek, now);
      const td = document.createElement("td");
      td.className = "week";
      if (!isPast) td.classList.add("future");
      if (absWeek === weeksLived) td.classList.add("week-now");
      td.style.background = color;
      td.dataset.weekNumber = String(absWeek + 1);
      td.dataset.date = weekDate.toISOString().slice(0, 10);
      td.dataset.event = event ? event.name : "";
      td.dataset.past = String(isPast);
      tr.appendChild(td);
    }

    const ageCell = document.createElement("td");
    ageCell.className = "col-age";
    ageCell.textContent = yearIndex;
    tr.appendChild(ageCell);

    tbody.appendChild(tr);
  }

  table.appendChild(tbody);

  // Tooltip
  table.addEventListener("mousemove", (e) => {
    const t = e.target;
    if (!(t instanceof HTMLTableCellElement) || !t.classList.contains("week")) {
      tooltip.hidden = true;
      return;
    }

    const eventName = t.dataset.event;
    const isPast = t.dataset.past === "true";
    const badgeColor = isPast ? (eventName ? t.style.background : "#2a3045") : "var(--future)";
    const badgeLabel = isPast ? "Past" : "Future";
    const badgeText = isPast ? "#c8e6c9" : "#b0bec5";
    const badgeBg = isPast ? "rgba(76,175,80,0.15)" : "rgba(144,164,174,0.15)";

    tooltip.innerHTML = `
      <div class="tt-date">Week ${t.dataset.weekNumber} &middot; ${t.dataset.date}</div>
      ${eventName ? `<div class="tt-event" style="color:${t.style.background}">${eventName}</div>` : ""}
      <span class="tt-badge" style="background:${badgeBg};color:${badgeText}">${badgeLabel}</span>
    `;
    const x = e.clientX, y = e.clientY;
    const flip = x > window.innerWidth - 240;
    tooltip.style.left = flip ? `${x - 230}px` : `${x + 14}px`;
    tooltip.style.top = `${y + 14}px`;
    tooltip.hidden = false;
  });

  table.addEventListener("mouseleave", () => { tooltip.hidden = true; });

  container.innerHTML = "";
  container.appendChild(table);

  renderDecadeNav(totalYears);
}

// ── Init ─────────────────────────────────────────

renderStats();
renderLegend();
renderCalendar();
renderBreakdown();
