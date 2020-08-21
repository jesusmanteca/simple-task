// ********************************************
// *********** MAKING TASK ********************
// ************ BUCKETS ***********************
// ************** Test ************************

// var taskListWrapperEl = document.querySelector(".task-list-wrapper");
// var taskInProgressEl = document.createElement("section");
// taskInProgressEl.className = "task-list-wrapper";
// taskInProgressEl.innerHTML = '<h2 class="list-title">Hello?</h2>';
// // list what you're appending to first, then .appendchild, then (what you're appending)
// var appendTaskList = function (){
//     taskListWrapperEl.appendChild(taskInProgressEl)
// }
// appendTaskList()


// ********************************************
// ********************************************

// you can use the querySelector to look for something in the html and find it. If it's an id, use a .prefix, if it's a class, use the #prefix - then you can use a built-in property of the DOM element, like .textContent to find the content within the element. 

// the form took the place of the inital button we created because we want to control what happens on the form AND the button
var formEl = document.querySelector("#task-form");

// We're eventually adding a task to the list so we may as well grab the task list
var tasksToDoEl = document.querySelector("#tasks-to-do");


// Now we need a way to observe the user's click of the <button>, which we found by using the querySelector in the document and creating a variable so that we can reference it. 
var counter = 0

var taskFormHandler = function(event) {
    
    // this event.preventDefault comes in handy when we need to tell the browser that we're taking over for this event entirely
    event.preventDefault();

    // selecting the actual text box and using it to caputure the data after the click
    var taskNameInput = document.querySelector("input[name='task-name']").value;
    //we'll also need to capture the drop-down menu
    var taskTypeInput = document.querySelector("select[name='task-type']").value;

    // check if input values are empty strings
    if (!taskNameInput || !taskTypeInput) {
        alert("You need to fill out the task form!");
        return false;
    }

    // to erase the previous task's content and start over again
    formEl.reset();

    // package up data as an object
    var taskDataObj = {
        name: taskNameInput,
        type: taskTypeInput
    };

    // send it as an argument to createTaskEl
    createTaskEl(taskDataObj);

}

var createTaskEl = function (taskDataObj) {

    // create list item
    var listItemEl = document.createElement("li");

    // add the class name to the list item
    listItemEl.className = "task-item";

    // create a div to hold task info and add to list item
    var taskInfoEl = document.createElement("div");
    // give it a class name
    taskInfoEl.className = "task-info";

    // add HTML content to div
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";

    listItemEl.appendChild(taskInfoEl);

    // add entire list item to list
    tasksToDoEl.appendChild(listItemEl);

}

formEl.addEventListener("submit", taskFormHandler)





// *********************************** //
// *******PRACTICE******************** //
// ***************ZONE**************** //
// *********************************** //

// var counter = 10
// var countdown = function() {
//     console.log(counter);
//     counter--;
//     if(counter === 0){
//         console.log("Blastoff!!");
//         clearInterval(startCountdown)
//     };
// };
// var startCountdown = setInterval(countdown, 1000)
// countdown()


// var sayHello = function(){
//     console.log("You did this.");
// };

// var timedGreeting = function () { 
//     setTimeout(sayHello, 2000); 
// };

// timedGreeting();
// clearTimeout(timedGreeting);

