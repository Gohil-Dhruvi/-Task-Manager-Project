document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('taskForm');
    const taskList = document.getElementById('taskList');
    const priorityFilter = document.getElementById('priorityFilter');
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    const saveTasks = () => localStorage.setItem('tasks', JSON.stringify(tasks));

    const displayTasks = (filter = 'all') => {
        taskList.innerHTML = '';
        tasks.filter(task => filter === 'all' || task.priority === filter)
            .forEach(task => {
                const li = document.createElement('li');
                li.className = 'task-item';
                li.innerHTML = `
                    <div><strong>Title:</strong> ${task.title}</div>
                    <div><strong>Description:</strong> ${task.description || 'N/A'}</div>
                    <div><strong>Due Date:</strong> ${task.dueDate}</div>
                    <div><strong>Priority:</strong> ${task.priority}</div>
                    <div>
                        <button class="edit">Edit</button>
                        <button class="delete">Delete</button>
                    </div>
                `;
                li.querySelector('.edit').addEventListener('click', () => editTask(task));
                li.querySelector('.delete').addEventListener('click', () => deleteTask(task));
                taskList.appendChild(li);
            });
    };

    const addTask = event => {
        event.preventDefault();
        const title = taskForm.title.value.trim();
        const description = taskForm.description.value.trim();
        const dueDate = taskForm.dueDate.value;
        const priority = taskForm.priority.value;

        if (!title || !dueDate) return alert('Title and Due Date are required!');
        tasks.push({ title, description, dueDate, priority });
        saveTasks();
        displayTasks();
        taskForm.reset();
    };

    const editTask = task => {
        taskForm.title.value = task.title;
        taskForm.description.value = task.description;
        taskForm.dueDate.value = task.dueDate;
        taskForm.priority.value = task.priority;
        deleteTask(task);
    };

    const deleteTask = task => {
        tasks = tasks.filter(t => t !== task);
        saveTasks();
        displayTasks();
    };

    taskForm.addEventListener('submit', addTask);
    priorityFilter.addEventListener('change', () => displayTasks(priorityFilter.value));

    displayTasks();
});
