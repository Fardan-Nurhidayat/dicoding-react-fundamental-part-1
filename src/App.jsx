
import "@styles/style.css";
import React, { lazy, Suspense, useEffect, useState } from "react";
import { getAllNotes } from "./utils/utils";
import { Spinner } from "@material-tailwind/react";
const NotesList = lazy(() => import("@components/notes/NotesList"));
const Header = lazy(() => import("@components/Header"));
const Sidebar = lazy(() => import("@components/Sidebar"));
function App() {
  const [notes, setNotes] = useState([]);
  useEffect(() => {
    async function fetchNotes() {
      const allNotes = await getAllNotes();
      setNotes(allNotes);
    }
    fetchNotes();
  }, []);
  return (
    <div className="grid grid-cols-12 h-svh gap-4 bg-gray-100">
      <Sidebar/>
      <Suspense
        fallback={
          <div className='flex justify-center items-center h-64'>
            <Spinner
              className='w-1/4 h-1/4 text-gray-900/50'
              color='blue'
            />
          </div>
        }
      >
        <NotesList notes={notes} />
      </Suspense>
    </div>
  );
}

export default App;
