import { Box, Typography, useTheme, useMediaQuery, Fab } from "@mui/material";
import TaskItem from "./TaskItem";
import { Add } from "@mui/icons-material";

function Tasks({ tasks, title = "Inbox" }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

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
        {title}
      </Typography>

      {/* Task List */}
      <Box>
        {tasks?.length ? (
          tasks.map((task, i) => <TaskItem key={i} task={task} />)
        ) : (
          <Typography variant="body1" color="text.secondary">
            No tasks yet.
          </Typography>
        )}
      </Box>

      {/* Add Task */}
      <Fab color="primary">
        <Add />
      </Fab>
    </Box>
  );
}

export default Tasks;
