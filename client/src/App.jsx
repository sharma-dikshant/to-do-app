import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  useLoaderData,
} from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import Home from "./pages/Home";
import { loadUser } from "./services/dataLoader";
import { Toaster } from "react-hot-toast";

// Layout component for authenticated routes
const RootLayout = () => (
  <>
    <Outlet user={useLoaderData()} />
  </>
);

const router = createBrowserRouter([
  {
    id: "root",
    element: <RootLayout />,
    loader: loadUser, // runs on root and applies to children
    children: [
      {
        path: "/",
        element: <Home />,
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthPage />,
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster />
    </>
  );
}

export default App;
