import React, { useState, useEffect } from "react";
import { CircularProgress, Container, Typography } from "@mui/material";
import KanbanBoard from "../components/KanbanBoard";
import TaskForm from "../components/TaskForm";
import { getTasks, createTask } from "../utils/api";
import io from "socket.io-client";

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchTasks();
    const socket = io("http://localhost:3001");
    socket.on("taskUpdated", fetchTasks);
    return () => socket.disconnect();
  }, []);

  const fetchTasks = async () => {
    const fetchedTasks = await getTasks();
    setTasks(fetchedTasks);
  };

  const handleCreateTask = async (task) => {
    //optimistic aproach and updateing the ui
    const newTask = { ...task, id: Date.now().toString() };
    setTasks([...tasks, newTask]);
    setLoading(true);
    try {
      await createTask(task);
      fetchTasks();
    } catch (error) {
      // Handle error and rollback optimistic update
      console.error("Error creating task:", error);
      setTasks(tasks.filter((t) => t.id !== newTask.id));
    }finally {
      setLoading(false); // Set loading to false after operation completes
    }
  };

  const handleTaskClick = (task) => {
    // Navigate to task detail page
    window.location.href = `/tasks/${task.id}`;
  };

  return (
    <Container>
      <Typography variant="h2">Task Management</Typography>
      <TaskForm onSubmit={handleCreateTask} />
      {loading && <CircularProgress />}
      <KanbanBoard tasks={tasks} onTaskClick={handleTaskClick} />
    </Container>
  );
};

export default Home;
