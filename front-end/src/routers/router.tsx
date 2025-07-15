import { createBrowserRouter } from "react-router-dom";
import Home from "../screens/HomePage";
import Music from "../screens/MusicPage";
import NotFound from "../screens/PageNotFound";
import SidebarLayout from "../components/SidebarLayout";
import Podcast from "../screens/Podcast"
export const router = createBrowserRouter([
    {
      path: "/",
      element: <SidebarLayout />, 
      children: [
        { index: true, element: <Home /> },      
        { path: "music", element: <Music /> }, 
        { path: "podcast", element: <Podcast /> }, 
      ],
    },
    {
      path: "*",
      element: <NotFound />, 
    },
  ]);
