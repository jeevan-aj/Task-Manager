import React from 'react';
import { Grid } from '@mui/material';
import TaskList from './TaskList';

const KanbanBoard = ({ tasks, onTaskClick }) => {
  const filterTasks = (status) => tasks.filter((task) => task.status === status);

  return (
    <Grid container spacing={3} className='mt-10'>
      <Grid item xs={4}>
        <h2>To Do</h2>
        <TaskList tasks={filterTasks('TODO')} onTaskClick={onTaskClick} />
      </Grid>
      <Grid item xs={4}>
        <h2>In Progress</h2>
        <TaskList tasks={filterTasks('IN_PROGRESS')} onTaskClick={onTaskClick} />
      </Grid>
      <Grid item xs={4}>
        <h2>Done</h2>
        <TaskList tasks={filterTasks('DONE')} onTaskClick={onTaskClick} />
      </Grid>
    </Grid>
  );
};

export default KanbanBoard;