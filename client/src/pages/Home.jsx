import { useState } from "react";
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
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Sidebar from "../components/Sidebar";
import Tasks from "../components/Tasks";
import TaskCalendar from "../components/TaskCalendar";

const tasks = [
  {
    description: "Submit assignment before midnight",
    dueDate: Date.now() + 86400000, // 1 day from now
    assignedTo: { name: "Test User" },
  },
  {
    description: "Prepare for meeting with client",
    dueDate: Date.now() + 2 * 86400000,
    completed: true,
  },
  {
    description: "Write unit tests for TaskList component",
    completed: false,
    assignedTo: { name: "Developer A" },
  },
  {
    description: "Just a basic task with no extra data",
  },
  {
    description: "Review pull request #42",
    dueDate: Date.now() + 3 * 86400000,
  },
  {
    description: "Team stand-up notes",
    completed: true,
    assignedTo: { name: "Manager X" },
  },
  {
    description: "Design the dashboard UI",
    dueDate: Date.now() + 5 * 86400000,
    completed: false,
  },
  {
    description: "Sync with marketing team",
    assignedTo: { name: "Alice" },
  },
  {
    description: "Follow up with vendor",
    dueDate: Date.now() - 86400000, // overdue
    completed: true,
  },
  {
    description: "Write documentation for API routes",
  },
];

const drawerWidth = 280;

function Home() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("today");
  const [selectedList, setSelectedList] = useState(null);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      {/* Top AppBar for mobile */}
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
              Inbox
            </Typography>
          </Toolbar>
        </AppBar>
      )}

      {/* Sidebar / Drawer */}
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          variant={isMobile ? "temporary" : "permanent"}
          open={isMobile ? mobileOpen : true}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
        >
          <Sidebar
            setSelectedOption={setSelectedOption}
            selectedOption={selectedOption}
            setSelectedList={setSelectedList}
          />
        </Drawer>
      </Box>

      {/* Main Content */}
      {selectedOption !== "today" && selectedOption !== "calender" && (
        <Tasks taskList={selectedList} />
      )}
      {selectedOption === "today" && <div>Yet to implement</div>}
      {selectedOption === "calender" && (
        <TaskCalendar tasks={tasks} isMobile={isMobile} />
      )}
    </Box>
  );
}

export default Home;
