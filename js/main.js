const $addTaskInput = document.querySelector('#add-task');
const $addTaskButton = document.querySelector('#add-task-button');
const $taskContainer = document.querySelector('#task-container');
let $tasks = [...document.querySelectorAll('.task')];

function addTask() {
  "use strict";
  const task = $addTaskInput.value;
  // Check if it has valid length
  if (task.length > 50) {
    return;
  }

  // If it comes this far it means task is valid
  $tasks = document.querySelectorAll('.task');
  let numberOfTasks = $tasks.length;
  numberOfTasks++;


  // Create a span to store task
  const newEl = document.createElement('span');
  // Append the increasing number to the task
  newEl.textContent = numberOfTasks + '- ' + task;
  newEl.classList.add('task');

  $taskContainer.appendChild(newEl);

  $addTaskInput.value = "";
}



$taskContainer.addEventListener('click', event => {
  if (event.target.nodeName === 'SPAN') {
    if (!event.target.className.match(/done-task/g)) {
      event.target.classList.add('done-task');
    } else {
      event.target.classList.remove('done-task');
    }
  }
});




$addTaskButton.addEventListener('click', addTask);

document.addEventListener('keydown', event => {
  // If the 'enter' key is pushed while input area is focused
  if (event.keyCode === 13 && document.activeElement === $addTaskInput) {
    addTask();
  }
});

