import { Box, Typography, IconButton, Tooltip, Chip } from "@mui/material";
import { Delete, PersonAddAlt, Event } from "@mui/icons-material";
import { useState } from "react";
import EditableTaskTextField from "./EditableTaskTextField";
import SearchUserByEmailInput from "./SearchUserByEmailInput";

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
  const isOverdue = task.dueDate && task.dueDate < Date.now();
  const [openDateInput, setOpenDateInput] = useState(false);
  const [dueDate, setDueDate] = useState(
    new Date().toISOString().split("T")[0]
  );
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
      {/* Top: Main Task Row */}
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
        }}
      >
        {/* Left: Check + Text */}
        <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1.2 }}>
          {/* Checkbox-like completion circle */}
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

          {/* Task description and tags */}
          <Box>
            <EditableTaskTextField
              task={task}
              handleUpdateDescription={handleUpdateDescription}
            />

            {/* Tags: due date, assigned, completed */}
            <Box sx={{ display: "flex", gap: 1, mt: 0.5, flexWrap: "wrap" }}>
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
                  sx={{ bgcolor: "#e3f2fd", color: "#1976d2", borderRadius: 1 }}
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

      {/* Bottom: Hover buttons (hidden unless hovered) */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          gap: 1,
          mt: 1,
          minHeight: 36, // Reserve space even when not shown
          visibility: isHovered ? "visible" : "hidden",
        }}
      >
        <SearchUserByEmailInput
          handleAssignTask={handleAssignTask}
          task={task}
        />

        <Tooltip title="Set Due Date">
          <IconButton size="small" onClick={() => setOpenDateInput((p) => !p)}>
            <Event fontSize="small" />
          </IconButton>
        </Tooltip>

        {openDateInput && (
          <div>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
            <button onClick={() => handleAssignDueDate(task._id, dueDate)}>
              set
            </button>
          </div>
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
