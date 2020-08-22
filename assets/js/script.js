<<<<<<< HEAD
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
=======
// Column for Adventure
var tasksInProgressEl = document.querySelector("#tasks-in-progress");

// Column for Tales
var tasksCompletedEl = document.querySelector("#tasks-completed");

// gotta get hold of the main content
var pageContentEl = document.querySelector("#page-content");

// this is going to keep track of our id's for each task
var taskIdCounter = 0;
>>>>>>> feature/updating-tasks

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

    var isEdit = formEl.hasAttribute("data-task-id");

    var completeEditTask = function (taskName, taskType, taskId) {
        
        console.log(taskName, taskType, taskId);
        // find the matching task list item
        var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

        // set new values
        taskSelected.querySelector("h3.task-name").textContent = taskName;
        taskSelected.querySelector("span.task-type").textContent = taskType;

        alert("Task Updated!");

        // reset the form by removing the task ID and changing the button text back to normal
        formEl.removeAttribute("data-task-id");
        document.querySelector("#save-task").textContent = "Add Task";
    };

    // has data attribute, so get task id and call function to complete edit process
    if (isEdit) {
        var taskId = formEl.getAttribute("data-task-id");
        completeEditTask(taskNameInput, taskTypeInput, taskId);
    }
    // no data attribute, so create object as normal and pass to createTaskEl function
    else {
        var taskDataObj = {
            name: taskNameInput,
            type: taskTypeInput
        };

        createTaskEl(taskDataObj);
    }




}

var createTaskEl = function (taskDataObj) {

    // create list item
    var listItemEl = document.createElement("li");

    // add the class name to the list item
    listItemEl.className = "task-item";

    // add task id as a custom attribute
    listItemEl.setAttribute("data-task-id", taskIdCounter);

    // create a div to hold task info and add to list item
    var taskInfoEl = document.createElement("div");
    // give it a class name
    taskInfoEl.className = "task-info";
    // add HTML content to div
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";

    var taskActionsEl = createTaskActions(taskIdCounter);
   


    // append taskInfoEl into listItemEl
    listItemEl.appendChild(taskInfoEl);
    // add entire item to the Tasks To Do list
    tasksToDoEl.appendChild(listItemEl);

    listItemEl.appendChild(taskActionsEl)

    // increase task counter for next unique id
    taskIdCounter++;
    
}

var createTaskActions = function (taskId) {

    var actionContainerEl = document.createElement("div");
    actionContainerEl.className = "task-actions";

    // create edit button
    var editButtonEl = document.createElement("button");
    editButtonEl.textContent = "Edit";
    editButtonEl.className = "btn edit-btn";
    editButtonEl.setAttribute("data-task-id", taskId);

    actionContainerEl.appendChild(editButtonEl);

    // create delete button
    var deleteButtonEl = document.createElement("button");
    deleteButtonEl.textContent = "Delete";
    deleteButtonEl.className = "btn delete-btn";
    deleteButtonEl.setAttribute("data-task-id", taskId);

    actionContainerEl.appendChild(deleteButtonEl);

    var statusSelectEl = document.createElement("select");
    statusSelectEl.className = "select-status";
    statusSelectEl.setAttribute("name", "status-change");
    statusSelectEl.setAttribute("data-task-id", taskId);

    var statusChoices = ["To Do", "Adventures", "Tales"];
    for (var i = 0; i < statusChoices.length; i++) {
        // create option element
        var statusOptionEl = document.createElement("option");
        statusOptionEl.textContent = statusChoices[i];
        statusOptionEl.setAttribute("value", statusChoices[i]);
      
        // append to select
        statusSelectEl.appendChild(statusOptionEl);
      }

    actionContainerEl.appendChild(statusSelectEl);

    return actionContainerEl;
};


formEl.addEventListener("submit", taskFormHandler)

// Gets triggered with Add Task Button click
var taskButtonHandler = function (event) {
    console.log(event.target);
    targetEl = event.target;
    if (targetEl.matches(".edit-btn")) {
        var taskId = targetEl.getAttribute("data-task-id");
        editTask(taskId)
    } else if (targetEl.matches(".delete-btn")) {
        var taskId = targetEl.getAttribute("data-task-id");
        deleteTask(taskId);
    }
};

var deleteTask = function (taskId) {

    // get task list item element
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    console.log(taskSelected);
    taskSelected.remove();
}

var editTask = function(taskId){

    // we're using the Fetcher querySelector to find the content user wrote on the li task
    var taskName = document.querySelector("h3.task-name").textContent

    // we're using the Fetcher querySelector to find the content user wrote on the li task
    var taskType = document.querySelector("span.task-type").textContent

    document.querySelector("input[name='task-name']").value = taskName;
    document.querySelector("select[name='task-type']").value = taskType;

    // get task list item element
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    document.querySelector("#save-task").textContent = "Save Task";
    
    formEl.setAttribute("data-task-id", taskId);
}

// Gets triggered when the task status is changed
var taskStatusChangeHandler = function(event) {

    // get the task item's id
    var taskId = event.target.getAttribute("data-task-id");
  
    // get the currently selected option's value and convert to lowercase
    var statusValue = event.target.value.toLowerCase();
  
    // find the parent task item element based on the id
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    // 
    if (statusValue === "to do") {
        tasksToDoEl.appendChild(taskSelected);
      } 
      else if (statusValue === "adventures") {
        tasksInProgressEl.appendChild(taskSelected);
      } 
      else if (statusValue === "tales") {
        tasksCompletedEl.appendChild(taskSelected);
      }

  };


// to delete tasks, I'll need to bubble the click to the main content
pageContentEl.addEventListener("click", taskButtonHandler)

pageContentEl.addEventListener("change", taskStatusChangeHandler);



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

