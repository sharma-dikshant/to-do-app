import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Chip,
  CircularProgress,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Event } from "@mui/icons-material";
import API_SERVICES from "../services/apiServices";

function formatDueDate(timestamp) {
  const date = new Date(timestamp);
  return date.toLocaleDateString(undefined, {
    day: "numeric",
    month: "short",
  });
}

function AssignedToMeTasks({ currentUserName }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleCompleteTask = (task) => {
    const isCompleted = !task.complete;
    API_SERVICES.TASK.UPDATE(task._id, { complete: isCompleted }, setTasks);
  };

  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      try {
        await API_SERVICES.TASK.ALL_TASK_ASSIGNED_TO_ME(setTasks);
      } catch (error) {
        console.error("Failed to fetch tasks assigned to me:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [currentUserName]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" py={5}>
        <CircularProgress />
      </Box>
    );
  }

  if (tasks.length === 0) {
    return (
      <Box p={3}>
        <Typography variant="h6" color="text.secondary">
          No tasks assigned to you.
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        width: "80%",
        mx: "auto",
        px: isMobile ? 2 : 4,
        py: isMobile ? 2 : 4,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant={isMobile ? "h5" : "h4"} fontWeight="bold">
          Assigned
        </Typography>
      </Box>

      {/* Task List */}
      {tasks.map((task, i) => {
        const isOverdue = task.dueDate && new Date(task.dueDate) < Date.now();

        return (
          <Box
            key={i}
            onMouseEnter={(e) =>
              (e.currentTarget.style.opacity = task.complete ? 0.5 : 1)
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.opacity = task.complete ? 0.5 : 1)
            }
            sx={{
              display: "flex",
              flexDirection: "column",
              py: 3,
              px: 1,
              borderBottom: "1px solid #eee",
              opacity: task.complete ? 0.5 : 1,
            }}
          >
            {/* Task Row */}
            <Box
              sx={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "space-between",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 1.2,
                  width: "100%",
                }}
              >
                {/* Completion circle */}
                <button
                  style={{
                    border: "none",
                    backgroundColor: "inherit",
                    cursor: "pointer",
                  }}
                  onClick={() => handleCompleteTask(task)}
                >
                  <Box
                    sx={{
                      width: 24,
                      height: 24,
                      border: "1px solid #ccc",
                      borderRadius: "50%",
                      backgroundColor: task.complete ? "#ccc" : "transparent",
                    }}
                  />
                </button>

                {/* Description & Tags */}
                <Box sx={{ width: "100%" }}>
                  <Typography
                    variant="body1"
                    sx={{
                      fontSize: "1.1rem",
                      wordBreak: "break-word",
                      fontWeight: 500,
                    }}
                  >
                    {task.description}
                  </Typography>

                  {/* Tags */}
                  <Box
                    sx={{
                      display: "flex",
                      gap: 1,
                      mt: 0.5,
                      flexWrap: "wrap",
                      width: "100%",
                    }}
                  >
                    {task.dueDate && (
                      <Chip
                        size="small"
                        icon={<Event fontSize="small" />}
                        label={formatDueDate(task.dueDate)}
                        sx={{
                          bgcolor: isOverdue ? "#ffe5e5" : "#f0f0f0",
                          color: isOverdue ? "error.main" : "text.primary",
                          borderRadius: 1,
                        }}
                      />
                    )}
                    {task.assignedTo && (
                      <Chip
                        size="small"
                        label={task.assignedTo.name}
                        sx={{
                          bgcolor: "#e3f2fd",
                          color: "#1976d2",
                          borderRadius: 1,
                        }}
                      />
                    )}
                    {task.complete && (
                      <Chip
                        size="small"
                        label="Completed"
                        color="success"
                        sx={{ borderRadius: 1 }}
                      />
                    )}
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        );
      })}
    </Box>
  );
}

export default AssignedToMeTasks;
