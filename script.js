document.addEventListener('DOMContentLoaded', () => {
    const todoForm = document.getElementById('todo-form');
    const newTodoInput = document.getElementById('new-todo');
    const todoList = document.getElementById('todo-list');

    // Load existing to-dos from local storage
    const todos = JSON.parse(localStorage.getItem('todos')) || [];

    // Function to save todos to local storage
    const saveTodos = () => {
        localStorage.setItem('todos', JSON.stringify(todos));
    };

    // Function to render the list of todos
    const renderTodos = () => {
        todoList.innerHTML = '';
        todos.forEach((todo, index) => {
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
        });
    };

    // Function to add a new todo
    const addTodo = (title) => {
        todos.push({ title, completed: false });
        saveTodos();
        renderTodos();
    };

    // Function to remove a todo
    window.removeItem = (index) => {
        todos.splice(index, 1);
        saveTodos();
        renderTodos();
    };

    // Function to toggle the completion status of a todo
    window.toggleComplete = (index) => {
        todos[index].completed = !todos[index].completed;
        saveTodos();
        renderTodos();
    };

    // Handle form submission
    todoForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const newTodo = newTodoInput.value.trim();
        if (newTodo) {
            addTodo(newTodo);
            newTodoInput.value = '';
        }
    });

    // Initial render
    renderTodos();
});
