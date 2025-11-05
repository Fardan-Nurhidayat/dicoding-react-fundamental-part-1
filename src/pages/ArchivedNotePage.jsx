import { getAllNotes } from "@utils/utils"
import { useState , useEffect } from "react"
import NotesListArchived from "@components/notes/NotesListArchived"

export default function ArchivedNotePage(){
  const [archivedNotes, setArchivedNotes] = useState([]);
  useEffect(() => {
    async function fetchNotes() {
      const allNotes = await getAllNotes();
      const filteredNotes = allNotes.filter((note) => note.archived);
      setArchivedNotes(filteredNotes);
    }
    fetchNotes();
  }, []);
  return (
    <div className="col-span-10">
      <NotesListArchived archivedNotes={archivedNotes} />
    </div>
  );
}