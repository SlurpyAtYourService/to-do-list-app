describe("Todo List Functions", function() {
    beforeEach(function() {
        // Initialize a fresh state before each test
        localStorage.clear();
        document.body.innerHTML = `
            <form id="todo-form">
                <input type="text" id="new-todo" placeholder="Add a new task" required>
                <button type="submit">Add</button>
            </form>
            <ul id="todo-list"></ul>
        `;
        todoForm = document.getElementById('todo-form');
        newTodoInput = document.getElementById('new-todo');
        todoList = document.getElementById('todo-list');
    });

    it("should add a new todo item", function() {
        newTodoInput.value = 'Test Task';
        todoForm.dispatchEvent(new Event('submit'));

        expect(todoList.children.length).toBe(1);
        expect(todoList.children[0].querySelector('span').textContent).toBe('Test Task');
    });

    it("should remove a todo item", function() {
        addTodo('Test Task');
        removeItem(0);

        expect(todoList.children.length).toBe(0);
    });

    it("should toggle the completion status of a todo item", function() {
        addTodo('Test Task');
        toggleComplete(0);

        expect(todoList.children[0].classList.contains('completed')).toBe(true);
    });
});
