import { Box, Typography, Button } from "@mui/material";

export default function Result() {
  return (
    <Box>
      <Typography variant="h4">Your Stack is Ready!</Typography>
      <Button variant="contained" color="primary">Download Project</Button>
    </Box>
  );
}