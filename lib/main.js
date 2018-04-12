'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var $addTaskInput = document.querySelector('#add-task');
var $addTaskButton = document.querySelector('#add-task-button');
var $taskContainer = document.querySelector('#task-container');

var Task = function Task(taskText) {
  var isCrossed = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  _classCallCheck(this, Task);

  this.taskText = taskText;
  this.isCrossed = isCrossed;
};

function addTask() {
  "use strict";

  var task = new Task($addTaskInput.value);
  // Check if it has valid length
  if (task.taskText.length > 70) {
    return;
  }

  // If it comes this far it means task is valid
  var $tasks = document.querySelectorAll('.task');
  var numberOfTasks = $tasks.length;
  numberOfTasks++;

  // Create a span to store task
  var newEl = document.createElement('span');
  // Append the increasing number to the task
  newEl.textContent = numberOfTasks + '- ' + task.taskText;
  newEl.classList.add('task');

  $taskContainer.appendChild(newEl);

  $addTaskInput.value = "";

  // Call taskAdded function to add task to the localStorage
  taskAdded(task);
}

$taskContainer.addEventListener('click', function (event) {
  // If the to-do item in the container is clicked
  if (event.target.nodeName === 'SPAN') {
    // Retrieve the task array from the localStorage
    var taskArray = JSON.parse(localStorage.getItem('all-tasks'));
    // If the clicked element has not crossed over
    if (!event.target.className.match(/done-task/g)) {
      // Cross over
      event.target.classList.add('done-task');
      // And also mark it as crossed so on page reload it will remain crossed over
      for (var i = 0; i < taskArray.length; i++) {
        if (event.target.textContent.replace(/[0-9]- /g, '') === taskArray[i].taskText) {
          taskArray[i].isCrossed = true;
          break;
        }
      }
      // Store task array back after the updates
      localStorage.setItem('all-tasks', JSON.stringify(taskArray));
    } else {
      // Remove cross over
      event.target.classList.remove('done-task');
      // Also update the object so it won't be crossed over when page reloads
      for (var _i = 0; _i < taskArray.length; _i++) {
        if (event.target.textContent.replace(/[0-9]- /g, '') === taskArray[_i].taskText) {
          taskArray[_i].isCrossed = false;
          break;
        }
      }
      // Store task array back after the updates
      localStorage.setItem('all-tasks', JSON.stringify(taskArray));
    }
  }
});

// Click event for the button
$addTaskButton.addEventListener('click', addTask);

// Enter key will also work to add tasks to the list
document.addEventListener('keydown', function (event) {
  // If the 'enter' key is pushed while input area is focused
  if (event.keyCode === 13 && document.activeElement === $addTaskInput) {
    addTask();
  }
});