document.addEventListener('DOMContentLoaded', function () {
    const taskList = document.getElementById('taskList');
    const addTaskForm = document.getElementById('addTaskForm');

    addTaskForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const taskTitle = document.getElementById('taskTitle').value;
        const taskDate = document.getElementById('taskDate').value;
        const taskTime = document.getElementById('taskTime').value;

        if (taskTitle.trim() !== '') {
            // Create a new task element
            const taskElement = document.createElement('div');
            taskElement.classList.add('task');
            
            // Parse the date and time input values into a Date object
            const dueDateTime = new Date(`${taskDate}T${taskTime}`);
            
            taskElement.innerHTML = `
                <span>${taskTitle}</span>
                <span class="due-date">${dueDateTime.toLocaleDateString()}</span>
                <span class="due-time">${dueDateTime.toLocaleTimeString()}</span>
                <button onclick="deleteTask(this)">Delete</button>
            `;

            // Add the task to the task list
            taskList.appendChild(taskElement);

            // Clear the input fields
            document.getElementById('taskTitle').value = '';
            document.getElementById('taskDate').value = '';
            document.getElementById('taskTime').value = '';
        }
    });
});

function deleteTask(button) {
    // Remove the task when the delete button is clicked
    const taskElement = button.closest('.task');
    taskElement.remove();
}
