import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const TaskCard = ({ task, onClick }) => {
  return (
    <Card onClick={onClick} className='mt-10'>
      <CardContent>
        <Typography variant="h5">{task.title}</Typography>
        <Typography color="textSecondary">{task.status}</Typography>
      </CardContent>
    </Card>
  );
};

export default TaskCard;