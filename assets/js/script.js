// Column for Adventure
var tasksInProgressEl = document.querySelector("#tasks-in-progress");

// Column for Tales
var tasksCompletedEl = document.querySelector("#tasks-completed");

// gotta get hold of the main content
var pageContentEl = document.querySelector("#page-content");

// this is going to keep track of our id's for each task
var taskIdCounter = 0;

// you can use the querySelector to look for something in the html and find it. If it's an id, use a .prefix, if it's a class, use the #prefix - then you can use a built-in property of the DOM element, like .textContent to find the content within the element. 

// the form took the place of the inital button we created because we want to control what happens on the form AND the button
var formEl = document.querySelector("#task-form");

// We're eventually adding a task to the list so we may as well grab the task list
var tasksToDoEl = document.querySelector("#tasks-to-do");


// Now we need a way to observe the user's click of the <button>, which we found by using the querySelector in the document and creating a variable so that we can reference it. 
var counter = 0

// We're going to keep our tasks in an array so we can store them in local storage
var tasks = [];


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

        // loop through tasks array and task object with new content
        for (var i = 0; i < tasks.length; i++) {
            // we wrap the taskId with a parseInt() function and convert it to a number for the comparison
            if (tasks[i].id === parseInt(taskId)) {
                tasks[i].name = taskName;
                tasks[i].type = taskType;
            }
        };
            
        // save changes into local storage
        saveTasks();

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
            type: taskTypeInput,
            status: "to do"
        };

        createTaskEl(taskDataObj);
    }
}

var createTaskEl = function (taskDataObj) {

    // console.log(taskDataObj);
    // console.log(taskDataObj.status);
    // create list item
    var listItemEl = document.createElement("li");

    // add the class name to the list item
    listItemEl.className = "task-item";

    // add task id as a custom attribute
    listItemEl.setAttribute("data-task-id", taskIdCounter);

    // when we create a task item, we're giving it the attribute to be draggable
    listItemEl.setAttribute("draggable", "true");

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

    taskDataObj.id = taskIdCounter;
    tasks.push(taskDataObj)

    // save changes into local storage
    saveTasks();

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
    // console.log(taskSelected);
    taskSelected.remove();

    // create new array to hold updated list of tasks
    var updatedTaskArr = [];

    // loop through current tasks
    for (var i = 0; i < tasks.length; i++) {
        // if tasks[i].id doesn't match the value of taskId, let's keep that task and push it into the new array
        if (tasks[i].id !== parseInt(taskId)) {
            updatedTaskArr.push(tasks[i]);
        }
    }

    // reassign tasks array to be the same as updatedTaskArr
    tasks = updatedTaskArr;

    // save changes into local storage
    saveTasks();
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

    // update tasks' statuses in tasks array
    for (var i = 0; i < tasks.length; i++) {
        if (tasks[i].id === parseInt(taskId)) {
            tasks[i].status = statusValue;
        }
    }
        // save changes into local storage
        saveTasks();
  };

// this is the handler for dragging
var dragTaskHandler = function(event){
    // console.log("event.target", event.target);
    // console.log("event.type:", event.type);
    // 

    // taskId is the id we're going to need to mess with only one single li 
    var taskId = event.target.getAttribute("data-task-id");


    // In the event, in the data transfer, we're going to set data in plain text: task id (which is the data-task-id)
    event.dataTransfer.setData("text/plain", taskId)

    // we're going to read the task id in the data of the data transfer in the event triggered by the dragging
    var getId = event.dataTransfer.getData("text/plain");
    // console.log("getId:", getId, typeof getId);

}

// this is the handler for the drop zone event
var dropZoneDragHandler = function (event) {
    var taskListEl = event.target.closest(".task-list");
    if (taskListEl) {
        event.preventDefault();
        taskListEl.setAttribute("style", "background: rgba(244, 162, 97, 0.7); ");
    }
};

var dropTaskHandler = function (event) {
    // here we're getting the id that was dragged, that's the hook
    var id = event.dataTransfer.getData("text/plain");

    // we're grabbing hold of the task item that has the task id
    var draggableElement = document.querySelector("[data-task-id='" + id + "']");

    // 
    var dropZoneEl = event.target.closest(".task-list");
    var statusType = dropZoneEl.id;

    // set status of task based on dropZone id
    var statusSelectEl = draggableElement.querySelector("select[name='status-change']");
    
    if (statusType === "tasks-to-do") {
        statusSelectEl.selectedIndex = 0;
      } 
      else if (statusType === "tasks-in-progress") {
        statusSelectEl.selectedIndex = 1;
      } 
      else if (statusType === "tasks-completed") {
        statusSelectEl.selectedIndex = 2;
      }

      //remove attribute to stop the background coloring hovering effect 
    dropZoneEl.removeAttribute("style");
    dropZoneEl.appendChild(draggableElement);

    // loop through tasks array to find and update the updated task's status
    for (var i = 0; i < tasks.length; i++) {
        if (tasks[i].id === parseInt(id)) {
            tasks[i].status = statusSelectEl.value.toLowerCase();
        }
    }

    // save changes into local storage
    saveTasks();;
};

var dragLeaveHandler = function(event){
    var taskListEl = event.target.closest(".task-list");
    if (taskListEl) {
        taskListEl.removeAttribute("style")
    }
}

var loadTasks = function(){
// Get task items from localStorage
tasks = localStorage.getItem("tasks", JSON.stringify(tasks));
console.log(tasks)

if (!tasks) {
    tasks === [];
    return false;
}

// Convert tasks from the stringified format back into an array of objects
tasks = JSON.parse(tasks);


// Iterate through tasks array and creates task elements on the page from it
for (i = 0; i < tasks.length; i++){
    
    tasks.id = taskIdCounter
    console.log(tasks[i])
    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";

    // add task id as a custom attribute
    listItemEl.setAttribute("data-task-id", tasks[i].id);

    // when we create a task item, we're giving it the attribute to be draggable
    listItemEl.setAttribute("draggable", "true");
     console.log(listItemEl)

     var taskInfoEl = document.createElement("div")
     taskInfoEl.className = "task-info"
     taskInfoEl.innerHTML = "<h3 class='task-name'>" + tasks[i].name + "</h3><span class='task-type'>" + tasks[i].type + "</span>";
     listItemEl.appendChild(taskInfoEl);

     //Create the actions for the task
     var taskActionsEl = createTaskActions(tasks[i].id)
     listItemEl.appendChild(taskActionsEl);
     console.log(listItemEl)

     if (tasks[i].status === "to do") {
        listItemEl.querySelector("select[name='status-change']").selectedIndex = 0;
        tasksToDoEl.appendChild(listItemEl)
     } else if (tasks[i].status === "adventures") {
        listItemEl.querySelector("select[name='status-change']").selectedIndex = 1;
        tasksInProgressEl.appendChild(listItemEl)
     } else if (tasks[i].status === "tales") {
        listItemEl.querySelector("select[name='status-change']").selectedIndex = 2;
        tasksCompletedEl.appendChild(listItemEl)
     };

     taskIdCounter++;
     console.log(listItemEl)



}


;}

// saving to the local storage
var saveTasks = function() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

formEl.addEventListener("submit", taskFormHandler)

// to delete tasks, I'll need to bubble the click to the main content
pageContentEl.addEventListener("click", taskButtonHandler)

pageContentEl.addEventListener("change", taskStatusChangeHandler);

// letting the <main> listen for a dragstart that will come from the task item once it's created and dragged
pageContentEl.addEventListener("dragstart", dragTaskHandler);

pageContentEl.addEventListener("dragover", dropZoneDragHandler);

pageContentEl.addEventListener("drop", dropTaskHandler);

pageContentEl.addEventListener("dragleave", dragLeaveHandler);

loadTasks()

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

