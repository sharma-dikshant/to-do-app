import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Typography,
} from "@mui/material";
import {
  Add,
  Search,
  Inbox,
  Today,
  CalendarMonth,
  CheckCircle,
  MoreHoriz,
  GroupAdd,
  Help,
  Tag,
} from "@mui/icons-material";

function Sidebar({ setSelectedOption, selectedOption }) {
  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
        Dikshant
      </Typography>

      <List>
        {/* add new task list  */}
        <ListItemButton
          selected={selectedOption === "new-task-list"}
          onClick={() => setSelectedOption("new-task-list")}
        >
          <ListItemIcon>
            <Add />
          </ListItemIcon>
          <ListItemText primary="Add TaskList" />
        </ListItemButton>

        {/* search task list  */}

        {/* <ListItemButton>
          <ListItemIcon>
            <Search />
          </ListItemIcon>
          <ListItemText primary="Search" />
        </ListItemButton> */}

        {/* Task Lists  */}
        <ListItemButton
          selected={selectedOption === "task-list"}
          onClick={() => setSelectedOption("task-list")}
        >
          <ListItemIcon>
            <Inbox />
          </ListItemIcon>
          <ListItemText primary="Task List 1" secondary="2" />
        </ListItemButton>

        {/* today  */}
        <ListItemButton
          selected={selectedOption === "today"}
          onClick={() => setSelectedOption("today")}
        >
          <ListItemIcon>
            <Today />
          </ListItemIcon>
          <ListItemText primary="Today" secondary="2" />
        </ListItemButton>

        {/* upcoming  */}
        <ListItemButton
          selected={selectedOption === "calender"}
          onClick={() => setSelectedOption("calender")}
        >
          <ListItemIcon>
            <CalendarMonth />
          </ListItemIcon>
          <ListItemText primary="Upcoming" />
        </ListItemButton>

        {/* completed  */}
        <ListItemButton>
          <ListItemIcon>
            <CheckCircle />
          </ListItemIcon>
          <ListItemText primary="Completed" />
        </ListItemButton>

        {/* more  */}
        <ListItemButton>
          <ListItemIcon>
            <MoreHoriz />
          </ListItemIcon>
          <ListItemText primary="More" />
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
  );
}

export default Sidebar;
