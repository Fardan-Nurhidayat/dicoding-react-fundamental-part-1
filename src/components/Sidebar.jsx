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
  SunIcon,
  MoonIcon,
} from "@heroicons/react/24/solid";
import { Link, useLocation } from "react-router";
import { useState } from "react";
import { useTheme } from "@hooks/useTheme";
import { useLang } from "@hooks/useLang";
export const Sidebar = () => {
  const { theme, toggleTheme } = useTheme();
  const { lang , toggleLang , t} = useLang();
  const location = useLocation();

  const [username , setUsername] = useState(() => {
    const storedEmail = localStorage.getItem('userEmail');
    return storedEmail ? storedEmail : 'Guest';
  });
    const menuItems = [
      {
        path: "/",
        icon: HomeIcon,
        label: t("sidebar.menu.activeNotes"),
      },
      {
        path: "/archived",
        icon: ArchiveBoxIcon,
        label: t("sidebar.menu.archivedNotes"),
      },
      {
        path: "/create",
        icon: PlusCircleIcon,
        label: t("sidebar.menu.createNote"),
      },
    ];

  const isActive = (path) => location.pathname === path;

  return (
    <Card className='h-screen w-full max-w-[20rem] p-4 col-span-2 rounded-none border-r border-gray-200 dark:border-gray-700 shadow-lg bg-linear-to-br from-white/70 to-sky-50/40 dark:from-gray-800/70 dark:to-gray-900/40 backdrop-blur-sm transition-colors duration-300 flex flex-col'>
      {/* Header */}
      <div className='flex items-center justify-between gap-4 pb-4 border-b border-gray-200/60 dark:border-gray-700/60'>
        <div>
          <Typography
            variant='h5'
            color='blue-gray'
            className='font-bold text-transparent bg-clip-text bg-linear-to-r from-teal-600 to-blue-600'
          >
            {
              t("sidebar.title")
            }
          </Typography>
          <p className='text-xs text-gray-500 dark:text-gray-400 mt-0.5'>
            {
              t("sidebar.subtitle")
            }
          </p>
        </div>

        <button
          type='button'
          role='switch'
          aria-checked={theme === "dark"}
          aria-label='Toggle color theme'
          onClick={toggleTheme}
          className='relative inline-flex items-center w-14 h-8 p-1 rounded-full bg-gray-200/60 dark:bg-gray-700/40 cursor-pointer transition-colors duration-300 ease-in-out'
        >
          <span className='sr-only'>Toggle theme</span>
          <SunIcon className='h-4 w-4 text-yellow-400 z-10' />
          <MoonIcon className='h-4 w-4 text-indigo-600 absolute right-2 z-10' />
          <span
            className={`absolute top-1/2 transform -translate-y-1/2 w-6 h-6 bg-white rounded-full shadow-sm transition-transform duration-300 ease-in-out ${
              theme === "dark" ? "translate-x-6" : "translate-x-0"
            }`}
          />
        </button>
      </div>
      <div className='mt-2 flex items-center justify-center'>
        <div className='relative inline-flex items-center p-1 rounded-full bg-gradient-to-r from-teal-100 to-blue-100 dark:from-teal-900/40 dark:to-blue-900/40 shadow-inner'>
          <button
            onClick={toggleLang}
            className={`relative z-10 px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${
              lang === "en"
                ? "text-white"
                : "text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-300"
            }`}
          >
            EN
          </button>
          <button
            onClick={toggleLang}
            className={`relative z-10 px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${
              lang === "id"
                ? "text-white"
                : "text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-300"
            }`}
          >
            ID
          </button>
          <span
            className={`absolute top-1 bottom-1 w-[calc(50%-0.25rem)] bg-gradient-to-r from-teal-500 to-blue-600 rounded-full shadow-md transition-transform duration-300 ease-in-out ${
              lang === "id"
                ? "translate-x-[calc(100%)]"
                : "translate-x-0"
            }`}
          />
        </div>
      </div>
      <nav className='mt-4'>
        <List className='flex flex-col gap-2'>
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);

            return (
              <Link
                key={item.path}
                to={item.path}
                className='w-full'
                aria-current={active ? "page" : undefined}
              >
                <ListItem
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 ${
                    active
                      ? "bg-linear-to-r from-teal-50 to-white dark:from-teal-900/30 dark:to-teal-800/20 text-teal-700 dark:text-teal-400 font-semibold shadow-sm ring-1 ring-teal-100 dark:ring-teal-800"
                      : "hover:bg-white/60 dark:hover:bg-gray-700/50 hover:translate-x-1 hover:shadow-sm text-gray-700 dark:text-gray-300"
                  }`}
                >
                  <ListItemPrefix className='min-w-8'>
                    <Icon
                      className={`h-5 w-5 transition-transform duration-200 ${
                        active
                          ? "text-teal-600 dark:text-teal-400 scale-105"
                          : "text-gray-400 dark:text-gray-500 group-hover:text-teal-500 dark:group-hover:text-teal-400"
                      }`}
                    />
                  </ListItemPrefix>

                  <span className='flex-1 truncate'>{item.label}</span>

                  <span
                    className={`opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-sm ${
                      active
                        ? "text-teal-500 dark:text-teal-400"
                        : "text-gray-400 dark:text-gray-500"
                    }`}
                  >
                    →
                  </span>
                </ListItem>
              </Link>
            );
          })}
        </List>
      </nav>

      <div className='mt-auto pt-6 border-t border-gray-200/60 dark:border-gray-700/60'>
        <Link
          to='/profile'
          className='w-full flex items-center gap-3 px-2 py-3 bg-white/60 dark:bg-gray-800/30 rounded-lg hover:shadow-sm transition-shadow duration-200'
        >
          <div
            className='flex-none w-10 h-10 rounded-full bg-linear-to-br from-teal-400 to-blue-500 text-white flex items-center justify-center font-semibold shadow-md transform transition-transform duration-200'
            title={username}
          >
            {(() => {
              const parts = String(username || "Guest")
                .trim()
                .split(/\s+/);
              const initials =
                parts.length === 1
                  ? parts[0].slice(0, 2).toUpperCase()
                  : (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
              return initials;
            })()}
          </div>

          <div className='flex flex-col items-start truncate'>
            <span className='text-sm font-medium text-gray-800 dark:text-gray-100 truncate'>
              {username}
            </span>
            <span className='text-xs text-gray-500 dark:text-gray-400'>
              {
                t("sidebar.profile.viewProfile")
              }
            </span>
          </div>
        </Link>
      </div>
    </Card>
  );
};

export default Sidebar;
