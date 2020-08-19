// you can use the querySelector to look for something in the html and find it. If it's an id, use a .prefix, if it's a class, use the #prefix - then you can use a built-in property of the DOM element, like .textContent to find the content within the element. 

// here we have button element, buttonEl that we found by going into the document with a querySelector that is looking for #save-task
var buttonEl = document.querySelector("#save-task");
console.log(buttonEl);
console.dir(buttonEl);

// We're eventually adding a task to the list so we may as well grab the task list
var tasksToDoEl = document.querySelector("#tasks-to-do");


// This is a way to get the same object element
// var tellMeMore = document.querySelector("#save-task").textContent
// console.log("This says", tellMeMore)

// Now we need a way to observe the user's click of the <button>, which we found by using the querySelector in the document and creating a variable so that we can reference it. 
var counter = 0

var createTaskHandler = function() {
    // create an element li
    var taskItemEl = document.createElement("li");
    // have the newly created element li say "Hello"
    taskItemEl.textContent = "Hello";
    // add the css to this by adding the class name too
    taskItemEl.className = "task-item";
    // to the taskToDoEl, we'll append the taskItem we just created
    tasksToDoEl.appendChild(taskItemEl)
  }

buttonEl.addEventListener("click", createTaskHandler)




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

