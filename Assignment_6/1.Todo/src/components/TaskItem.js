
import React from 'react';

function TaskItem({ task, removeTask, toggleTaskCompletion }) {
  return (
    <li className={`flex items-center justify-between p-2 mb-2 rounded ${task.completed ? 'bg-green-100 line-through text-gray-500' : 'bg-white'} shadow-sm`}>
      <div className="flex items-center">
        <input 
          type="checkbox" 
          checked={task.completed}
          onChange={() => toggleTaskCompletion(task.id)}
          className="mr-2"
        />
        <span>{task.text}</span>
      </div>
      <button onClick={() => removeTask(task.id)} className="text-red-500 hover:text-red-700">Remove</button>
    </li>
  );
}

export default TaskItem;
