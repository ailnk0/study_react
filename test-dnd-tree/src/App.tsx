import { Box, Typography } from "@mui/material";
import BeautifulDndTreePage from "./features/dndtree/BeautifulDndTreePage";
import SortableTreePage from "./features/dndtree/SortableTreePage";

function App() {
  return (
    <Box>
      <Box sx={{ p: 5, m: 5, border: 1, borderColor: "lightgrey" }}>
        <Typography variant="h4" gutterBottom>
          BeautifulDndTreePage
        </Typography>
        <BeautifulDndTreePage />
      </Box>
      <Box sx={{ p: 5, m: 5, border: 1, borderColor: "lightgrey" }}>
        <Typography variant="h4" gutterBottom>
          SortableTreePage
        </Typography>
        <SortableTreePage />
      </Box>
    </Box>
  );
}

export default App;
