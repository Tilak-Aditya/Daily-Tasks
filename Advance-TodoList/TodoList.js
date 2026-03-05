const titleInput = document.getElementById("taskTitle");
const dateInput = document.getElementById("taskDate");
const timeInput = document.getElementById("taskTime");
const addBtn = document.getElementById("addTask");
const todayTasks = document.getElementById("todayTasks");
const upcomingTasks = document.getElementById("upcomingTasks");
const planner = document.getElementById("planner");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

addBtn.addEventListener("click", addTask);

function addTask(){

if(titleInput.value === "" || dateInput.value === "" || timeInput.value === "") return;

const task = {
id: Date.now(),
title: titleInput.value,
date: dateInput.value,
time: timeInput.value,
completed:false
};

tasks.push(task);

saveTasks();
DisplayTasks();
clearInputs();

}

function clearInputs(){
titleInput.value="";
dateInput.value="";
timeInput.value="";
}

function DisplayTasks(){

todayTasks.innerHTML="";
upcomingTasks.innerHTML="";
planner.innerHTML="";

const today = new Date().toISOString().split("T")[0];

let todaysList=[];

tasks.forEach(task=>{

const card=document.createElement("div");
card.className="task-card";

const completedClass = task.completed ? "completed" : "";

card.innerHTML=`
<div class="${completedClass}">
<input type="checkbox" ${task.completed ? "checked":""}>
<strong>${task.title}</strong>
<br>
<small>${task.date} | ${task.time}</small>
</div>
<button onclick="deleteTask(${task.id})"><i class="fa-solid fa-trash-can"></i></button>
`;

card.querySelector("input").addEventListener("change",()=>{
task.completed=!task.completed;
saveTasks();
DisplayTasks();
});

if(task.date === today){

todayTasks.appendChild(card);
todaysList.push(task);

}else if(task.date > today){

upcomingTasks.appendChild(card);

}

});

DisplayPlanner(todaysList);

}

function DisplayPlanner(list){

list.sort((a,b)=>a.time.localeCompare(b.time));

list.forEach(task=>{

const item=document.createElement("div");
item.className="plan-item";

item.innerHTML=`
<span>${task.time}</span>
<p>${task.title}</p>
`;

planner.appendChild(item);

});

}

function deleteTask(id){

tasks = tasks.filter(task=>task.id !== id);

saveTasks();
DisplayTasks();

}

function saveTasks(){

localStorage.setItem("tasks", JSON.stringify(tasks));

}

DisplayTasks();



/* CALENDAR */

const calendar = document.getElementById("calendar");
const monthYear = document.getElementById("monthYear");

let currentDate = new Date();

function DisplayCalendar(){

calendar.innerHTML="";

const year=currentDate.getFullYear();
const month=currentDate.getMonth();

const firstDay=new Date(year,month,1).getDay();
const lastDate=new Date(year,month+1,0).getDate();

monthYear.innerText=currentDate.toLocaleString("default",{month:"long",year:"numeric"});

for(let i=0;i<firstDay;i++){
calendar.innerHTML+="<div></div>";
}

for(let day=1;day<=lastDate;day++){

const div=document.createElement("div");
div.className="day";
div.innerText=day;

calendar.appendChild(div);

}

}

document.getElementById("prevMonth").onclick=()=>{
currentDate.setMonth(currentDate.getMonth()-1);
renderCalendar();
};

document.getElementById("nextMonth").onclick=()=>{
currentDate.setMonth(currentDate.getMonth()+1);
DisplayCalendar();
};

DisplayCalendar();