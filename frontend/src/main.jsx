import "bootstrap/dist/css/bootstrap.min.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import AddExpenseScreen from "./screens/AddExpenseScreen.jsx";
import CreateGroup from "./screens/CreateGroup.jsx";
import DashboardScreen from "./screens/DashboardScreen.jsx";
import LoginScreen from "./screens/LoginScreen.jsx";
import GroupDetailsPage from "./screens/GroupDetailsPage.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<LoginScreen />}></Route>
      <Route path="/login" element={<LoginScreen />}></Route>
      <Route path="/CreateGroup" element={<CreateGroup />}></Route>
      <Route path="/dashboard" element={<DashboardScreen />}></Route>
      <Route path="/expense" element={<AddExpenseScreen />}></Route>
      <Route path="/groups" element={<GroupDetailsPage />}></Route>
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
