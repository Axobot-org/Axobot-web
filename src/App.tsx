import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";

import store from "./repository/redux/store";
import router from "./router/router";
import { AppTheme } from "./styles/AppTheme";


function App() {
  return (
    <Provider store={store}>
      <AppTheme>
        <RouterProvider router={router} />
      </AppTheme>
    </Provider>
  );
}

export default App;
