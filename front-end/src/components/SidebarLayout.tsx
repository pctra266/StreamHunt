import{ useState} from "react";
import Sidebar from "./Sidebar"; 
import { Menu } from "lucide-react";
import { Outlet } from "react-router-dom";


const SidebarLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="relative h-screen overflow-hidden">
      <button
        className="p-4 text-white bg-black fixed top-4 left-4 z-50 rounded-full hover:bg-neutral-800"
        onClick={() => setSidebarOpen(true)}
      >
        <Menu />
      </button>
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <main className="h-full"><Outlet/></main>
    </div>
  );
};

export default SidebarLayout;
