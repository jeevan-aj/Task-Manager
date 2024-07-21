import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Button } from '@mui/material';
import { Delete } from '@mui/icons-material';
import { Container, Typography } from '@mui/material';
import TaskForm from '../../components/TaskForm';
import { getTask, updateTask, deleteTask } from '../../utils/api';


const TaskDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [task, setTask] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (id) {
      fetchTask();
    }
  }, [id]);

  const fetchTask = async () => {
    const fetchedTask = await getTask(id);
    setTask(fetchedTask);
  };

  const handleUpdate = async (updatedTask) => {

     // Optimistically update UI
     const previousTask = { ...task };
     setTask(updatedTask);
     setIsLoading(true)
     try {
       await updateTask(id, updatedTask);
       router.push('/');
     } catch (error) {
       // Handle error and rollback optimistic update
       console.error('Error updating task:', error);
       setTask(previousTask);
     }finally{
      setIsLoading(false)
     }
  };

  const handleDelete = async () => {
    setIsLoading(true);
    await deleteTask(id);
    setIsLoading(false)
    router.push('/');
  };

  if (!task) return <div> Loading... </div>;

  return (
    <Container>
      <Typography variant="h2">Task Details</Typography>
      <TaskForm onSubmit={handleUpdate} initialData={task}  isUpdatingDisabled={isLoading} />
      <Button onClick={handleDelete} variant="contained" color="secondary" disabled={isLoading}>
      {isLoading ? 'Deleting...' : 'Delete Task'}
      </Button>
    </Container>
  );
};

export default TaskDetail;