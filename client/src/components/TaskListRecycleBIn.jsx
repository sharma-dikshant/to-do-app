import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  IconButton,
} from "@mui/material";
import RestoreIcon from "@mui/icons-material/Restore";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import API_SERVICES from "../services/apiServices";

function TaskListRecycleBin({ taskLists, setTaskLists }) {
  const [r_taskLists, setR_TaskLists] = useState([]);

  useEffect(() => {
    API_SERVICES.TASK_LIST.RECYCLE_BIN_TASKLISTS(setR_TaskLists);
  }, []);

  const handleRestore = (taskList) => {
    API_SERVICES.TASK_LIST.RESTORE(taskList._id, setR_TaskLists);
    setTaskLists((p) => [...p, taskList]);
  };

  const handlePermanentDelete = (id) => {
    console.log("Delete forever", id);
  };

  return (
    <Box sx={{ px: 3, py: 4 }}>
      <Typography variant="h4" fontWeight="bold" mb={3}>
        Recycle Bin
      </Typography>

      {r_taskLists.length === 0 ? (
        <Typography variant="body1" color="text.secondary">
          Nothing in recycle bin.
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {r_taskLists.map((taskList) => (
            <Grid item xs={12} sm={6} md={4} key={taskList.id}>
              <Card
                sx={{
                  borderRadius: 2,
                  boxShadow: 3,
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <CardContent>
                  <Typography variant="h6" fontWeight={600} gutterBottom>
                    {taskList.name || "Untitled"}
                  </Typography>
                  {taskList.deletedAt && (
                    <Typography variant="caption" color="text.secondary">
                      Deleted on:{" "}
                      {new Date(taskList.deletedAt).toLocaleDateString()}
                    </Typography>
                  )}
                </CardContent>

                <CardActions sx={{ justifyContent: "space-between", px: 2 }}>
                  <IconButton
                    color="success"
                    onClick={() => handleRestore(taskList)}
                  >
                    <RestoreIcon />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => handlePermanentDelete(taskList._id)}
                  >
                    <DeleteForeverIcon />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}

export default TaskListRecycleBin;
