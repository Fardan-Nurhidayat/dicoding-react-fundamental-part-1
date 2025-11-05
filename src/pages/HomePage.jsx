import { getAllNotes, archiveNoteById, deleteNoteById } from "@utils/utils";
import { useState , useEffect } from "react";
import NotesList from "@components/notes/NotesList";
export default function HomePage(){
  const [unarchivedNotes, setUnarchivedNotes] = useState([]);
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
  return (
    <div className="col-span-10">
      <NotesList unarchivedNotes={unarchivedNotes} archivedNotesHandler={handleArchive} deleteNoteHandler={deleteNote} />
    </div>
  );
}