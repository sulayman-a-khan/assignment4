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
    } 
    else if (currentTab === 'interviewTab') {
        sectionCount.innerText = interviewList.length + " of " + allJobsCount + " jobs";
    } 
    else if (currentTab === 'rejectedTab') {
        sectionCount.innerText = rejectedList.length + " of " + allJobsCount + " jobs";
    }
}
calculateCount();

// ================= TAB TOGGLE =================
function toggleStyle(id) {
    currentTab = id;

    // Reset buttons
    allFilterBtn.classList.remove('bg-black', 'text-white');
    interviewFilterBtn.classList.remove('bg-black', 'text-white');
    rejectedFilterBtn.classList.remove('bg-black', 'text-white');

    allFilterBtn.classList.add('bg-white', 'text-black');
    interviewFilterBtn.classList.add('bg-white', 'text-black');
    rejectedFilterBtn.classList.add('bg-white', 'text-black');

    // Active button
    const selectedBtn = document.getElementById(id);
    selectedBtn.classList.remove('bg-white', 'text-black');
    selectedBtn.classList.add('bg-black', 'text-white');

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

        const job = {
            company: card.querySelector(".company").innerText,
            position: card.querySelector(".position").innerText,
            details: card.querySelector(".details").innerText, 
            notes: card.querySelector(".notes").innerText
        };

        // অরিজিনাল কার্ড খুঁজে বের করা
        let originalCard;
        const allMainCards = allCard.querySelectorAll(".card");
        for (let c of allMainCards) {
            if (c.querySelector(".company").innerText === job.company) {
                originalCard = c;
                break;
            }
        }

        // ইন্টারভিউ লজিক
        if (isInterview) {
            const statusEl = originalCard.querySelector(".status");
            if (statusEl.innerText == "INTERVIEW") {
                statusEl.innerText = "NOT APPLIED";
                statusEl.className = "status inline-block text-[10px] font-bold px-3 py-1 rounded-md mb-4 bg-[#EFF6FF] text-[#3B82F6]";
                interviewList = interviewList.filter(item => item.company != job.company);
            } else {
                statusEl.innerText = "INTERVIEW";
                statusEl.className = "status inline-block text-[10px] font-bold px-3 py-1 rounded-md mb-4 bg-green-50 text-green-600";
                rejectedList = rejectedList.filter(item => item.company != job.company);
                
                let isExist = false;
                for(let item of interviewList) { if(item.company == job.company) isExist = true; }
                if (!isExist) interviewList.push(job);
            }
        }

        // রিজেক্টেড লজিক
        if (isRejected) {
            const statusEl = originalCard.querySelector(".status");
            if (statusEl.innerText == "REJECTED") {
                statusEl.innerText = "NOT APPLIED";
                statusEl.className = "status inline-block text-[10px] font-bold px-3 py-1 rounded-md mb-4 bg-[#EFF6FF] text-[#3B82F6]";
                rejectedList = rejectedList.filter(item => item.company != job.company);
            } else {
                statusEl.innerText = "REJECTED";
                statusEl.className = "status inline-block text-[10px] font-bold px-3 py-1 rounded-md mb-4 bg-red-50 text-red-600";
                interviewList = interviewList.filter(item => item.company != job.company);
                
                let isExist = false;
                for(let item of rejectedList) { if(item.company == job.company) isExist = true; }
                if (!isExist) rejectedList.push(job);
            }
        }

        // ডিলিট লজিক
        if (isDelete) {
            interviewList = interviewList.filter(item => item.company != job.company);
            rejectedList = rejectedList.filter(item => item.company != job.company);
            originalCard.remove();
        }

        calculateCount();
        if (currentTab === 'interviewTab') renderInterview();
        else if (currentTab === 'rejectedTab') renderRejected();
    }
});

// ================= RENDER HELPERS =================
function createCardHTML(job, statusType) {
    let statusClass = "";
    if (statusType === 'INTERVIEW') {
        statusClass = 'bg-green-50 text-green-600';
    } else {
        statusClass = 'bg-red-50 text-red-600';
    }

    return '<div class="w-full">' +
           '<h1 class="company font-bold text-[#1E293B] text-lg">' + job.company + '</h1>' +
           '<p class="position text-gray-500 text-sm font-medium mb-2">' + job.position + '</p>' +
           '<p class="details text-[11px] text-gray-400 mb-4 uppercase tracking-wider">' + job.details + '</p>' +
           '<span class="status inline-block text-[10px] font-bold px-3 py-1 rounded-md mb-4 ' + statusClass + '">' + statusType + '</span>' +
           '<p class="notes text-[13px] text-gray-500 leading-relaxed mb-6">' + job.notes + '</p>' +
           // ✨ Responsive button container
           '<div class="flex flex-col md:flex-row gap-2 md:gap-3">' +
           '<button class="interview-btn border border-green-500 text-green-600 text-[10px] font-bold px-3 py-1.5 rounded">INTERVIEW</button>' +
           '<button class="rejected-btn border border-red-300 text-red-400 text-[10px] font-bold px-3 py-1.5 rounded">REJECTED</button>' +
           '</div>' +
           '</div>' +
           '<button class="delete-btn text-xl h-fit text-gray-300">🗑️</button>';
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
    filterSection.innerHTML = 
        '<div class="flex flex-col items-center py-20 bg-white rounded-lg shadow-sm border border-dashed border-gray-200">' +
        '<img src="./jobs.png" class="mb-4">' +
        '<h1 class="font-semibold text-gray-600">No jobs available</h1>' +
        '<p class="text-sm text-gray-400">Check back soon for new opportunities</p>' +
        '</div>';
}