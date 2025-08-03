import { useEffect, useRef, useState } from "react";
import {
  Box,
  Paper,
  TextField,
  Popper,
  ClickAwayListener,
  List,
  ListItemButton,
  ListItemText,
  CircularProgress,
  Tooltip,
  IconButton,
} from "@mui/material";
import { PersonAddAlt } from "@mui/icons-material";
import API_SERVICES from "../services/apiServices";

function SearchUserByName({ task, handleAssignTaskToLocal }) {
  const [name, setName] = useState("");
  const [users, setUsers] = useState([]);
  const [selectedName, setSelectedName] = useState(null);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);

  useEffect(() => {
    if (!name.trim()) {
      setUsers([]);
      setOpen(false);
      return;
    }

    const delayDebounce = setTimeout(() => {
      setLoading(true);
      API_SERVICES.USER.SEARCH_LOCALS_BY_NAME(name, (res) => {
        setUsers(res || []);
        setLoading(false);
        setOpen(true);
      });
    }, 400);

    return () => clearTimeout(delayDebounce);
  }, [name]);

  const handleSelect = (username) => {
    setName(username);
    setSelectedName(username);
    setOpen(false);
  };

  const handleAssign = () => {
    if (!selectedName) return;
    handleAssignTaskToLocal(task._id, selectedName);
    setName("");
    setSelectedName(null);
    setOpen(false);
  };

  const handleCreateNewUser = async () => {
    if (!name.trim() || users.includes(name)) return;

    try {
      await API_SERVICES.USER.CREATE_LOCAL_USER({ name });
      handleAssignTaskToLocal(task._id, name);
    } catch (error) {
      console.error("Error creating local user:", error);
    }

    setName("");
    setSelectedName(null);
    setOpen(false);
  };

  const handleClickAway = () => {
    setOpen(false);
  };

  const nameExists = users.includes(name);

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
      <ClickAwayListener onClickAway={handleClickAway}>
        <Box sx={{ position: "relative", width: 200 }}>
          <TextField
            size="small"
            inputRef={anchorRef}
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setSelectedName(null);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                if (nameExists) {
                  handleAssign();
                } else {
                  handleCreateNewUser();
                }
              }
            }}
            placeholder="Assign by name"
            fullWidth
          />

          <Popper
            open={open && name.trim().length > 0}
            anchorEl={anchorRef.current}
            placement="bottom-start"
            style={{ zIndex: 9999 }}
          >
            <Paper
              sx={{ mt: 1, width: 200, maxHeight: 250, overflowY: "auto" }}
            >
              {loading ? (
                <Box sx={{ display: "flex", justifyContent: "center", p: 1 }}>
                  <CircularProgress size={20} />
                </Box>
              ) : (
                <List dense>
                  {users.map((username, idx) => (
                    <ListItemButton
                      key={idx}
                      onClick={() => handleSelect(username)}
                    >
                      <ListItemText
                        primary={username}
                        primaryTypographyProps={{ fontSize: "0.75rem" }}
                      />
                    </ListItemButton>
                  ))}

                  {!nameExists && (
                    <ListItemButton onClick={handleCreateNewUser}>
                      <ListItemText
                        primary={`Create "${name}"`}
                        primaryTypographyProps={{
                          fontSize: "0.75rem",
                          fontStyle: "italic",
                        }}
                      />
                    </ListItemButton>
                  )}
                </List>
              )}
            </Paper>
          </Popper>
        </Box>
      </ClickAwayListener>

      <Tooltip title="Assign">
        <span>
          <IconButton
            size="small"
            onClick={handleAssign}
            disabled={!selectedName}
          >
            <PersonAddAlt fontSize="small" />
          </IconButton>
        </span>
      </Tooltip>
    </Box>
  );
}

export default SearchUserByName;
