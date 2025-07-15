import {
  Box,
  Typography,
  useTheme,
  useMediaQuery,
  Fab,
  IconButton,
  Tooltip,
} from "@mui/material";
import TaskItem from "./TaskItem";
import { Add, Delete } from "@mui/icons-material";
import { useEffect, useState } from "react";
import API_SERVICES from "../services/apiServices";

function Tasks({ taskList }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (taskList) API_SERVICES.TASK.ALL_TASK_OF_LIST(taskList._id, setTasks);
  }, [taskList]);

  const handleDeleteTask = (taskId) => {
    API_SERVICES.TASK.DELETE(taskId, setTasks);
  };

  const handleCompleteTask = (task) => {
    const isCompleted = task.complete ? false : true;
    API_SERVICES.TASK.UPDATE(task._id, { complete: isCompleted }, setTasks);
  };

  const handleUpdateDescription = (taskId, newDescription) => {
    API_SERVICES.TASK.UPDATE(taskId, { description: newDescription }, setTasks);
  };

  const handleAddNewTask = () => {
    API_SERVICES.TASK.CREATE(
      {
        description: "untitled",
        taskList: taskList._id,
      },
      setTasks
    );
  };

  const handleDeleteList = async () => {
    API_SERVICES.TASK_LIST.SOFT_DELETE(taskList._id);
  };

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "800px",
        mx: "auto",
        px: isMobile ? 2 : 4,
        py: isMobile ? 2 : 4,
        position: "relative",
      }}
    >
      {/* Header: Title + Delete List Button */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant={isMobile ? "h5" : "h4"} fontWeight="bold">
          {taskList?.name || "Inbox"}
        </Typography>
        <Tooltip title="Delete Task List">
          <IconButton onClick={handleDeleteList}>
            <Delete color="error" />
          </IconButton>
        </Tooltip>
      </Box>

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

      {/* Floating Add Task Button */}
      <Box mt={3}>
        <Fab
          color="primary"
          onClick={handleAddNewTask}
          aria-label="Add Task"
          sx={{
            boxShadow: 2,
            px: 2,
          }}
        >
          <Add />
        </Fab>
      </Box>
    </Box>
  );
}

export default Tasks;
