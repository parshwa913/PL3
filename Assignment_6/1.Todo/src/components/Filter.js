
import React from 'react';

function Filter({ filter, changeFilter }) {
  return (
    <div className="mb-4 text-center">
      <button 
        onClick={() => changeFilter('all')} 
        className={`mr-2 px-3 py-1 ${filter === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
      >
        All
      </button>
      <button 
        onClick={() => changeFilter('active')} 
        className={`mr-2 px-3 py-1 ${filter === 'active' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
      >
        Active
      </button>
      <button 
        onClick={() => changeFilter('completed')} 
        className={`px-3 py-1 ${filter === 'completed' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
      >
        Completed
      </button>
    </div>
  );
}

export default Filter;
