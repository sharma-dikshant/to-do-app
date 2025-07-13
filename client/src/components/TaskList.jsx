import { useState } from "react";
import {
  Card,
  CardContent,
  TextField,
  Typography,
  IconButton,
  Button,
  Box,
} from "@mui/material";
import { Delete as DeleteIcon } from "@mui/icons-material";

function TaskList({ taskList, onNameChange, onDelete, onOpen }) {
  const [name, setName] = useState(taskList.name || "");

  const handleNameChange = (e) => {
    const newName = e.target.value;
    setName(newName);
    if (onNameChange) {
      onNameChange(newName);
    }
  };

  const createdAt = new Date(taskList.createdAt);

  return (
    <Card
      sx={{
        width: 250,
        height: 150,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        p: 2,
        borderRadius: 3,
        boxShadow: 3,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <TextField
          value={name}
          onChange={handleNameChange}
          placeholder="Untitled"
          variant="standard"
          fullWidth
          InputProps={{
            disableUnderline: true,
            sx: { fontSize: "1.2rem", fontWeight: "bold" },
          }}
        />
        <IconButton onClick={onDelete}>
          <DeleteIcon color="error" />
        </IconButton>
      </Box>

      <Box>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          Created at: {createdAt.toLocaleDateString()}
        </Typography>
        <Button variant="contained" fullWidth onClick={onOpen}>
          Open
        </Button>
      </Box>
    </Card>
  );
}

export default TaskList;
