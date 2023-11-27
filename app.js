document.addEventListener('DOMContentLoaded', function () {
    // Get references to HTML elements
    const taskList = document.getElementById('taskList');
    const addTaskForm = document.getElementById('addTaskForm');
    const startPomodoroButton = document.getElementById('startPomodoro');
    const countdownDisplay = document.getElementById('countdown');

    let pomodoroInterval;
    let remainingTime; // Declare remainingTime outside the function

    // Event listener for the task addition form
    addTaskForm.addEventListener('submit', function (event) {
        event.preventDefault();

        // Get task details from form
        const taskTitle = document.getElementById('taskTitle').value;
        const taskDate = document.getElementById('taskDate').value;
        const taskTime = document.getElementById('taskTime').value;

        // Check if the task title is not empty
        if (taskTitle.trim() !== '') {
            // Create a new task element
            const taskElement = document.createElement('div');
            taskElement.classList.add('task');

            // Parse due date and time
            const dueDateTime = new Date(`${taskDate}T${taskTime}`);

            // Populate task element with details
            taskElement.innerHTML = `
                <span>${taskTitle}</span>
                <span class="due-date">${dueDateTime.toLocaleDateString()}</span>
                <span class="due-time">${dueDateTime.toLocaleTimeString()}</span>
                <button onclick="deleteTask(this)">Delete</button>
            `;

            // Add the task element to the task list
            taskList.appendChild(taskElement);

            // Clear the input fields
            document.getElementById('taskTitle').value = '';
            document.getElementById('taskDate').value = '';
            document.getElementById('taskTime').value = '';
        }
    });

    // Event listener for the Pomodoro button
    startPomodoroButton.addEventListener('click', startPomodoro);

    // Function to delete a task
    window.deleteTask = function (button) {
        const taskElement = button.closest('.task');
        taskElement.remove();
    };

    // Function to start the Pomodoro timer
    function startPomodoro() {
        // Get the Pomodoro duration from the input field
        const pomodoroDuration = document.getElementById('pomodoroDuration').value;

        // Check if the input is a valid number greater than 0
        if (!isNaN(pomodoroDuration) && pomodoroDuration > 0) {
            console.log(`Pomodoro started! Work session duration: ${pomodoroDuration} minutes`);

            remainingTime = pomodoroDuration * 60; // Convert minutes to seconds
            updateCountdownDisplay();

            pomodoroInterval = setInterval(function () {
                if (remainingTime > 0) {
                    remainingTime--;
                    updateCountdownDisplay();
                } else {
                    clearInterval(pomodoroInterval);
                    console.log('Pomodoro session completed!');
                }
            }, 1000); // Update every second
        } else {
            console.log('Please enter a valid Pomodoro duration.');
        }
    }

    // Function to update the countdown display
    function updateCountdownDisplay() {
        if (countdownDisplay) {
            const minutes = Math.floor(remainingTime / 60);
            const seconds = remainingTime % 60;
            countdownDisplay.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        } else {
            console.error('Countdown display element not found.');
        }
    }
});