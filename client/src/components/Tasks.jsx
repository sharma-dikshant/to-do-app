import {
  Box,
  Typography,
  useTheme,
  useMediaQuery,
  Fab,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
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

  // NEW STATE
  const [openDialog, setOpenDialog] = useState(false);
  const [newTaskDescription, setNewTaskDescription] = useState("");

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

  const handleAssignTaskToLocal = (taskId, user) => {
    API_SERVICES.TASK.ASSIGN_TO_LOCAL(taskId, user, setTasks);
  };

  // Triggered by the FAB
  const handleAddNewTask = () => {
    setNewTaskDescription(""); // clear input
    setOpenDialog(true); // open dialog
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleDialogSave = () => {
    if (!newTaskDescription.trim()) return;

    API_SERVICES.TASK.CREATE(
      {
        description: newTaskDescription.trim(),
        taskList: taskList._id,
      },
      setTasks
    );

    setOpenDialog(false);
  };

  const handleDeleteList = async () => {
    try {
      await API_SERVICES.TASK_LIST.SOFT_DELETE(taskList._id, setTaskLists);
      setIsDeleted(true);
    } catch (error) {
      console.error("Failed to delete task list:", error);
    }
  };

  if (isDeleted) return <DeletedTaskListView />;

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 1000,
        mx: "auto",
        px: isMobile ? 0 : 4,
        py: isMobile ? 0 : 4,
        pb: "100px",
        overflowX: "hidden",
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
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
              handleAssignTaskToLocal={handleAssignTaskToLocal}
            />
          ))
        ) : (
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ mt: 2, textAlign: "center" }}
          >
            No tasks yet.
          </Typography>
        )}
      </Box>

      {/* Add Task Button */}
      <Box
        sx={{
          position: "fixed",
          bottom: isMobile ? 24 : 48,
          right: isMobile ? 24 : 64,
          zIndex: 1200,
        }}
      >
        <Fab
          color="primary"
          onClick={handleAddNewTask}
          aria-label="Add Task"
          sx={{ px: 2, boxShadow: 4 }}
        >
          <Add />
        </Fab>
      </Box>

      {/* Dialog for Task Description */}
      <Dialog open={openDialog} onClose={handleDialogClose} fullWidth>
        <DialogTitle>New Task</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            autoFocus
            label="Task Description"
            value={newTaskDescription}
            onChange={(e) => setNewTaskDescription(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleDialogSave();
              }
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button onClick={handleDialogSave} variant="contained">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default Tasks;
