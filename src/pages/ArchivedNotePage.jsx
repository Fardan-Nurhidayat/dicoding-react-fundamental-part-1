import { getArchivedNotes, deleteNote, unarchiveNote } from '../utils/api';
import { useState, useEffect } from "react";
import { data, useSearchParams } from "react-router";
import NotesListArchived from "@components/notes/NotesListArchived";
import SearchBar from "@components/SearchBar";
import { ArchiveBoxIcon } from "@heroicons/react/24/outline";

export default function ArchivedNotePage() {
  const [archivedNotes, setArchivedNotes] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";

  // Handle search query change with API
  const handleSearchChange = (query) => {
    if (query) {
      setSearchParams({ search: query });
    } else {
      setSearchParams({});
    }
  };

  useEffect(() => {
    async function fetchNotes() {
      const allArchivedNotes = await getArchivedNotes();
      setArchivedNotes(allArchivedNotes.data);
    }
    fetchNotes();
  }, []);

  const handleUnarchive = (id) => {
    unarchiveNote(id);
    setArchivedNotes(archivedNotes.filter(note => note.id !== id));
  };

  const handleDelete = (id) => {
    deleteNote(id);
    setArchivedNotes(archivedNotes.filter(note => note.id !== id));
  }

  return (
    <div className="col-span-10 bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors duration-300">
      <div className="sticky top-0 z-10 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm transition-colors duration-300">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 flex items-center gap-2">
                <ArchiveBoxIcon className="w-7 h-7 text-gray-600 dark:text-gray-400" />
                Archived Notes
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                {archivedNotes.length} {archivedNotes.length === 1 ? 'note' : 'notes'} found
              </p>
            </div>
          </div>
          <SearchBar 
            query={searchQuery} 
            onQueryChange={handleSearchChange}
            placeholder="Search archived notes..."
          />
        </div>
      </div>
      <NotesListArchived 
        archivedNotes={archivedNotes} 
        unarchiveNoteHandler={handleUnarchive} 
        deleteNoteHandler={handleDelete} 
      />
    </div>
  );
}