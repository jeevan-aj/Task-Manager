import React, { useState } from "react";
import { TextField, Button, MenuItem } from "@mui/material";

const TaskForm = ({ onSubmit, initialData, isUpdatingDisabled }) => {
  const [task, setTask] = useState(
    initialData || { title: "", description: "", status: "TODO" }
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    await onSubmit(task);
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Title"
        value={task.title}
        onChange={(e) => setTask({ ...task, title: e.target.value })}
        fullWidth
        margin="normal"
        required
      />
      <TextField
        label="Description"
        value={task.description}
        onChange={(e) => setTask({ ...task, description: e.target.value })}
        fullWidth
        margin="normal"
        multiline
        rows={4}
        required
      />

      <TextField
        select
        label="Status"
        value={task.status}
        onChange={(e) => setTask({ ...task, status: e.target.value })}
        fullWidth
        margin="normal"
      >
        <MenuItem value="TODO">To Do</MenuItem>
        <MenuItem value="IN_PROGRESS">In Progress</MenuItem>
        <MenuItem value="DONE">Done</MenuItem>
      </TextField>
      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={isUpdatingDisabled || isSubmitting}
      >
        {isSubmitting
          ? "Loading ..."
          : initialData
          ? "Update Task"
          : "Create Task"}
      </Button>
    </form>
  );
};

export default TaskForm;
