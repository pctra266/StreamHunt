import { createBrowserRouter } from "react-router-dom";
import Home from "../screens/HomePage";
import Music from "../screens/MusicPage";
import NotFound from "../screens/PageNotFound";
import SidebarLayout from "../components/SidebarLayout";
import Podcast from "../screens/Podcast"
import LoginPage from "../screens/LoginPage";
import PlaylistManager from "../screens/PlaylistManager";
export const router = createBrowserRouter([
    {
      path: "/",
      element: <SidebarLayout />, 
      children: [
        { index: true, element: <Home /> },      
        { path: "music", element: <Music /> }, 
        { path: "podcast", element: <Podcast /> }, 
        {path: "login",element: <LoginPage />,},
        {path: "list",element: <PlaylistManager />,},
      ],
    },
    {
      path: "*",
      element: <NotFound />, 
    },
  ]);
