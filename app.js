document.addEventListener('DOMContentLoaded', function () {
    // Get references to HTML elements
    const taskList = document.getElementById('taskList');
    const addTaskForm = document.getElementById('addTaskForm');
    const startPomodoroButton = document.getElementById('startPomodoro');
    const countdownDisplay = document.getElementById('countdown');
    const toggleDarkModeButton = document.getElementById('toggleDarkMode');

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
                <button onclick="editTask(this)">Edit</button>
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

    // Function to edit a task
    window.editTask = function (button) {
        const taskElement = button.closest('.task');
        const taskTitleElement = taskElement.querySelector('span:first-child');
        const taskTitle = taskTitleElement.textContent;
        const taskDate = taskElement.querySelector('.due-date').textContent;
        const taskTime = taskElement.querySelector('.due-time').textContent;

        // Populate the form with the task details for editing
        document.getElementById('taskTitle').value = taskTitle;
        document.getElementById('taskDate').value = taskDate;
        document.getElementById('taskTime').value = taskTime;

        // Replace the "Edit" button with "Save" button for editing
        const editButton = taskElement.querySelector('button[onclick="editTask(this)"]');
        editButton.textContent = 'Save';
        editButton.onclick = function () {
            saveTask(taskElement);
        };

        // Remove the task from the task list temporarily during editing
        taskElement.remove();
    };

    // Function to save an edited task
    function saveTask(taskElement) {
        const taskTitle = document.getElementById('taskTitle').value;
        const taskDate = document.getElementById('taskDate').value;
        const taskTime = document.getElementById('taskTime').value;

        // Check if the task title is not empty
        if (taskTitle.trim() !== '') {
            // Create a new task element
            const newTaskElement = document.createElement('div');
            newTaskElement.classList.add('task');

            // Parse due date and time
            const dueDateTime = new Date(`${taskDate}T${taskTime}`);

            // Populate task element with details
            newTaskElement.innerHTML = `
                <span>${taskTitle}</span>
                <span class="due-date">${dueDateTime.toLocaleDateString()}</span>
                <span class="due-time">${dueDateTime.toLocaleTimeString()}</span>
                <button onclick="editTask(this)">Edit</button>
                <button onclick="deleteTask(this)">Delete</button>
            `;

            // Add the edited task element back to the task list
            taskList.appendChild(newTaskElement);

            // Clear the input fields
            document.getElementById('taskTitle').value = '';
            document.getElementById('taskDate').value = '';
            document.getElementById('taskTime').value = '';
        }
    }

    // Function to start the Pomodoro timer
    function startPomodoro() {
        // Clear existing timer if running
        clearInterval(pomodoroInterval);

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

    // Event listener for the dark mode toggle button
    toggleDarkModeButton.addEventListener('click', function () {
        // Toggle the dark mode class on the body
        document.body.classList.toggle('dark-mode');

        // Save the user's preference in localStorage // good //
        const darkModeEnabled = document.body.classList.contains('dark-mode');
        localStorage.setItem('darkMode', darkModeEnabled ? 'enabled' : 'disabled');
    });
});
