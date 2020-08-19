// you can use the querySelector to look for something in the html and find it. If it's an id, use a .prefix, if it's a class, use the #prefix - then you can use a built-in property of the DOM element, like .textContent to find the content within the element. 

// the form took the place of the inital button we created because we want to control what happens on the form AND the button
var formEl = document.querySelector("#task-form");

// We're eventually adding a task to the list so we may as well grab the task list
var tasksToDoEl = document.querySelector("#tasks-to-do");


//we'll also need to capture the drop-down menu




// Now we need a way to observe the user's click of the <button>, which we found by using the querySelector in the document and creating a variable so that we can reference it. 
var counter = 0

var createTaskHandler = function() {


    // this even.preventDefault comes in handy when we need to tell the browser that we're taking over for this event entirely
    event.preventDefault();

    // selecting the actual text box and using it to caputure the data after the click
    var taskNameInput = document.querySelector("input[name='task-name']").value;
    //we'll also need to capture the drop-down menu
    var taskTypeInput = document.querySelector("select[name='task-type']").value;

    // ***********************
    // ***********************
    // create list item
    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";

    // create div to hold task info and add to list item
    var taskInfoEl = document.createElement("div");
    // give it a class name
    taskInfoEl.className = "task-info";
    // add HTML content to div
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskNameInput + "</h3><span class='task-type'>" + taskTypeInput + "</span>";

    listItemEl.appendChild(taskInfoEl);

    // add entire list item to list
    tasksToDoEl.appendChild(listItemEl);
    // ***********************
    // ***********************

  }

formEl.addEventListener("submit", createTaskHandler)




// Then we'll create a response from the button click, which will execute the operation of adding a task item to the task list. We must break down the process step-by-step to solve this problem.





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

