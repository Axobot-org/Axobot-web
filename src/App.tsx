import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";

import store from "./repository/redux/store";
import router from "./router/router";
import { AppTheme } from "./styles/AppTheme";

declare global {
  interface Window {
    _mtm?: Record<string, string | number | boolean>[];
  }
}

function App() {
  // useEffect(() => {
  //   const _mtm = window._mtm = window._mtm || [];
  //   _mtm.push({ "mtm.startTime": (new Date().getTime()), "event": "mtm.Start" });
  //   const d = document;
  //   const g = d.createElement("script");
  //   const s = d.getElementsByTagName("script")[0];
  //   g.async = true;
  //   g.src = process.env.REACT_APP_MATOMO_URL;
  //   if (s.parentNode) {
  //     s.parentNode.insertBefore(g, s);
  //   }
  // }, []);

  return (
    <Provider store={store}>
      <AppTheme>
        <RouterProvider router={router} />
      </AppTheme>
    </Provider>
  );
}

export default App;
