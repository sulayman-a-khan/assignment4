// ================= JOB DATA =================
const jobs = [
  {
    id: 1,
    company: "Mobile First Corp",
    position: "React Native Developer",
    location: "Remote",
    type: "Full-time",
    salary: "$130k - $175k",
    desc: "Build cross-platform mobile applications using React Native.",
    status: "all",
  },
  {
    id: 2,
    company: "WebFlow Agency",
    position: "Web Designer & Developer",
    location: "Los Angeles, CA",
    type: "Part-time",
    salary: "$80k - $120k",
    desc: "Create stunning web experiences.",
    status: "all",
  },
];

// ================= GLOBAL STATE =================
let currentTab = "all";

// ================= DOM SELECT =================
const container = document.getElementById("cardsContainer");
const noJobs = document.getElementById("noJobs");

const totalCount = document.getElementById("totalCount");
const interviewCount = document.getElementById("interviewCount");
const rejectedCount = document.getElementById("rejectedCount");
const sectionCount = document.getElementById("sectionCount");

const allTab = document.getElementById("allTab");
const interviewTab = document.getElementById("interviewTab");
const rejectedTab = document.getElementById("rejectedTab");

// ================= UPDATE COUNT =================
function updateCounts() {
  const total = jobs.length;
  const interview = jobs.filter(j => j.status === "interview").length;
  const rejected = jobs.filter(j => j.status === "rejected").length;

  totalCount.innerText = total;
  interviewCount.innerText = interview;
  rejectedCount.innerText = rejected;

  if (currentTab === "all") {
    sectionCount.innerText = total + " jobs";
  } else if (currentTab === "interview") {
    sectionCount.innerText = interview + " of " + total + " jobs";
  } else {
    sectionCount.innerText = rejected + " of " + total + " jobs";
  }
}

// ================= RENDER CARDS =================
function renderCards() {
  container.innerHTML = "";

  const filtered =
    currentTab === "all"
      ? jobs
      : jobs.filter(j => j.status === currentTab);

  if (filtered.length === 0) {
    noJobs.classList.remove("hidden");
  } else {
    noJobs.classList.add("hidden");
  }

  filtered.forEach(job => {
    const card = document.createElement("div");
    card.className = "bg-white p-6 rounded shadow mb-4 relative";

    const badgeColor =
      job.status === "interview"
        ? "text-green-600"
        : job.status === "rejected"
        ? "text-red-600"
        : "text-gray-500";

    const badgeText =
      job.status === "all"
        ? "NOT APPLIED"
        : job.status.toUpperCase();

    card.innerHTML = `
      <button onclick="deleteJob(${job.id})"
        class="absolute top-4 right-4 text-gray-400 hover:text-red-500">
        ✕
      </button>

      <h2 class="font-semibold">${job.company}</h2>
      <p class="text-sm text-gray-600">${job.position}</p>
      <p class="text-xs text-gray-400 mt-1">
        ${job.location} · ${job.type} · ${job.salary}
      </p>

      <p class="text-xs ${badgeColor} mt-2 font-semibold">
        ${badgeText}
      </p>

      <p class="text-sm text-gray-500 mt-3">${job.desc}</p>

      <div class="flex gap-3 mt-4">
        <button onclick="setStatus(${job.id},'interview')"
          class="btn btn-xs btn-outline btn-success">
          Interview
        </button>

        <button onclick="setStatus(${job.id},'rejected')"
          class="btn btn-xs btn-outline btn-error">
          Rejected
        </button>
      </div>
    `;

    container.appendChild(card);
  });

  updateCounts();
}

// ================= STATUS CHANGE =================
function setStatus(id, status) {
  const job = jobs.find(j => j.id === id);

  if (job.status === status) {
    job.status = "all";
  } else {
    job.status = status;
  }

  renderCards();
}

// ================= DELETE =================
function deleteJob(id) {
  const index = jobs.findIndex(j => j.id === id);
  jobs.splice(index, 1);
  renderCards();
}

// ================= ACTIVE TAB STYLE =================
function resetTabStyle() {
  allTab.classList.remove("btn-primary");
  interviewTab.classList.remove("btn-primary");
  rejectedTab.classList.remove("btn-primary");
}

// ================= TAB EVENTS =================
allTab.addEventListener("click", function () {
  resetTabStyle();
  this.classList.add("btn-primary");
  currentTab = "all";
  renderCards();
});

interviewTab.addEventListener("click", function () {
  resetTabStyle();
  this.classList.add("btn-primary");
  currentTab = "interview";
  renderCards();
});

rejectedTab.addEventListener("click", function () {
  resetTabStyle();
  this.classList.add("btn-primary");
  currentTab = "rejected";
  renderCards();
});

// প্রথম load
renderCards();