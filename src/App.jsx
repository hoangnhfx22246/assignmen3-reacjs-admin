import "./App.css";
import { createBrowserRouter, Router, RouterProvider } from "react-router-dom";
import Root from "./Root";
import ProductsPage from "./Pages/ProductsPage";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./Components/ProtectedRouter";
import LoginPage from "./Pages/LoginPage";
import PublicRouter from "./Components/PublicRouter";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Root />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "products",
        element: <ProductsPage />,
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
]);

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
