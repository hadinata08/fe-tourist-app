import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./views/Home";
import LoginOrRegister from "./views/LoginOrRegister";
import TourismList from "./views/TourismList";
import DetailTourisms from "./views/DetailTourisms";
import AddTourisms from "./views/AddTourisms";
import EditTourisms from "./views/EditTourisms";
import Navbar from "./components/molecules/Navbar";
import DetailProfile from "./views/DetailProfile";

const tokenSession: any = localStorage.getItem("token");

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Navbar />
        <Home />
      </>
    ),
  },
  {
    path: "/login",
    element: (
      <>
        <Navbar className="hidden" />
        <LoginOrRegister />,
      </>
    ),
  },
  {
    path: "/tourism-list",
    element: (
      <>
        <Navbar />
        <TourismList />
      </>
    ),
  },
  {
    path: "/tourism-list/:id",
    element: (
      <>
        <Navbar />
        <DetailTourisms />
      </>
    ),
  },
  {
    path: "/add-tourisms",
    element: (
      <>
        <Navbar />
        <AddTourisms />
      </>
    ),
  },
  {
    path: "/edit-tourisms/:id",
    element: (
      <>
        <Navbar />
        <EditTourisms />
      </>
    ),
  },
  {
    path: "/profile",
    element: (
      <>
        <Navbar />
        <DetailProfile />
      </>
    ),
  },
]);

createRoot(document.getElementById("root")!).render(
  <>
    <RouterProvider router={router} />
  </>
);
