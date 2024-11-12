
import React, { useState } from 'react';
import AddTaskForm from './components/AddTaskForm';
import TaskList from './components/TaskList';
import Filter from './components/Filter';
import './index.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');

  const addTask = (task) => {
    if (task) {
      setTasks([...tasks, { id: Date.now(), text: task, completed: false }]);
    }
  };

  const removeTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const toggleTaskCompletion = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const changeFilter = (newFilter) => {
    setFilter(newFilter);
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') return task.completed;
    if (filter === 'active') return !task.completed;
    return true;
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center text-blue-600">To-Do List</h1>
        <AddTaskForm addTask={addTask} />
        <Filter filter={filter} changeFilter={changeFilter} />
        <TaskList 
          tasks={filteredTasks} 
          removeTask={removeTask} 
          toggleTaskCompletion={toggleTaskCompletion} 
        />
      </div>
    </div>
  );
}

export default App;
