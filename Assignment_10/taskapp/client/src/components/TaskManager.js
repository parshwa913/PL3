import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './TaskManager.css';

const TaskManager = ({ token }) => {
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [status, setStatus] = useState('pending');
    const [priority, setPriority] = useState('medium');
    const [currentTaskId, setCurrentTaskId] = useState(null);

    const fetchTasks = async () => {
        const response = await axios.get('http://localhost:5000/api/tasks', {
            headers: { Authorization: token }
        });
        setTasks(response.data);
    };

    const addTask = async (e) => {
        e.preventDefault();
        await axios.post('http://localhost:5000/api/tasks', { title, description, dueDate, status, priority }, {
            headers: { Authorization: token }
        });
        clearForm();
        fetchTasks();
    };

    const updateTask = async (e) => {
        e.preventDefault();
        await axios.put(`http://localhost:5000/api/tasks/${currentTaskId}`, { title, description, dueDate, status, priority }, {
            headers: { Authorization: token }
        });
        clearForm();
        fetchTasks();
    };

    const deleteTask = async (id) => {
        await axios.delete(`http://localhost:5000/api/tasks/${id}`, {
            headers: { Authorization: token }
        });
        fetchTasks();
    };

    const clearForm = () => {
        setTitle('');
        setDescription('');
        setDueDate('');
        setStatus('pending');
        setPriority('medium');
        setCurrentTaskId(null);
    };

    const handleEdit = (task) => {
        setTitle(task.title);
        setDescription(task.description);
        setDueDate(task.dueDate);
        setStatus(task.status);
        setPriority(task.priority);
        setCurrentTaskId(task.id);
    };

    useEffect(() => {
        fetchTasks();
    }, [token]);

    const categorizedTasks = {
        pending: tasks.filter(task => task.status === 'pending'),
        completed: tasks.filter(task => task.status === 'completed'),
    };

    return (
        <div className="task-manager">
            <div className="form-container">
                <form onSubmit={currentTaskId ? updateTask : addTask}>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" required />
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description"></textarea>
                    <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
                    <select value={status} onChange={(e) => setStatus(e.target.value)}>
                        <option value="pending">Pending</option>
                        <option value="completed">Completed</option>
                    </select>
                    <select value={priority} onChange={(e) => setPriority(e.target.value)}>
                        <option value="high">High</option>
                        <option value="medium">Medium</option>
                        <option value="low">Low</option>
                    </select>
                    <button type="submit">{currentTaskId ? 'Update Task' : 'Add Task'}</button>
                    {currentTaskId && <button type="button" onClick={clearForm}>Cancel</button>}
                </form>
            </div>

            <div className="task-columns">
                <div className="task-column pending">
                    <h2>Incomplete Tasks</h2>
                    <ul>
                        {categorizedTasks.pending.map(task => (
                            <li key={task.id} className="task-card pending-task">
                                <h3>{task.title}</h3>
                                <p>{task.description}</p>
                                <p>Status: {task.status}</p>
                                <p>Due Date: {task.dueDate}</p>
                                <p>Priority: {task.priority}</p>
                                <button onClick={() => handleEdit(task)}>Edit</button>
                                <button onClick={() => deleteTask(task.id)}>Delete</button>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="task-column completed">
                    <h2>Completed Tasks</h2>
                    <ul>
                        {categorizedTasks.completed.map(task => (
                            <li key={task.id} className="task-card completed-task">
                                <h3>{task.title}</h3>
                                <p>{task.description}</p>
                                <p>Status: {task.status}</p>
                                <p>Due Date: {task.dueDate}</p>
                                <p>Priority: {task.priority}</p>
                                <button onClick={() => handleEdit(task)}>Edit</button>
                                <button onClick={() => deleteTask(task.id)}>Delete</button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default TaskManager;
