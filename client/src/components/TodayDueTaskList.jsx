import { useEffect, useState } from "react";
import API_SERVICES from "../services/apiServices";
import Tasks from "./Tasks";
import {
  Box,
  IconButton,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import TaskItem from "./TaskItem";

function TodayDueTaskList() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    API_SERVICES.TASK.ALL_TASK_DUE_ON_DATE(setTasks);
  }, []);

  const handleDeleteTask = (taskId) => {
    API_SERVICES.TASK.DELETE(taskId, setTasks);
  };

  const handleCompleteTask = (task) => {
    const isCompleted = !task.complete;
    API_SERVICES.TASK.UPDATE(task._id, { complete: isCompleted }, setTasks);
  };

  const handleUpdateDescription = (taskId, newDescription) => {
    API_SERVICES.TASK.UPDATE(taskId, { description: newDescription }, setTasks);
  };

  const handleAssignTask = (taskId, userId) => {
    API_SERVICES.TASK.UPDATE(taskId, { assignedTo: userId }, setTasks);
  };

  return (
    <Box
      sx={{
        width: "80%",
        mx: "auto",
        px: isMobile ? 2 : 4,
        py: isMobile ? 2 : 4,
      }}
    >
      {/* Header: Title and Delete Button */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant={isMobile ? "h5" : "h4"} fontWeight="bold">
          {"Due Today"}
        </Typography>
      </Box>

      {/* Task List */}
      <Box>
        {tasks.length > 0 ? (
          tasks.map((task, i) => (
            <TaskItem
              key={i}
              task={task}
              handleDeleteTask={handleDeleteTask}
              handleCompleteTask={handleCompleteTask}
              handleUpdateDescription={handleUpdateDescription}
              handleAssignTask={handleAssignTask}
            />
          ))
        ) : (
          <Typography variant="body1" color="text.secondary">
            No tasks yet.
          </Typography>
        )}
      </Box>
    </Box>
  );
}

export default TodayDueTaskList;
