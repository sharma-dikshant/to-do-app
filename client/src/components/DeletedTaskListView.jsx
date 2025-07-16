import { Box, Typography, Button } from "@mui/material";
import { DeleteForever } from "@mui/icons-material";

function DeletedTaskListView({ onRestore, onBack }) {
  return (
    <Box
      sx={{
        height: "80vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        px: 3,
      }}
    >
      <DeleteForever sx={{ fontSize: 64, color: "error.main", mb: 2 }} />
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        This Task List was deleted
      </Typography>
      <Typography variant="body1" color="text.secondary" mb={3}>
        You can restore it from the Recycle Bin or go back to your dashboard.
      </Typography>

      <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", justifyContent: "center" }}>
        {onRestore && (
          <Button variant="contained" color="primary" onClick={onRestore}>
            Restore Task List
          </Button>
        )}
        {onBack && (
          <Button variant="outlined" color="secondary" onClick={onBack}>
            Back to Home
          </Button>
        )}
      </Box>
    </Box>
  );
}

export default DeletedTaskListView;
