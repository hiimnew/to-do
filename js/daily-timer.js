const $modal = document.querySelector('.modal');
const $modalSwitch = document.querySelector('#display-modal');
const $modalHours = $modal.querySelector('#modal-hours');
const $modalMinutes = $modal.querySelector('#modal-minutes');
const $modalCloseButton = $modal.querySelector('#close-button');
const $inputModal = document.querySelector('#input-modal');
const $setTime = document.querySelector('#set-time');
const $hours = $inputModal.querySelector('#hour-input');
const $minutes = $inputModal.querySelector('#minute-input');


$hours.addEventListener('keydown', handlerForModalInput);
$minutes.addEventListener('keydown', handlerForModalInput);


function handlerForModalInput(event) {
  if (
    event.keyCode === 13 &&
    (document.activeElement === $hours ||
      document.activeElement === $minutes)
  ) {
    $inputModal.style.display = 'none';
    receiveInput();
  }
}



function receiveInput() {
  $inputModal.style.display = 'block';
  inputsAreValid($hours.value, $minutes.value);
  $hours.value = "";
  $minutes.value = "";
}

$setTime.addEventListener('click', receiveInput);



function inputsAreValid(hoursValue, minutesValue) {

  if (
    typeof Number(hoursValue) !== 'number' ||
    typeof Number(minutesValue) !== 'number' ||
    !(Number.isInteger(Number(hoursValue)) &&
      Number.isInteger(Number(minutesValue)))
  ) {
    return
  }
  hoursValue = Number(hoursValue);
  minutesValue = Number(minutesValue);

  if (hoursValue < 0) {
    hoursValue = 0;
  }

  if (minutesValue < 0) {
    minutesValue = 1;
  }

  $inputModal.style.display = 'none';


  startTimer(hoursValue, minutesValue);


}





let interval;
function startTimer(hours, minutes) {
  const hourTarget = hours * (60 * 60 * 1000);
  const minuteTarget = minutes * (60 * 1000);
  const targetMiliSeconds = hourTarget + minuteTarget;

  if (!localStorage.getItem('hour-storage') && !localStorage.getItem('minute-storage')) {
    localStorage.setItem('hour-storage', hours);
    localStorage.setItem('minute-storage', minutes);
  }
  let startingTime;


  // If there is any previous timer retrieve it
  if (localStorage.length && localStorage.getItem('starting-time')) {
    startingTime = Number(localStorage.getItem('starting-time'));
  } else {
    // Else assign current moment
    startingTime = new Date().getTime();
    localStorage.setItem('starting-time', startingTime);
  }

  // Calculate ending date
  const endingTime = startingTime + targetMiliSeconds;
  let now = new Date().getTime();
  // Update the timer visually
  updateTimer(endingTime - now);

  interval = setInterval(() => {
    // Get current time
    now = new Date().getTime();

    // Update the timer with new values
    updateTimer(endingTime - now);

    if (endingTime - now <= 0) {
      clearInterval(interval);
      checkState();
      $renewListButton.style.display = 'none';
      localStorage.clear();
      taskCounter = 0;
      while ($taskContainer.firstElementChild) {
        $taskContainer.firstElementChild.remove();
      }
    }
  }, 6000);
}


function updateTimer(totalMiliSeconds) {
  if (totalMiliSeconds < 0 || typeof totalMiliSeconds !== 'number')
    return;
  const seconds = Math.floor(totalMiliSeconds / 1000);
  const hours = Math.floor(seconds / (60 * 60));
  const extractHours = seconds % (60 * 60);
  const minutes = Math.floor(extractHours / 60);


  $modalHours.textContent = String(hours).padStart(2, '0');
  $modalMinutes.textContent = String(minutes).padStart(2, '0');
}


function checkState() {
  if (!localStorage.getItem('all-tasks')) {
    return;
  }
  const taskList = JSON.parse(localStorage.getItem('all-tasks'));

  for (let i = 0; i < taskList.length; i++) {
    if (!taskList[i].isCrossed) {
      alert('Failed to fulfill goal');
      return;
    }
  }
  alert('You\'ve successfully completed your tasks');
}


$modalSwitch.addEventListener('click', () => {
  if (!localStorage.getItem('starting-time')) {
    $inputModal.style.display = 'block';
    return;
  }

  $modal.style.display = 'block';
});


$modalCloseButton.addEventListener('click', event => {
  $modal.style.display = 'none';
});


document.addEventListener('keydown', event => {
  if (event.keyCode === 27) {
    // Close any open modal when escape button is pushed
    if ($modal.style.display === 'block')
      $modal.style.display = 'none';

    if ($inputModal.style.display === 'block')
      $inputModal.style.display = 'none';
  }
});
