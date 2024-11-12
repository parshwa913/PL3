
import React from 'react';
import TaskItem from './TaskItem';

function TaskList({ tasks, removeTask, toggleTaskCompletion }) {
  return (
    <ul>
      {tasks.map(task => (
        <TaskItem 
          key={task.id} 
          task={task} 
          removeTask={removeTask} 
          toggleTaskCompletion={toggleTaskCompletion} 
        />
      ))}
    </ul>
  );
}

export default TaskList;
