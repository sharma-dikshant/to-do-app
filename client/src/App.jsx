import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import Home from "./pages/Home";
import { loadAllTaskLists } from "./services/dataLoader";

const router = createBrowserRouter([
  {
    path: "/",
    index: true,
    element: <Home />,
    loader: loadAllTaskLists,
  },
  {
    path: "/auth",
    element: <AuthPage />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
