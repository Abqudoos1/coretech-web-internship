// DOM Core System Nodes
const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');

// Initializing state array from local storage cache
let tasksArray = JSON.parse(localStorage.getItem('tasksDataStore')) || [];

// Initial structural rendering execution
renderTasks();

// Event Listener: Add Task Operations
addBtn.addEventListener('click', createNewTask);
taskInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') createNewTask();
});

// Function: Process and append data object to array
function createNewTask() {
    const taskContent = taskInput.value.trim();
    
    if (taskContent === '') {
        alert('Validation Error: Target field execution cannot be null.');
        return;
    }

    const taskObject = {
        id: Date.now(), // Unique ID base
        text: taskContent,
        completed: false
    };

    tasksArray.push(taskObject);
    updateLocalStorage();
    renderTasks();
    taskInput.value = ''; // Clean buffer input
}

// Function: Render UI state arrays
function renderTasks() {
    taskList.innerHTML = ''; // Flushing older UI nodes

    tasksArray.forEach(task => {
        const li = document.createElement('li');
        li.className = `task-item ${task.completed ? 'completed' : ''}`;
        
        li.innerHTML = `
            <span class="task-text" onclick="toggleTaskStatus(${task.id})">${task.text}</span>
            <button class="delete-btn" onclick="deleteTaskNode(${task.id})">Delete</button>
        `;
        
        taskList.appendChild(li);
    });
}

// Function: Toggle complete state parameters
window.toggleTaskStatus = function(id) {
    tasksArray = tasksArray.map(task => {
        if (task.id === id) {
            return { ...task, completed: !task.completed };
        }
        return task;
    });
    updateLocalStorage();
    renderTasks();
};

// Function: Purge/Delete targeted node parameters
window.deleteTaskNode = function(id) {
    tasksArray = tasksArray.filter(task => task.id !== id);
    updateLocalStorage();
    renderTasks();
};

// Function: Commit data state mutations directly to local storage cache
function updateLocalStorage() {
    localStorage.setItem('tasksDataStore', JSON.stringify(tasksArray));
}