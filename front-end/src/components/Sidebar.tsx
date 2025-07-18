import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Home, Music, Menu, Podcast, LogIn, List } from "lucide-react";
import {Link} from "react-router-dom"
interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            className="fixed top-0 left-0 w-64 h-full bg-neutral-900 text-white z-50 shadow-lg flex flex-col"
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <div className="p-4 bg-black z-10">
              <button
                onClick={onClose}
                className="text-white rounded-full cursor-pointer p-2"
              >
                <Menu />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 pt-2">
              <nav className="flex flex-col gap-4">
                <Link to="/"><SidebarItem icon={<Home />} label="Home" /></Link>
                <Link to="/music"><SidebarItem icon={<Music />} label="Music" /></Link>
                <Link to="/podcast"><SidebarItem icon={<Podcast />} label="Podcast" /></Link>
                <Link to="/login"><SidebarItem icon={<LogIn />} label="Login" /></Link>
                <Link to="/list"><SidebarItem icon={<List />} label="PlayList" /></Link>
              </nav>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
}

const SidebarItem = ({ icon, label }: SidebarItemProps) => (
  <button className="flex items-center gap-3 p-2 text-left text-white cursor-pointer rounded">
    {icon}
    <span>{label}</span>
  </button>
);

export default Sidebar;
