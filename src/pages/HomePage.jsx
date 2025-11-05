import { getAllNotes, archiveNoteById, deleteNoteById } from "@utils/utils";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router";
import NotesList from "@components/notes/NotesList";
import SearchBar from "@components/SearchBar";
import { DocumentTextIcon } from "@heroicons/react/24/outline";

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

  const handleArchive = (id) => {
    archiveNoteById(id);
    const updatedNotes = unarchivedNotes.filter((note) => note.id !== id);
    setUnarchivedNotes(updatedNotes);
  };

  const deleteNote = (id) => {
    deleteNoteById(id);
    const updatedNotes = unarchivedNotes.filter((note) => note.id !== id);
    setUnarchivedNotes(updatedNotes);
  };

  useEffect(() => {
    async function fetchNotes() {
      const allNotes = await getAllNotes();
      const filteredNotes = allNotes.filter((note) => !note.archived);
      setUnarchivedNotes(filteredNotes);
    }
    fetchNotes();
  }, []);

  const filteredNotes = unarchivedNotes.filter((note) =>
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
                <DocumentTextIcon className="w-7 h-7 text-teal-600" />
                Active Notes
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                {filteredNotes.length} {filteredNotes.length === 1 ? 'note' : 'notes'} found
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
        unarchivedNotes={filteredNotes} 
        archivedNotesHandler={handleArchive} 
        deleteNoteHandler={deleteNote} 
      />
    </div>
  );
}