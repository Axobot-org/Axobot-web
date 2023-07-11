import { Stack } from "@mui/material";

import Appbar from "./components/common/Appbar";
import { AppTheme } from "./styles/AppTheme";


function App() {
  return (
    <AppTheme>
      <Stack height="100%">
        <Appbar />

      </Stack>
    </AppTheme>
  );
}

export default App;
