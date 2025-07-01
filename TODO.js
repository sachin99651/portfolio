function addTask() {
    const input = document.getElementById('taskInput');
    const text = input.value.trim();
    if (!text) { alert("Please enter a task!"); return; }
    const li = document.createElement('li');
    li.className = 'task-item';
    li.innerHTML = `
        <span class="task-text">${text}</span>
        <div class="task-btns">
        <button onclick="editTask(this)">Edit</button>
        <button onclick="deleteTask(this)">Delete</button>
        </div>`;
    document.getElementById('taskList').appendChild(li);
    input.value = '';
}

function deleteTask(btn) {
    btn.closest('li').remove();
}

function editTask(btn) {
    const li = btn.closest('li');
    const taskSpan = li.querySelector('.task-text');
    if (btn.textContent === 'Edit') {
        const input = document.createElement('input');
        input.type = 'text';
        input.value = taskSpan.textContent;
        input.className = 'form-control';
        li.insertBefore(input, taskSpan);
        li.removeChild(taskSpan);
        btn.textContent = 'Save';
    } else {
        const input = li.querySelector('input');
        const newSpan = document.createElement('span');
        newSpan.className = 'task-text';
        newSpan.textContent = input.value;
        li.insertBefore(newSpan, input);
        li.removeChild(input);
        btn.textContent = 'Edit';
    }
}
