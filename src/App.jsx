import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./Root";
import ProductsPage from "./Pages/ProductsPage";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./Components/ProtectedRouter";
import LoginPage from "./Pages/LoginPage";
import PublicRouter from "./Components/PublicRouter";
import ChatPage from "./Pages/ChatPage";
import DashboardPage from "./Pages/DashboardPage";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: (
        <ProtectedRoute allowedRoles={["admin", "advisor"]}>
          <Root />
        </ProtectedRoute>
      ),
      children: [
        {
          index: true,
          element: (
            <ProtectedRoute allowedRoles={["admin"]}>
              <DashboardPage />
            </ProtectedRoute>
          ),
        },
        {
          path: "dashboard",
          element: (
            <ProtectedRoute allowedRoles={["admin"]}>
              <DashboardPage />
            </ProtectedRoute>
          ),
        },
        {
          path: "products",
          element: (
            <ProtectedRoute allowedRoles={["admin"]}>
              <ProductsPage />
            </ProtectedRoute>
          ),
        },
        {
          path: "chat",
          element: (
            <ProtectedRoute allowedRoles={["admin", "advisor"]}>
              <ChatPage />
            </ProtectedRoute>
          ),
        },
      ],
    },
    {
      path: "/login",
      element: (
        <PublicRouter>
          <LoginPage />
        </PublicRouter>
      ),
    },
  ],
  { basename: "/assignmen3-reacjs-admin/" }
);

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
