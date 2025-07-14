import {
  Box,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Divider,
  Tooltip,
  Chip,
} from "@mui/material";
import {
  MoreVert,
  Edit,
  Delete,
  ArrowUpward,
  ArrowDownward,
  Event,
  Weekend,
  AccessAlarm,
  ContentCopy,
  Link,
  Extension,
} from "@mui/icons-material";
import { useState } from "react";
import EditableTaskTextField from "./EditableTaskTextField";

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
}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const isOverdue = task.dueDate && task.dueDate < Date.now();

  const handleMenuOpen = (e) => setAnchorEl(e.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-between",
        py: 1.5,
        px: 1,
        borderBottom: "1px solid #eee",
        opacity: task.complete ? 0.5 : 1,
        "&:hover .hoverMenu": { visibility: "visible" },
      }}
    >
      {/* Left Part: Task Info */}
      <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1.2 }}>
        {/* Optional Check Icon Placeholder */}
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

        <Box>
          <EditableTaskTextField
            task={task}
            handleUpdateDescription={handleUpdateDescription}
          />

          {/* Visual Tags */}
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

      {/* Right: Hover Menu Icon */}
      <Box>
        <IconButton
          className="hoverMenu"
          onClick={handleMenuOpen}
          sx={{
            visibility: "hidden",
            p: 0.5,
            "&:hover": { backgroundColor: "transparent" },
          }}
        >
          <MoreVert fontSize="small" />
        </IconButton>

        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleMenuClose}
          PaperProps={{
            sx: {
              width: 250,
              borderRadius: 2,
              boxShadow: 3,
            },
          }}
        >
          <MenuItem>
            <ArrowUpward fontSize="small" sx={{ mr: 1 }} /> Add task above
          </MenuItem>
          <MenuItem>
            <ArrowDownward fontSize="small" sx={{ mr: 1 }} /> Add task below
          </MenuItem>
          <Divider />
          <MenuItem>
            <Edit fontSize="small" sx={{ mr: 1 }} /> Edit
          </MenuItem>
          <Divider />
          <MenuItem>
            <Event fontSize="small" sx={{ mr: 1 }} /> Date
          </MenuItem>
          <MenuItem>
            <Weekend fontSize="small" sx={{ mr: 1 }} /> Priority
          </MenuItem>
          <Divider />
          <MenuItem>
            <AccessAlarm fontSize="small" sx={{ mr: 1 }} /> Reminders
          </MenuItem>
          <MenuItem>
            <ContentCopy fontSize="small" sx={{ mr: 1 }} /> Duplicate
          </MenuItem>
          <MenuItem>
            <Link fontSize="small" sx={{ mr: 1 }} /> Copy link to task
          </MenuItem>
          <MenuItem>
            <Extension fontSize="small" sx={{ mr: 1 }} /> Add extension...
          </MenuItem>
          <Divider />
          <MenuItem
            onClick={() => handleDeleteTask(task._id)}
            sx={{ color: "error.main" }}
          >
            <Delete fontSize="small" sx={{ mr: 1 }} /> Delete
          </MenuItem>
        </Menu>
      </Box>
    </Box>
  );
}

export default TaskItem;
