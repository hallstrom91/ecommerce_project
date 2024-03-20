import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useAuth } from "../provider/authProvider";
import { Protected } from "./Protected_try1";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Store from "../pages/Store";
import About from "../pages/About";
import UserPage from "../pages/UserPage";

const Routes = () => {
  const { token } = useAuth();

  const publicRoutes = [
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/about",
      element: <About />,
    },
  ];

  const protectedRoutes = [
    {
      path: "/",
      element: <Protected />,
      children: [
        {
          path: "/",
          element: <UserPage />,
        },
      ],
    },
  ];

  const notAuthenticatedRoutes = [
    {
      path: "/",
      element: <Login />,
    },
  ];

  const router = createBrowserRouter([
    ...publicRoutes,
    ...(!token ? notAuthenticatedRoutes : []),
    ...protectedRoutes,
  ]);

  return <RouterProvider router={router} />;
};

export default Routes;

/* import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useAuth } from "../provider/authProvider";
import { Protected } from "./Protected";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Store from "../pages/Store";
import About from "../pages/About";
import UserPage from "../pages/UserPage";

const AppRoutes = () => {
  const { token } = useAuth();

  const publicRoutes = [
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/about",
      element: <About />,
    },
  ];

  const protectedRoutes = [
    {
      path: "/",
      element: <Protected />,
      children: [
        {
          path: "/",
          element: <UserPage />,
        },
      ],
    },
  ];

  const notAuthenticatedRoutes = [
    {
      path: "/",
      element: <Login />,
    },
  ];

  return (
    <Routes>
      {publicRoutes.map((route) => (
        <Route key={route.path} path={route.path} element={route.element} />
      ))}
      {!token &&
        notAuthenticatedRoutes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
      {token &&
        protectedRoutes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
    </Routes>
  );
};

const Switch = () => {
  <Router>
    <AppRoutes />
  </Router>;
};

/*   const router = createBrowserRouter([
    ...publicRoutes,
    ...(!token ? notAuthenticatedRoutes : []),
    ...protectedRoutes,
  ]);

  return <RouterProvider router={router} />; */

/* export default Switch; */
