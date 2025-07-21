import { Box, Typography, IconButton, Tooltip, Chip } from "@mui/material";
import { Delete, PersonAddAlt, Event } from "@mui/icons-material";
import { useEffect, useRef, useState } from "react";
import EditableTaskTextField from "./EditableTaskTextField";
import SearchUserByEmailInput from "./SearchUserByEmailInput";
import SearchUserByName from "./SearchUserByName";

function formatDueDate(timestamp) {
  const date = new Date(timestamp);
  return date.toLocaleDateString(undefined, {
    day: "numeric",
    month: "short",
  });
}

function TaskItem({
  task,
  handleDeleteTask,
  handleCompleteTask,
  handleUpdateDescription,
  handleAssignTask,
  handleAssignDueDate,
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [openDateInput, setOpenDateInput] = useState(false);
  const [dueDate, setDueDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const inputRef = useRef();

  useEffect(() => {
    // Auto-focus on new task
    if (task.description === "untitled" && inputRef.current) {
      inputRef.current.focus();
    }
  }, [task]);

  const isOverdue = task.dueDate && new Date(task.dueDate) < Date.now();

  return (
    <Box
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      sx={{
        display: "flex",
        flexDirection: "column",
        py: 3,
        px: 1,
        borderBottom: "1px solid #eee",
        opacity: task.complete ? 0.5 : 1,
      }}
    >
      {/* Top Row */}
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
        }}
      >
        {/* Left: Checkbox + Content */}
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
            style={{ border: "none", backgroundColor: "inherit" }}
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

          {/* Description and Tags */}
          <Box sx={{ width: "100%" }}>
            <EditableTaskTextField
              task={task}
              inputRef={inputRef}
              handleUpdateDescription={handleUpdateDescription}
            />

            {/* Chips */}
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

      {/* Bottom Action Row */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          gap: 1,
          mt: 1,
          minHeight: 36,
          visibility: isHovered ? "visible" : "hidden",
        }}
      >
        <SearchUserByName handleAssignTask={handleAssignTask} task={task} />

        {/* Due Date Input */}
        <Tooltip title="Set Due Date">
          <IconButton
            size="small"
            onClick={() => setOpenDateInput((prev) => !prev)}
          >
            <Event fontSize="small" />
          </IconButton>
        </Tooltip>

        {openDateInput && (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              style={{
                fontSize: "1rem",
                padding: "4px 6px",
                borderRadius: "4px",
                border: "1px solid #ccc",
              }}
            />
            <button
              onClick={() => {
                handleAssignDueDate(task._id, dueDate);
                setOpenDateInput(false);
              }}
              style={{
                fontSize: "1rem",
                padding: "4px 10px",
                border: "1px solid #1976d2",
                backgroundColor: "#1976d2",
                color: "#fff",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Set
            </button>
          </Box>
        )}

        <Tooltip title="Delete Task">
          <IconButton size="small" onClick={() => handleDeleteTask(task._id)}>
            <Delete fontSize="small" color="error" />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
}

export default TaskItem;
