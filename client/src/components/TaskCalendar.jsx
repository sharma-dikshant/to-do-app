import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay, isSameMonth } from "date-fns";
import enUS from "date-fns/locale/en-US";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Box, useTheme, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import API_SERVICES from "../services/apiServices";

//TODO prev month, next month is not workins still
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
    }));

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: isMobile ? "100%" : "95%",
        height: isMobile ? "85vh" : "92vh",
        px: isMobile ? 1 : 2,
        py: isMobile ? 2 : 3,
        mx: "auto",
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
        style={{
          height: "100%",
          borderRadius: "10px",
          boxShadow: "0 2px 12px rgba(0, 0, 0, 0.08)",
          padding: "0.5rem",
          backgroundColor: "#fff",
        }}
      />
    </Box>
  );
}

export default TaskCalendar;
