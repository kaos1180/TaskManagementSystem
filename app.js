document.addEventListener('DOMContentLoaded', function () {
    // Get references to HTML elements
    const taskList = document.getElementById('taskList');
    const addTaskForm = document.getElementById('addTaskForm');
    const startPomodoroButton = document.getElementById('startPomodoro');

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
});

// Function to delete a task
function deleteTask(button) {
    const taskElement = button.closest('.task');
    taskElement.remove();
}

// Function to start the Pomodoro timer
function startPomodoro() {
    // Get the Pomodoro duration from the input field
    const pomodoroDuration = document.getElementById('pomodoroDuration').value;

    // Check if the input is a valid number greater than 0
    if (!isNaN(pomodoroDuration) && pomodoroDuration > 0) {
        // Display an alert (replace with your Pomodoro timer logic)
        alert(`Pomodoro started! Work session duration: ${pomodoroDuration} minutes`);
    } else {
        // Display an alert for invalid input
        alert('Please enter a valid Pomodoro duration.');
    }
}
