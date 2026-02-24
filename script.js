let interviewList = [];
let rejectedList = [];


let totalCount = document.getElementById("totalCount");
let interviewCount = document.getElementById("interviewCount");
let rejectedCount = document.getElementById("rejectedCount");
let allCard = document.getElementById("allCard");
let mainContainer = document.querySelector(".main-container")

const allFilterBtn = document.getElementById("allTab");
const interviewFilterBtn = document.getElementById("interviewTab");
const rejectedFilterBtn = document.getElementById("rejectedTab");
const filterSection = document.getElementById("filtered-section");



function calculateCount(){
  totalCount.innerText = allCard.children.length
  interviewCount.innerText = interviewList.length
  rejectedCount.innerText = rejectedList.length
}
calculateCount(); 

// button toggling function
function toggleStyle(id){
  allFilterBtn.classList.remove('bg-black', 'text-white')
  interviewFilterBtn.classList.remove('bg-black', 'text-white')
  rejectedFilterBtn.classList.remove('bg-black', 'text-white')

  allFilterBtn.classList.add('bg-white', 'text-black')
  interviewFilterBtn.classList.add('bg-white', 'text-black')
  rejectedFilterBtn.classList.add('bg-white', 'text-black')

  const selectedBtn = document.getElementById(id)
  selectedBtn.classList.remove('bg-white', 'text-black')
  selectedBtn.classList.add('bg-black', 'text-white')

  if (id == 'interviewTab'){
    allCard.classList.add('hidden')
    filterSection.classList.remove('hidden')
  }
}

// tab filtering ekhane (valo kore bujhi nai)
mainContainer.addEventListener('click', function(event){
  if (event.target.classList.contains('interview-btn')){
    const parentNode = event.target.parentNode.parentNode;
  const company = parentNode.querySelector('.company')
  const position = parentNode.querySelector('.position')
  const details = parentNode.querySelector('.details')
  const status = parentNode.querySelector('.status')
  const notes = parentNode.querySelector('.notes')

  const cardInfo = {
    company,
    position,
    details,
    status,
    notes
  }

  const jobCardExist = interviewList.find(item=> item.interviewList == cardInfo.interviewList)
  parentNode.querySelector('.status').innerText = 'Interview'
  if(!jobCardExist){
    interviewList.push(cardInfo)
  }
  renderInterview()
  }

})

function renderInterview (){
  filterSection.innerHTML = ""

  for (let interview of interviewList){
    let div = document.createElement('div');
    div.className = 'card flex justify-between bg-white rounded p-5 mb-4'
    div.innerHTML = `
    <div>
              
              <h1 class="company">Mobile First Corporation</h1>
              <p class="position">React Native Developer</p>
              <p class="details py-6">Remote - Full Time - $130.00-$175.00</p>
              <p class="status">Not Applied</p>
              <p class="notes pb-6">Build Cross Platform Mobile Application Using React Native</p>
             
               <div class="flex gap-5">
                <button class="interview-btn border border-green-500 rounded text-green-500 px-4 py-2">Interview</button>
                <button class="rejected-btn border border-red-500 rounded text-red-500 px-4 py-2">Rejected</button>
               </div>
            </div>
            `
            filterSection.appendChild(div)
  }
}