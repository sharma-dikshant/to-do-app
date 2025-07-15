import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import Home from "./pages/Home";
import { loadAllTaskLists } from "./services/dataLoader";
import { Toaster } from "react-hot-toast";

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
  return (
    <>
      <RouterProvider router={router} />;
      <Toaster />
    </>
  );
}

export default App;
