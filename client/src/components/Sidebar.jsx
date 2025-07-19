import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import {
  Add,
  Inbox,
  Today,
  CalendarMonth,
  CheckCircle,
  GroupAdd,
  Help,
  Tag,
  Delete,
} from "@mui/icons-material";
import { useEffect, useState } from "react";
import API_SERVICES from "../services/apiServices";

function Sidebar({
  setSelectedOption,
  selectedOption,
  setSelectedList,
  taskLists,
  setTaskLists,
}) {
  const [openDialog, setOpenDialog] = useState(false);
  const [newListName, setNewListName] = useState("");

  useEffect(() => {
    //TODO Replace with dynamic user ID if needed
    API_SERVICES.TASK_LIST.ALL_LIST_OF_USER(
      "687211c6b451258d5cc9b045",
      setTaskLists
    );
  }, []);

  function handleCreateNewTaskList() {
    if (!newListName.trim()) return;
    const data = { name: newListName };
    API_SERVICES.TASK_LIST.CREATE(setTaskLists, data);
    newListName("");
  }

  return (
    <>
      <Box sx={{ p: 2 }}>
        <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
          Dikshant
        </Typography>

        <List>
          {/* Add new task list */}
          <ListItemButton
            selected={selectedOption === "new-task-list"}
            onClick={() => {
              setOpenDialog(true);
              setSelectedOption("new-task-list");
            }}
          >
            <ListItemIcon>
              <Add />
            </ListItemIcon>
            <ListItemText primary="Add TaskList" />
          </ListItemButton>

          {/* Task Lists */}
          {taskLists.map((taskList, i) => (
            <ListItemButton
              selected={selectedOption === taskList.name}
              onClick={() => {
                setSelectedOption(taskList.name);
                setSelectedList(taskList);
              }}
              key={i}
            >
              <ListItemIcon>
                <Inbox />
              </ListItemIcon>
              <ListItemText primary={taskList.name} secondary="2" />
            </ListItemButton>
          ))}

          {/* Today */}
          <ListItemButton
            selected={selectedOption === "today"}
            onClick={() => setSelectedOption("today")}
          >
            <ListItemIcon>
              <Today />
            </ListItemIcon>
            <ListItemText primary="Today" secondary="2" />
          </ListItemButton>

          {/* Upcoming */}
          <ListItemButton
            selected={selectedOption === "calender"}
            onClick={() => setSelectedOption("calender")}
          >
            <ListItemIcon>
              <CalendarMonth />
            </ListItemIcon>
            <ListItemText primary="Upcoming" />
          </ListItemButton>

          {/* Assigned */}
          <ListItemButton
            selected={selectedOption === "assigned"}
            onClick={() => setSelectedOption("assigned")}
          >
            <ListItemIcon>
              <CheckCircle />
            </ListItemIcon>
            <ListItemText primary="Assigned" />
          </ListItemButton>

          {/* Recycle Bin */}
          <ListItemButton
            selected={selectedOption === "recyle-bin"}
            onClick={() => setSelectedOption("recycle-bin")}
          >
            <ListItemIcon>
              <Delete />
            </ListItemIcon>
            <ListItemText primary="Recycle Bin" />
          </ListItemButton>
        </List>

        <Divider sx={{ my: 2 }} />
        <Typography variant="subtitle2" sx={{ ml: 2, mb: 1 }}>
          My Projects
        </Typography>
        <List>
          <ListItemButton>
            <ListItemIcon>
              <Tag />
            </ListItemIcon>
            <ListItemText primary="Getting Started 👋" secondary="13" />
          </ListItemButton>
        </List>

        <Divider sx={{ my: 2 }} />
        <List>
          <ListItemButton>
            <ListItemIcon>
              <GroupAdd />
            </ListItemIcon>
            <ListItemText primary="Add a team" />
          </ListItemButton>
          <ListItemButton>
            <ListItemIcon>
              <Help />
            </ListItemIcon>
            <ListItemText primary="Help & resources" />
          </ListItemButton>
        </List>
      </Box>

      {/* Create New Task List Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Create New Task List</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Task List Name"
            type="text"
            fullWidth
            variant="outlined"
            value={newListName}
            onChange={(e) => setNewListName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleCreateNewTaskList} variant="contained">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default Sidebar;
