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
}