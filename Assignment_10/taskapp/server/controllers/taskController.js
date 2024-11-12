const Task = require('../models/Task');

exports.createTask = async (req, res) => {
    try {
        const { title, description, dueDate, status, priority } = req.body;
        const newTask = await Task.create(req.userId, title, description, dueDate, status, priority);
        res.status(201).json(newTask);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getTasks = async (req, res) => {
    try {
        const tasks = await Task.getAll(req.userId);
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateTask = async (taskId) => {
    const updatedData = {
        title,
        description,
        dueDate,
        status,
        priority
    };

    console.log('Updating task:', taskId, updatedData); // Log the task ID and updated data

    try {
        const response = await axios.put(`http://localhost:5000/api/tasks/${taskId}`, updatedData);
        return response.data;
    } catch (error) {
        console.error('Error updating task:', error);
        throw error;
    }
};


exports.deleteTask = async (req, res) => {
    const { id } = req.params;

    try {
        await Task.delete(id, req.userId);
        res.json({ message: 'Task deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
