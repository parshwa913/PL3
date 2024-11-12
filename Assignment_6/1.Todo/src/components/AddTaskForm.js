
import React, { useState } from 'react';

function AddTaskForm({ addTask }) {
  const [inputValue, setInputValue] = useState('');

  const handleAddTask = () => {
    if (inputValue.trim()) {
      addTask(inputValue);
      setInputValue('');
    } else {
      alert('Task cannot be empty');
    }
  };

  return (
    <div className="mb-4">
      <div className="flex">
        <input 
          type="text" 
          className="border border-gray-300 p-2 w-full rounded-l"
          placeholder="Add a new task"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button 
          type="button" 
          onClick={handleAddTask}
          className="bg-blue-500 text-white px-4 py-2 rounded-r"
        >
          Add
        </button>
      </div>
    </div>
  );
}

export default AddTaskForm;
