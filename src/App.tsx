import { RouterProvider } from "react-router-dom";

import router from "./router/router";
import { AppTheme } from "./styles/AppTheme";


function App() {
  return (
    <AppTheme>
      <RouterProvider router={router} />
    </AppTheme>
  );
}

export default App;
