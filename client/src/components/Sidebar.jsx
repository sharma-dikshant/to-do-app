import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  Add,
  Today,
  CalendarMonth,
  CheckCircle,
  Delete,
  Logout,
  Home,
  Inbox,
} from "@mui/icons-material";
import { useEffect, useRef, useState } from "react";
import API_SERVICES from "../services/apiServices";

function Sidebar({
  setSelectedOption,
  selectedOption,
  setTaskLists,
  user,
  onCloseDrawer,
  taskLists,
  setSelectedList,
}) {
  const [openDialog, setOpenDialog] = useState(false);
  const [newListName, setNewListName] = useState("");
  const inputRef = useRef();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    if (openDialog && inputRef.current) {
      setTimeout(() => inputRef.current.focus(), 100);
    }
  }, [openDialog]);

  function handleCreateNewTaskList() {
    if (!newListName.trim()) return;
    const data = { name: newListName };
    API_SERVICES.TASK_LIST.CREATE(setTaskLists, data);
    setNewListName("");
  }

  function handleSelect(option) {
    setSelectedOption(option);
    if (onCloseDrawer) onCloseDrawer(); // Automatically close sidebar
  }

  return (
    <Box
      sx={{
        p: 2,
        py: isMobile ? "80px" : "10px",
        backgroundColor: "#f0e9e056",
        height: "100%",
        color: "#752703ff",
        fontWeight: "800",
        width: "100%",
      }}
    >
      <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
        {user?.name?.split(" ")[0] || "Welcome"}
      </Typography>

      <List>
        <ListItemButton
          selected={selectedOption === "home"}
          onClick={() => handleSelect("home")}
        >
          <ListItemIcon>
            <Home />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItemButton>

        <ListItemButton
          selected={selectedOption === "today"}
          onClick={() => handleSelect("today")}
        >
          <ListItemIcon>
            <Today />
          </ListItemIcon>
          <ListItemText primary="Today" />
        </ListItemButton>

        <ListItemButton
          selected={selectedOption === "calender"}
          onClick={() => handleSelect("calender")}
        >
          <ListItemIcon>
            <CalendarMonth />
          </ListItemIcon>
          <ListItemText primary="Calendar" />
        </ListItemButton>

        <ListItemButton
          selected={selectedOption === "assigned"}
          onClick={() => handleSelect("assigned")}
        >
          <ListItemIcon>
            <CheckCircle />
          </ListItemIcon>
          <ListItemText primary="Assigned" />
        </ListItemButton>

        {/* Task Lists */}
        {taskLists.map((taskList, i) => (
          <ListItemButton
            selected={selectedOption === taskList.name}
            onClick={() => {
              handleSelect(taskList.name);
              setSelectedList(taskList);
            }}
            key={i}
          >
            <ListItemIcon>
              <Inbox />
            </ListItemIcon>
            <ListItemText primary={taskList.name} />
          </ListItemButton>
        ))}

        <ListItemButton
          selected={selectedOption === "recycle-bin"}
          onClick={() => handleSelect("recycle-bin")}
        >
          <ListItemIcon>
            <Delete />
          </ListItemIcon>
          <ListItemText primary="Recycle Bin" />
        </ListItemButton>
      </List>

      <Divider sx={{ my: 2 }} />

      <List>
        <ListItemButton onClick={API_SERVICES.AUTH.LOGOUT}>
          <ListItemIcon>
            <Logout />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItemButton>
      </List>
    </Box>
  );
}

export default Sidebar;
