import { useState, useRef, useEffect } from "react";
import { TextField, Typography } from "@mui/material";

function EditableTaskTextField({ task, handleUpdateDescription }) {
  const [isEditing, setIsEditing] = useState(false);
  const [desc, setDesc] = useState(task.description);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleBlur = () => {
    setIsEditing(false);
    if (desc !== task.description) {
      handleUpdateDescription(task._id, desc); // Call your update function
    }
  };

  return isEditing ? (
    <TextField
      inputRef={inputRef}
      value={desc}
      onChange={(e) => setDesc(e.target.value)}
      onBlur={handleBlur}
      variant="standard"
      fullWidth
    />
  ) : (
    <Typography
      variant="body1"
      sx={{
        textDecoration: task.complete ? "line-through" : "none",
        fontWeight: 500,
        cursor: "pointer",
      }}
      onClick={() => setIsEditing(true)}
    >
      {task.description}
    </Typography>
  );
}

export default EditableTaskTextField;
