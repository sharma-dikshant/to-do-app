import { useState, useEffect } from "react";
import { TextField, Typography } from "@mui/material";

function EditableTaskTextField({ task, handleUpdateDescription, inputRef }) {
  const [value, setValue] = useState(task.description);
  const [editing, setEditing] = useState(false);

  // Autofocus when editing starts
  useEffect(() => {
    if (editing && inputRef?.current) {
      inputRef.current.focus();
    }
  }, [editing, inputRef]);

  const handleBlur = () => {
    if (value.trim() && value !== task.description) {
      handleUpdateDescription(task._id, value.trim());
    }
    setEditing(false);
  };

  return editing ? (
    <TextField
      inputRef={inputRef}
      variant="outlined"
      size="small"
      fullWidth
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onBlur={handleBlur}
      onKeyDown={(e) => {
        if (e.key === "Enter") e.target.blur();
      }}
      sx={{
        input: { fontSize: "1rem", padding: "6px" },
      }}
    />
  ) : (
    <Typography
      variant="body1"
      sx={{ wordBreak: "break-word", fontSize: "1.3rem", cursor: "pointer" }}
      onClick={() => setEditing(true)}
    >
      {task.description}
    </Typography>
  );
}

export default EditableTaskTextField;
