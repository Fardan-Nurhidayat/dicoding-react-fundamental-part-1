import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
} from "@material-tailwind/react";
import {
  HomeIcon,
  ArchiveBoxIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/solid";
import { Link, useLocation } from "react-router";

export const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { path: "/", icon: HomeIcon, label: "Active Notes" },
    { path: "/archived", icon: ArchiveBoxIcon, label: "Archived" },
    { path: "/create", icon: PlusCircleIcon, label: "Create Note" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <Card className="h-screen w-full max-w-[20rem] p-4 col-span-2 rounded-none border-r border-gray-200 shadow-none bg-white">
      <div className="mb-8 p-4 border-b border-gray-200">
        <Typography
          variant="h4"
          color="blue-gray"
          className="font-bold bg-clip-text text-transparent bg-linear-to-r from-teal-600 to-blue-600"
        >
          Notes App
        </Typography>
        <p className="text-xs text-gray-500 mt-1">Organize your thoughts</p>
      </div>
      
      <List className="flex flex-col gap-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);
          
          return (
            <Link key={item.path} to={item.path} className="w-full">
              <ListItem
                className={`transition-all duration-200 rounded-lg ${
                  active
                    ? "bg-teal-50 text-teal-700 font-semibold shadow-sm"
                    : "hover:bg-gray-50 text-gray-700"
                }`}
              >
                <ListItemPrefix>
                  <Icon className={`h-5 w-5 ${active ? "text-teal-600" : "text-gray-500"}`} />
                </ListItemPrefix>
                {item.label}
              </ListItem>
            </Link>
          );
        })}
      </List>

      <div className="mt-auto pt-6 border-t border-gray-200">
        <div className="px-4 py-3 bg-gray-50 rounded-lg">
          <p className="text-xs text-gray-600 font-medium mb-1">Quick Tip</p>
          <p className="text-xs text-gray-500">Use Ctrl+N to create a new note quickly</p>
        </div>
      </div>
    </Card>
  );
};

export default Sidebar;
