// ================= LISTS =================
let interviewList = [];
let rejectedList = [];
let currentTab = 'allTab';

// ================= DOM =================
const totalCount = document.getElementById("totalCount");
const interviewCount = document.getElementById("interviewCount");
const rejectedCount = document.getElementById("rejectedCount");
const sectionCount = document.getElementById("sectionCount");

const allCard = document.getElementById("allCard");
const mainContainer = document.querySelector(".main-container");

const allFilterBtn = document.getElementById("allTab");
const interviewFilterBtn = document.getElementById("interviewTab");
const rejectedFilterBtn = document.getElementById("rejectedTab");

const filterSection = document.getElementById("filtered-section");

// ================= COUNT =================
function calculateCount() {
    let allJobsCount = allCard.children.length;
    totalCount.innerText = allJobsCount;
    interviewCount.innerText = interviewList.length;
    rejectedCount.innerText = rejectedList.length;

    if (currentTab === 'allTab') {
        sectionCount.innerText = allJobsCount + " jobs";
    } else {
        let listCount = (currentTab === 'interviewTab') ? interviewList.length : rejectedList.length;
        sectionCount.innerText = listCount + " of " + allJobsCount + " jobs";
    }
}
calculateCount();

// ================= TAB TOGGLE =================
function toggleStyle(id) {
    currentTab = id;

    // Reset all buttons to white
    allFilterBtn.classList.remove('bg-black', 'text-white');
    interviewFilterBtn.classList.remove('bg-black', 'text-white');
    rejectedFilterBtn.classList.remove('bg-black', 'text-white');

    allFilterBtn.classList.add('bg-white', 'text-black');
    interviewFilterBtn.classList.add('bg-white', 'text-black');
    rejectedFilterBtn.classList.add('bg-white', 'text-black');

    // Set selected button to black
    const selectedBtn = document.getElementById(id);
    selectedBtn.classList.remove('bg-white', 'text-black');
    selectedBtn.classList.add('bg-black', 'text-white');

    // Show/Hide Sections
    if (id == "allTab") {
        allCard.classList.remove("hidden");
        filterSection.classList.add("hidden");
    } else {
        allCard.classList.add("hidden");
        filterSection.classList.remove("hidden");
        if (id == "interviewTab") renderInterview();
        else renderRejected();
    }
    calculateCount();
}

// ================= MAIN CLICK EVENT =================
mainContainer.addEventListener("click", function (event) {
    const isInterview = event.target.classList.contains("interview-btn");
    const isRejected = event.target.classList.contains("rejected-btn");
    const isDelete = event.target.classList.contains("delete-btn");

    if (isInterview || isRejected || isDelete) {
        const card = event.target.closest(".card");
        const company = card.querySelector(".company").innerText;
        const position = card.querySelector(".position").innerText;
        const details = card.querySelector(".detais").innerText;
        const notes = card.querySelector(".notes").innerText;
        const job = { company, position, details, notes };

        // ১. অরিজিনাল কার্ড খুঁজে বের করা (for...of loop)
        let originalCard;
        const allMainCards = allCard.querySelectorAll(".card");
        for (let c of allMainCards) {
            if (c.querySelector(".company").innerText === company) {
                originalCard = c;
                break;
            }
        }

        // ২. ইন্টারভিউ বাটন লজিক
        if (isInterview) {
            const statusEl = originalCard.querySelector(".status");
            if (statusEl.innerText == "INTERVIEW") {
                statusEl.innerText = "NOT APPLIED";
                statusEl.className = "status inline-block text-[10px] font-bold px-3 py-1 rounded-md mb-4 bg-[#EFF6FF] text-[#3B82F6]";
                interviewList = interviewList.filter(item => item.company != company);
            } else {
                statusEl.innerText = "INTERVIEW";
                statusEl.className = "status inline-block text-[10px] font-bold px-3 py-1 rounded-md mb-4 bg-green-50 text-green-600";
                rejectedList = rejectedList.filter(item => item.company != company);
                if (!interviewList.find(item => item.company == company)) interviewList.push(job);
            }
        }

        // ৩. রিজেক্টেড বাটন লজিক
        if (isRejected) {
            const statusEl = originalCard.querySelector(".status");
            if (statusEl.innerText == "REJECTED") {
                statusEl.innerText = "NOT APPLIED";
                statusEl.className = "status inline-block text-[10px] font-bold px-3 py-1 rounded-md mb-4 bg-[#EFF6FF] text-[#3B82F6]";
                rejectedList = rejectedList.filter(item => item.company != company);
            } else {
                statusEl.innerText = "REJECTED";
                statusEl.className = "status inline-block text-[10px] font-bold px-3 py-1 rounded-md mb-4 bg-red-50 text-red-600";
                interviewList = interviewList.filter(item => item.company != company);
                if (!rejectedList.find(item => item.company == company)) rejectedList.push(job);
            }
        }

        // ৪. ডিলিট বাটন লজিক
        if (isDelete) {
            interviewList = interviewList.filter(item => item.company != company);
            rejectedList = rejectedList.filter(item => item.company != company);
            originalCard.remove();
        }

        calculateCount();
        if (currentTab === 'interviewTab') renderInterview();
        else if (currentTab === 'rejectedTab') renderRejected();
    }
});

// ================= RENDER HELPERS (for...of) =================
function createCardHTML(job, statusType) {
    let statusClass = statusType === 'INTERVIEW' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600';
    return `
        <div class="w-full">
          <h1 class="company font-bold text-[#1E293B] text-lg">${job.company}</h1>
          <p class="position text-gray-500 text-sm font-medium mb-2">${job.position}</p>
          <p class="detais text-[11px] text-gray-400 mb-4 uppercase tracking-wider">${job.details}</p>
          <span class="status inline-block text-[10px] font-bold px-3 py-1 rounded-md mb-4 ${statusClass}">${statusType}</span>
          <p class="notes text-[13px] text-gray-500 leading-relaxed mb-6">${job.notes}</p>
          <div class="flex gap-3">
            <button class="interview-btn border border-green-500 text-green-600 text-[10px] font-bold px-3 py-1.5 rounded">INTERVIEW</button>
            <button class="rejected-btn border border-red-300 text-red-400 text-[10px] font-bold px-3 py-1.5 rounded">REJECTED</button>
          </div>
        </div>
        <button class="delete-btn text-xl h-fit text-gray-300">🗑️</button>
    `;
}

function renderInterview() {
    filterSection.innerHTML = "";
    if (interviewList.length == 0) { showNoJobs(); return; }
    for (let job of interviewList) {
        let div = document.createElement("div");
        div.className = "card flex justify-between bg-white rounded-lg p-6 border border-gray-100 card-shadow relative mb-4";
        div.innerHTML = createCardHTML(job, 'INTERVIEW');
        filterSection.appendChild(div);
    }
}

function renderRejected() {
    filterSection.innerHTML = "";
    if (rejectedList.length == 0) { showNoJobs(); return; }
    for (let job of rejectedList) {
        let div = document.createElement("div");
        div.className = "card flex justify-between bg-white rounded-lg p-6 border border-gray-100 card-shadow relative mb-4";
        div.innerHTML = createCardHTML(job, 'REJECTED');
        filterSection.appendChild(div);
    }
}

function showNoJobs() {
    filterSection.innerHTML = `
        <div class="flex flex-col items-center py-20 bg-white rounded-lg shadow-sm border border-dashed border-gray-200">
          <img src="/jobs.png" mb-4">
          <h1 class="font-semibold text-gray-600">No jobs available</h1>
          <p class="text-sm text-gray-400">Check back soon for new opportunities</p>
        </div>
    `;
}