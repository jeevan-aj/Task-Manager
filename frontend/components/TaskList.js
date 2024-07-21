import React from 'react';
import TaskCard from './TaskCard';

const TaskList = ({ tasks, onTaskClick }) => {
  return (
    <div>
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} onClick={() => onTaskClick(task)} />
      ))}
    </div>
  );
};

export default TaskList;