import { Box, Typography, useTheme, useMediaQuery, Fab } from "@mui/material";
import TaskItem from "./TaskItem";
import { Add } from "@mui/icons-material";
import { useEffect, useState } from "react";
import API_SERVICES from "../services/apiServices";

function Tasks({ taskList }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (taskList) API_SERVICES.TASK.ALL_TASK_OF_LIST(taskList._id, setTasks);
  }, [taskList]);

  function handleDeleteTask(taskId) {
    API_SERVICES.TASK.DELETE(taskId, setTasks);
  }

  function handleCompleteTask(task) {
    const isCompleted = task.complete ? false : true;
    API_SERVICES.TASK.UPDATE(task._id, { complete: isCompleted }, setTasks);
  }

  function handleUpdateDescription(taskId, newDescription) {
    API_SERVICES.TASK.UPDATE(taskId, { description: newDescription }, setTasks);
  }

  function handleAddNewTask() {
    API_SERVICES.TASK.CREATE(
      {
        description: "untitled",
        taskList: taskList._id,
      },
      setTasks
    );
  }

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "800px",
        mx: "auto",
        px: isMobile ? 2 : 4,
        py: isMobile ? 2 : 4,
      }}
    >
      {/* Title */}
      <Typography
        variant={isMobile ? "h5" : "h4"}
        fontWeight="bold"
        sx={{ mb: 3 }}
      >
        {taskList?.name || "Inbox"}
      </Typography>

      {/* Task List */}
      <Box>
        {tasks?.length ? (
          tasks.map((task, i) => (
            <TaskItem
              key={i}
              task={task}
              handleDeleteTask={handleDeleteTask}
              handleCompleteTask={handleCompleteTask}
              handleUpdateDescription={handleUpdateDescription}
            />
          ))
        ) : (
          <Typography variant="body1" color="text.secondary">
            No tasks yet.
          </Typography>
        )}
      </Box>

      {/* Add Task */}
      <Fab color="primary" onClick={handleAddNewTask}>
        <Add />
      </Fab>
    </Box>
  );
}

export default Tasks;
