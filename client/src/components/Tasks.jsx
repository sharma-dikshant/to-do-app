import {
  Box,
  Typography,
  useTheme,
  useMediaQuery,
  Fab,
  IconButton,
  Tooltip,
} from "@mui/material";
import { Add, Delete } from "@mui/icons-material";
import { useEffect, useState } from "react";
import API_SERVICES from "../services/apiServices";
import TaskItem from "./TaskItem";
import DeletedTaskListView from "./DeletedTaskListView";

function Tasks({ taskList, setTaskLists }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [tasks, setTasks] = useState([]);
  const [isDeleted, setIsDeleted] = useState(false);

  useEffect(() => {
    setIsDeleted(!taskList);
  }, [taskList]);

  useEffect(() => {
    if (taskList?._id) {
      API_SERVICES.TASK.ALL_TASK_OF_LIST(taskList._id, setTasks);
    }
  }, [taskList]);

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

  const handleAssignDueDate = (taskId, dueDate) => {
    API_SERVICES.TASK.UPDATE(taskId, { dueDate }, setTasks);
  };

  const handleAssignTask = (taskId, userId) => {
    API_SERVICES.TASK.UPDATE(taskId, { assignedTo: userId }, setTasks);
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
    try {
      await API_SERVICES.TASK_LIST.SOFT_DELETE(taskList._id, setTaskLists);
      setIsDeleted(true);
    } catch (error) {
      console.error("Failed to delete task list:", error);
    }
  };

  // Show deleted task list UI
  if (isDeleted) return <DeletedTaskListView />;

  return (
    <Box
      sx={{
        width: "80%",
        // maxWidth: "900px",
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
        {tasks.length > 0 ? (
          tasks.map((task, i) => (
            <TaskItem
              key={i}
              task={task}
              handleDeleteTask={handleDeleteTask}
              handleCompleteTask={handleCompleteTask}
              handleUpdateDescription={handleUpdateDescription}
              handleAssignTask={handleAssignTask}
              handleAssignDueDate={handleAssignDueDate}
            />
          ))
        ) : (
          <Typography variant="body1" color="text.secondary">
            No tasks yet.
          </Typography>
        )}
      </Box>

      {/* Add Task Button (FAB) */}
      <Box mt={3}>
        <Fab
          color="primary"
          onClick={handleAddNewTask}
          aria-label="Add Task"
          sx={{ boxShadow: 2, px: 2 }}
        >
          <Add />
        </Fab>
      </Box>
    </Box>
  );
}

export default Tasks;
