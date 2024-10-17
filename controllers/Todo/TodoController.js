const Todo = require('../../models/Todo');

// Create a new Todo
exports.createTodo = async (req, res) => {
    const { task } = req.body;
    try {
        const newTodo = await Todo.create({ task });

        return res.status(201).json(newTodo);
    } catch (error) {
        return res.status(400).json({ message: consts.messages.common_exception });
    }
};

// Get all Todos
exports.getTodos = async (req, res) => {
    try {
        const todos = await Todo.find();
        console.log(todos);

        return res.status(200).json(todos);
    } catch (error) {
        return res.status(500).json({ message: consts.messages.common_exception });
    }
};

// Update a Todo
exports.updateTodo = async (req, res) => {
    const { id } = req.params;
    try {
        const updatedTodo = await Todo.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedTodo) return res.status(404).json({ message: 'Todo not found' });

        return res.status(200).json(updatedTodo);
    } catch (error) {
        return res.status(400).json({ message: consts.messages.common_exception });
    }
};

// Delete a Todo
exports.deleteTodo = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedTodo = await Todo.findByIdAndDelete(id);
        if (!deletedTodo) return res.status(404).json({ message: 'Todo not found' });

        return res.status(204).send();
    } catch (error) {
        return res.status(500).json({ message: consts.messages.common_exception });
    }
};

exports.findById = async (req, res) => {
    const { id } = req.params;

    try {
        const todo = await Todo.findById(id);
        if (!todo) return res.status(404).json({ message: error.message })

        return res.status(200).json(todo)
    } catch (error) {
        return res.status(500).json({ message: consts.messages.common_exception })
    }
}