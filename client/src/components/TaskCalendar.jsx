import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay, isSameMonth } from "date-fns";
import enUS from "date-fns/locale/en-US";
import "react-big-calendar/lib/css/react-big-calendar.css";
import {
  Box,
  useTheme,
  useMediaQuery,
  Tooltip,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import API_SERVICES from "../services/apiServices";

const locales = {
  "en-US": enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

function TaskCalendar() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [now, setNow] = useState(new Date());
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    API_SERVICES.TASK.ALL_TASK_OF_MONTH_YEAR(
      now.getMonth(),
      now.getFullYear(),
      setTasks
    );
  }, [now]);

  const events = tasks
    ?.filter((task) => {
      if (task.completed || !task.dueDate) return false;
      return isSameMonth(new Date(task.dueDate), now);
    })
    ?.map((task) => ({
      title: task.description,
      start: new Date(task.dueDate),
      end: new Date(task.dueDate),
      allDay: true,
      originalTask: task,
    }));

  const EventWithTooltip = ({ event }) => {
    const task = event.originalTask;
    return (
      <Tooltip
        title={
          <Box>
            <Typography variant="body2">
              {task.description || "No description"}
            </Typography>
          </Box>
        }
        arrow
        placement="top"
      >
        <span style={{ cursor: "pointer" }}>{event.title}</span>
      </Tooltip>
    );
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: isMobile ? "75vh" : "calc(100vh - 120px)",
        px: isMobile ? 1 : 3,
        py: isMobile ? 1 : 2,
        backgroundColor: "#f5f5f5",
      }}
    >
      <Box
        sx={{
          width: "100%",
          height: "100%",
          backgroundColor: "#ffffff",
          borderRadius: 2,
          boxShadow: 1,
        }}
      >
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          defaultView="month"
          views={["month"]}
          date={now}
          onNavigate={(newDate) => setNow(newDate)}
          components={{
            event: EventWithTooltip,
          }}
          style={{
            height: "100%",
            padding: "0.5rem",
          }}
        />
      </Box>
    </Box>
  );
}

export default TaskCalendar;
