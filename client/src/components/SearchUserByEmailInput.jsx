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

function SearchUserByEmailInput({ task, handleAssignTask }) {
  const [email, setEmail] = useState("");
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);

  useEffect(() => {
    if (!email) {
      setUsers([]);
      setOpen(false);
      return;
    }

    const delayDebounce = setTimeout(() => {
      setLoading(true);
      API_SERVICES.USER.SEARCH(email, (res) => {
        setUsers(res || []);
        setLoading(false);
        setOpen(true);
      });
    }, 400);

    return () => clearTimeout(delayDebounce);
  }, [email]);

  const handleSelect = (user) => {
    setEmail(user.email);
    setSelectedUser(user);
    setOpen(false);
  };

  const handleAssign = () => {
    if (!selectedUser) return;
    handleAssignTask?.(task._id, selectedUser._id);
    setEmail("");
    setSelectedUser(null);
  };

  const handleClickAway = () => {
    setEmail("");
    setSelectedUser(null);
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
      <ClickAwayListener onClickAway={handleClickAway}>
        <Box sx={{ position: "relative", width: "200px" }}>
          <TextField
            size="small"
            inputRef={anchorRef}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Assign by email"
            fullWidth
          />

          <Popper
            open={open && users.length > 0}
            anchorEl={anchorRef.current}
            placement="bottom-start"
            style={{ zIndex: 9999 }}
          >
            <Paper
              sx={{ mt: 1, width: 200, maxHeight: 200, overflowY: "auto" }}
            >
              {loading ? (
                <Box sx={{ display: "flex", justifyContent: "center", p: 1 }}>
                  <CircularProgress size={20} />
                </Box>
              ) : (
                <List dense>
                  {users.map((user, idx) => (
                    <ListItemButton
                      key={idx}
                      onClick={() => handleSelect(user)}
                    >
                      <ListItemText
                        primary={user.email}
                        primaryTypographyProps={{ fontSize: "0.75rem" }}
                      />
                    </ListItemButton>
                  ))}
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
            disabled={!selectedUser}
          >
            <PersonAddAlt fontSize="small" />
          </IconButton>
        </span>
      </Tooltip>
    </Box>
  );
}

export default SearchUserByEmailInput;
