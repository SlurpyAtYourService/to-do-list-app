document.addEventListener('DOMContentLoaded', () => {
    const todoForm = document.getElementById('todo-form');
    const newTodoInput = document.getElementById('new-todo');
    const todoList = document.getElementById('todo-list');
    const allBtn = document.getElementById('all-btn');
    const pendingBtn = document.getElementById('pending-btn');
    const completedBtn = document.getElementById('completed-btn');

    const todos = JSON.parse(localStorage.getItem('todos')) || [];

    const saveTodos = () => {
        localStorage.setItem('todos', JSON.stringify(todos));
    };

    const renderTodos = (filter = 'all') => {
        todoList.innerHTML = '';
        todos.forEach((todo, index) => {
            if (filter === 'all' || (filter === 'completed' && todo.completed) || (filter === 'pending' && !todo.completed)) {
                const li = document.createElement('li');
                li.className = todo.completed ? 'completed' : '';
                li.innerHTML = `
                    <span>${todo.title}</span>
                    <div>
                        <button onclick="toggleComplete(${index})">✓</button>
                        <button onclick="removeItem(${index})">✗</button>
                    </div>
                `;
                todoList.appendChild(li);
            }
        });
    };

    const addTodo = (title) => {
        todos.push({ title, completed: false });
        saveTodos();
        renderTodos();
    };

    window.removeItem = (index) => {
        todos.splice(index, 1);
        saveTodos();
        renderTodos();
    };

    window.toggleComplete = (index) => {
        todos[index].completed = !todos[index].completed;
        saveTodos();
        renderTodos();
    };

    todoForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const newTodo = newTodoInput.value.trim();
        if (newTodo) {
            addTodo(newTodo);
            newTodoInput.value = '';
        }
    });

    allBtn.addEventListener('click', () => renderTodos('all'));
    pendingBtn.addEventListener('click', () => renderTodos('pending'));
    completedBtn.addEventListener('click', () => renderTodos('completed'));

    renderTodos();
});
