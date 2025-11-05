import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  ArchiveBoxIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/solid";
import { Link } from "react-router";
export const Sidebar = () => {
 return (
   <Card className='h-svh w-full max-w-[20rem] p-4 col-span-2'>
     <div className='mb-2 p-4'>
       <Typography
         variant='h5'
         color='blue-gray'
       >
         Notes App
       </Typography>
     </div>
     <List className="flex flex-col gap-3 items-center justify-center">
      <ListItem>
         <Link to="/" className="flex items-center gap-4 w-full mx-auto">
          <ListItemPrefix>
            <PresentationChartBarIcon className='h-5 w-5' />
          </ListItemPrefix>
          Dashboard
        </Link>
      </ListItem>
      <ListItem>
        <Link to="/archived" className="flex items-center gap-4 w-full mx-auto">
          <ListItemPrefix>
            <ArchiveBoxIcon className='h-5 w-5' />
          </ListItemPrefix>
          Archived Notes
        </Link>
      </ListItem>
      <ListItem>
        <Link to="/create" className="flex items-center gap-4 w-full mx-auto">
          <ListItemPrefix>
            <PlusCircleIcon className='h-5 w-5' />
          </ListItemPrefix>
          Create Note
        </Link>
      </ListItem>
     </List>
   </Card>
 );
};
export default Sidebar;
