import { getAllNotes, archiveNote, deleteNote } from "@utils/api";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router";
import NotesList from "@components/notes/NotesList";
import SearchBar from "@components/SearchBar";
import { DocumentTextIcon } from "@heroicons/react/24/outline";
import { useContext } from "react";
import LangContext from "@context/LangContext";
export default function HomePage() {
  const [unarchivedNotes, setUnarchivedNotes] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";
  const handleSearchChange = (query) => {
    if (query) {
      setSearchParams({ search: query });
    } else {
      setSearchParams({});
    }
  };

  useEffect(() => {
    async function fetchNotes() {
      const unArchivedNotes = await getAllNotes();
      setUnarchivedNotes(unArchivedNotes.data);
      console.log(unArchivedNotes);
    }
    fetchNotes();
  }, []);

  const handleArchive = (id) => {
    archiveNote(id);
    setUnarchivedNotes(unarchivedNotes.filter(note => note.id !== id));
  };
  const handleDelete = (id) => {
    deleteNote(id);
    setUnarchivedNotes(unarchivedNotes.filter(note => note.id !== id));
  }


  return (
    <div className="col-span-10 bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors duration-300">
      <div className="sticky top-0 z-10 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm transition-colors duration-300">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 flex items-center gap-2">
                <DocumentTextIcon className="w-7 h-7 text-teal-600" />
                Active Notes
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                {unarchivedNotes.length} {unarchivedNotes.length === 1 ? 'note' : 'notes'} found
              </p>
            </div>
          </div>
          <SearchBar 
            query={searchQuery} 
            onQueryChange={handleSearchChange}
            placeholder="Search active notes..."
          />
        </div>
      </div>
      <NotesList 
        unarchivedNotes={unarchivedNotes} 
        archivedNotesHandler={handleArchive} 
        deleteNoteHandler={handleDelete} 
      />
    </div>
  );
}