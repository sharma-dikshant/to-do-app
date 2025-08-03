import { useEffect, useState } from "react";
import {
  AppBar,
  Box,
  CssBaseline,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
  useTheme,
  useMediaQuery,
  Card,
  CardActionArea,
  CardContent,
  Grid,
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Add, Inbox, PushPin } from "@mui/icons-material";
import Sidebar from "../components/Sidebar";
import Tasks from "../components/Tasks";
import TaskCalendar from "../components/TaskCalendar";
import TaskListRecycleBIn from "../components/TaskListRecycleBIn";
import AssignedToMeTasks from "../components/AssignedToMeTasks";
import TodayDueTaskList from "../components/TodayDueTaskList";
import { useRouteLoaderData } from "react-router-dom";
import API_SERVICES from "../services/apiServices";

const drawerWidth = 280;

function Home() {
  const user = useRouteLoaderData("root");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [mobileOpen, setMobileOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(
    user.defaultView || "home"
  );
  const [defaultView, setDefaultView] = useState(user.defaultView || "home");
  const [selectedList, setSelectedList] = useState(null);
  const [taskLists, setTaskLists] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [newListName, setNewListName] = useState("");

  useEffect(() => {
    if (user.defaultView) {
      setSelectedOption(user.defaultView);
    }
  }, [user.defaultView]);

  useEffect(() => {
    const fetchTaskLists = async () => {
      try {
        await API_SERVICES.TASK_LIST.ALL_LIST_OF_USER(user._id, setTaskLists);
      } catch (error) {
        console.error("Error fetching task lists:", error);
      }
    };
    fetchTaskLists();
  }, [user._id]);

  async function handleCreateNewTaskList() {
    if (!newListName.trim()) return;
    try {
      const data = { name: newListName };
      await API_SERVICES.TASK_LIST.CREATE(setTaskLists, data);
      setNewListName("");
      setOpenDialog(false);
    } catch (err) {
      console.error("Failed to create task list:", err);
    }
  }

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleUpdateDefaultView = (view) => {
    setDefaultView(view);
    API_SERVICES.USER.UPDATE_MY_DETAILS({ defaultView: view });
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      {isMobile && (
        <AppBar position="fixed" sx={{ zIndex: theme.zIndex.drawer + 1 }}>
          <Toolbar>
            <IconButton
              color="inherit"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap>
              {selectedOption}
            </Typography>
          </Toolbar>
        </AppBar>
      )}

      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          variant={isMobile ? "temporary" : "permanent"}
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            "& .MuiDrawer-paper": {
              width: drawerWidth,
            },
          }}
        >
          <Sidebar
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
            setTaskLists={setTaskLists}
            user={user}
            onCloseDrawer={() => setMobileOpen(false)}
            taskLists={taskLists}
            setSelectedList={setSelectedList}
          />
        </Drawer>
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          mt: isMobile ? 8 : 0,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        {selectedOption === "home" && (
          <>
            <Box
              mb={2}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                p: 2,
                border: "1px solid #ccc",
                borderRadius: 2,
                backgroundColor: "#f9f9f9",
                maxWidth: 400,
              }}
            >
              <PushPin color="primary" />
              <FormControl fullWidth size="small">
                <InputLabel id="default-view-label">Default View</InputLabel>
                <Select
                  labelId="default-view-label"
                  id="default-view-select"
                  value={defaultView}
                  label="Default View"
                  onChange={(e) => handleUpdateDefaultView(e.target.value)}
                >
                  <MenuItem value="today">Today</MenuItem>
                  <MenuItem value="assigned">Assigned</MenuItem>
                  <MenuItem value="home">Home</MenuItem>
                  <MenuItem value="calender">Calendar</MenuItem>
                </Select>
              </FormControl>
            </Box>

            <Grid container spacing={2}>
              {taskLists.map((taskList) => (
                <Grid item xs={12} sm={6} md={4} key={taskList._id}>
                  <Card
                    variant={
                      selectedOption === taskList.name
                        ? "outlined"
                        : "elevation"
                    }
                    sx={{
                      border:
                        selectedOption === taskList.name
                          ? "2px solid #1976d2"
                          : "1px solid #e0e0e0",
                      backgroundColor:
                        selectedOption === taskList.name ? "#e3f2fd" : "white",
                    }}
                  >
                    <CardActionArea
                      onClick={() => {
                        setSelectedOption(taskList.name);
                        setSelectedList(taskList);
                      }}
                    >
                      <CardContent
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <Inbox color="action" />
                        <Typography variant="h6">{taskList.name}</Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
              ))}

              <Box sx={{ position: "relative", ml: 2, mt: 1 }}>
                <Fab
                  color="primary"
                  onClick={() => setOpenDialog(true)}
                  aria-label="Add Task"
                  sx={{ boxShadow: 2, px: 2 }}
                >
                  <Add />
                </Fab>
              </Box>
            </Grid>
          </>
        )}

        {selectedOption !== "today" &&
          selectedOption !== "calender" &&
          selectedOption !== "recycle-bin" &&
          selectedOption !== "assigned" &&
          selectedOption !== "home" && (
            <Tasks
              taskList={selectedList}
              taskLists={taskLists}
              setTaskLists={setTaskLists}
            />
          )}

        {selectedOption === "recycle-bin" && (
          <TaskListRecycleBIn
            taskLists={taskLists}
            setTaskLists={setTaskLists}
          />
        )}

        {selectedOption === "assigned" && <AssignedToMeTasks />}
        {selectedOption === "today" && <TodayDueTaskList />}
        {selectedOption === "calender" && <TaskCalendar isMobile={isMobile} />}

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
            <Button
              onClick={handleCreateNewTaskList}
              variant="contained"
              disabled={!newListName.trim()}
            >
              Create
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
}

export default Home;
