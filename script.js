const birthDate = new Date("1991-04-15");

const lifeEvents = [
  { name: "Kindergarten", startDate: new Date(1997, 8, 1), endDate: new Date(1998, 7, 31), color: "#f6c453" },
  { name: "Elementary School", startDate: new Date(1998, 8, 1), endDate: new Date(1999, 5, 31), color: "#3ea66b" },
  { name: "Summer Vacation", startDate: new Date(1999, 6, 1), endDate: new Date(1999, 7, 31), color: "#f2db74" },
  { name: "Elementary School", startDate: new Date(1999, 8, 1), endDate: new Date(2000, 5, 31), color: "#3ea66b" },
  { name: "Summer Vacation", startDate: new Date(2000, 6, 1), endDate: new Date(2000, 7, 31), color: "#f2db74" },
  { name: "Elementary School", startDate: new Date(2000, 8, 1), endDate: new Date(2001, 5, 31), color: "#3ea66b" },
  { name: "Summer Vacation", startDate: new Date(2001, 6, 1), endDate: new Date(2001, 7, 31), color: "#f2db74" },
  { name: "Middle School", startDate: new Date(2001, 8, 1), endDate: new Date(2002, 5, 31), color: "#4b93d5" },
  { name: "Summer Vacation", startDate: new Date(2002, 6, 1), endDate: new Date(2002, 7, 31), color: "#f2db74" },
  { name: "Middle School", startDate: new Date(2002, 8, 1), endDate: new Date(2003, 5, 31), color: "#4b93d5" },
  { name: "Summer Vacation", startDate: new Date(2003, 6, 1), endDate: new Date(2003, 7, 31), color: "#f2db74" },
  { name: "Middle School", startDate: new Date(2003, 8, 1), endDate: new Date(2004, 5, 31), color: "#4b93d5" },
  { name: "Summer Vacation", startDate: new Date(2004, 6, 1), endDate: new Date(2004, 7, 31), color: "#f2db74" },
  { name: "Middle School", startDate: new Date(2004, 8, 1), endDate: new Date(2005, 5, 31), color: "#4b93d5" },
  { name: "Summer Vacation", startDate: new Date(2005, 6, 1), endDate: new Date(2005, 7, 31), color: "#f2db74" },
  { name: "Middle School", startDate: new Date(2005, 8, 1), endDate: new Date(2006, 5, 31), color: "#4b93d5" },
  { name: "Summer Vacation", startDate: new Date(2006, 6, 1), endDate: new Date(2006, 7, 31), color: "#f2db74" },
  { name: "College", startDate: new Date(2006, 8, 1), endDate: new Date(2007, 5, 31), color: "#8e78d5" },
  { name: "Summer Vacation", startDate: new Date(2007, 6, 1), endDate: new Date(2007, 7, 31), color: "#f2db74" },
  { name: "College", startDate: new Date(2007, 8, 1), endDate: new Date(2008, 5, 31), color: "#8e78d5" },
  { name: "Summer Vacation", startDate: new Date(2008, 6, 1), endDate: new Date(2008, 7, 31), color: "#f2db74" },
  { name: "College", startDate: new Date(2008, 8, 1), endDate: new Date(2009, 5, 31), color: "#8e78d5" },
  { name: "Summer Vacation", startDate: new Date(2009, 6, 1), endDate: new Date(2009, 7, 31), color: "#f2db74" },
  { name: "College", startDate: new Date(2009, 8, 1), endDate: new Date(2010, 5, 31), color: "#8e78d5" },
  { name: "Army", startDate: new Date(2010, 6, 1), endDate: new Date(2011, 5, 31), color: "#c55656" },
  { name: "Mechnikov Research Institute", startDate: new Date(2011, 9, 1), endDate: new Date(2014, 6, 31), color: "#6577c4" },
  { name: "Playflock", startDate: new Date(2014, 7, 1), endDate: new Date(2015, 7, 31), color: "#de6f9a" },
  { name: "Rambler & LiveJournal", startDate: new Date(2015, 7, 1), endDate: new Date(2017, 5, 31), color: "#d58e49" },
  { name: "Booking.com", startDate: new Date(2017, 7, 1), endDate: new Date(2024, 4, 31), color: "#3560b7" },
  { name: "AI Freelance", startDate: new Date(2023, 2, 1), endDate: new Date(), color: "#3a9156" },
];

const seasonColors = {
  Winter: "#d6e5f8",
  Spring: "#daeed4",
  Summer: "#f8dfd7",
  Fall: "#f6e5cd",
};

function getSeasonInfo(date) {
  const month = date.getMonth();
  const day = date.getDate();

  if ((month === 11 && day >= 21) || month < 2 || (month === 2 && day < 20)) {
    const next = new Date(date.getFullYear(), 2, 20);
    return { currentSeason: "Winter", weeksUntilNextSeason: Math.ceil((next - date) / 604800000) };
  }

  if (month < 5 || (month === 5 && day < 21)) {
    const next = new Date(date.getFullYear(), 5, 21);
    return { currentSeason: "Spring", weeksUntilNextSeason: Math.ceil((next - date) / 604800000) };
  }

  if (month < 8 || (month === 8 && day < 23)) {
    const next = new Date(date.getFullYear(), 8, 23);
    return { currentSeason: "Summer", weeksUntilNextSeason: Math.ceil((next - date) / 604800000) };
  }

  const next = new Date(date.getFullYear() + 1, 11, 21);
  return { currentSeason: "Fall", weeksUntilNextSeason: Math.ceil((next - date) / 604800000) };
}

function weekData(weekIndex, now) {
  const weekDate = new Date(birthDate.getTime() + weekIndex * 604800000);
  const isPast = weekDate <= now;

  if (!isPast) {
    return { weekDate, isPast, event: null, color: "var(--future)" };
  }

  const event = lifeEvents.find((item) => weekDate >= item.startDate && weekDate <= item.endDate) || null;
  return { weekDate, isPast, event, color: event ? event.color : "#b9d1f0" };
}

function renderCalendar() {
  const container = document.getElementById("calendar-container");
  const tooltip = document.getElementById("tooltip");
  const now = new Date();
  const weeksLived = Math.floor((now - birthDate) / 604800000);
  const totalWeeks = weeksLived + 52 * 5;
  const totalYears = Math.ceil(totalWeeks / 52);

  const table = document.createElement("table");

  const thead = document.createElement("thead");
  const seasonRow = document.createElement("tr");
  seasonRow.appendChild(document.createElement("th"));

  const seasonOrder = ["Winter", "Spring", "Summer", "Fall"];
  const seasonInfo = getSeasonInfo(birthDate);
  const seasonLengths = [seasonInfo.weeksUntilNextSeason, 13, 13, 13, 52 - seasonInfo.weeksUntilNextSeason - 39];

  for (let i = 0; i < 4; i += 1) {
    const season = seasonOrder[(seasonOrder.indexOf(seasonInfo.currentSeason) + i) % 4];
    const th = document.createElement("th");
    th.colSpan = seasonLengths[i];
    th.className = "season";
    th.style.background = seasonColors[season];
    th.textContent = season;
    seasonRow.appendChild(th);
  }

  if (seasonLengths[4] > 0) {
    const th = document.createElement("th");
    th.colSpan = seasonLengths[4];
    th.className = "season";
    th.style.background = seasonColors.Spring;
    th.textContent = "Spring";
    seasonRow.appendChild(th);
  }

  seasonRow.appendChild(document.createElement("th"));
  thead.appendChild(seasonRow);
  table.appendChild(thead);

  const tbody = document.createElement("tbody");

  for (let yearIndex = 0; yearIndex < totalYears; yearIndex += 1) {
    const tr = document.createElement("tr");

    const yearCell = document.createElement("th");
    yearCell.className = "year";
    yearCell.textContent = String(birthDate.getFullYear() + yearIndex);
    tr.appendChild(yearCell);

    for (let week = 0; week < 52; week += 1) {
      const absoluteWeek = yearIndex * 52 + week;
      const { weekDate, isPast, event, color } = weekData(absoluteWeek, now);
      const td = document.createElement("td");
      td.className = "week";
      if (!isPast) td.classList.add("future");
      td.style.background = color;
      td.dataset.weekNumber = String(absoluteWeek + 1);
      td.dataset.date = weekDate.toISOString().slice(0, 10);
      td.dataset.event = event ? event.name : "";
      td.dataset.past = String(isPast);
      tr.appendChild(td);
    }

    const ageCell = document.createElement("td");
    ageCell.className = "age";
    ageCell.textContent = String(yearIndex);
    tr.appendChild(ageCell);

    tbody.appendChild(tr);
  }

  table.appendChild(tbody);

  table.addEventListener("mousemove", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLTableCellElement) || !target.classList.contains("week")) {
      tooltip.hidden = true;
      return;
    }

    const lines = [
      `Week ${target.dataset.weekNumber}`,
      `Date: ${target.dataset.date}`,
      target.dataset.event ? `Event: ${target.dataset.event}` : "",
      target.dataset.past === "true" ? "Past" : "Future",
    ].filter(Boolean);

    tooltip.innerHTML = lines.join("<br>");
    tooltip.style.left = `${event.clientX + 12}px`;
    tooltip.style.top = `${event.clientY + 12}px`;
    tooltip.hidden = false;
  });

  table.addEventListener("mouseleave", () => {
    tooltip.hidden = true;
  });

  container.innerHTML = "";
  container.appendChild(table);
}

renderCalendar();
