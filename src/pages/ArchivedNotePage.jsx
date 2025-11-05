import { getAllNotes, deleteNoteById, unarchiveNoteById } from "@utils/utils";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router";
import NotesListArchived from "@components/notes/NotesListArchived";
import SearchBar from "@components/SearchBar";
import { ArchiveBoxIcon } from "@heroicons/react/24/outline";

export default function ArchivedNotePage() {
  const [archivedNotes, setArchivedNotes] = useState([]);
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
      const allNotes = await getAllNotes();
      const filteredNotes = allNotes.filter((note) => note.archived);
      setArchivedNotes(filteredNotes);
    }
    fetchNotes();
  }, []);

  const handleUnarchive = (id) => {
    const updatedNotes = unarchiveNoteById(id);
    const filteredNotes = updatedNotes.filter((note) => note.archived);
    setArchivedNotes(filteredNotes);
  };

  const handleDelete = (id) => {
    const updatedNotes = deleteNoteById(id);
    const filteredNotes = updatedNotes.filter((note) => note.archived);
    setArchivedNotes(filteredNotes);
  };

  const filteredNotes = archivedNotes.filter((note) =>
    note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.body.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="col-span-10 bg-gray-50 min-h-screen">
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200 shadow-sm">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                <ArchiveBoxIcon className="w-7 h-7 text-gray-600" />
                Archived Notes
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                {filteredNotes.length} {filteredNotes.length === 1 ? 'note' : 'notes'} found
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
        archivedNotes={filteredNotes} 
        unarchiveNoteHandler={handleUnarchive} 
        deleteNoteHandler={handleDelete} 
      />
    </div>
  );
}