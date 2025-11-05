import { lazy, Suspense } from "react";
import SkeletonLoader from "@components/ui/SkeletonLoader";
import PropTypes from "prop-types";
const NotesItems = lazy(() => import("@components/notes/NoteItems"));

export default function NotesList({
  unarchivedNotes,
  archivedNotesHandler,
  deleteNoteHandler,
}) {
  return (
    <div className='col-span-10 grid grid-cols-4 gap-5'>
      {unarchivedNotes.length === 0 ? (
        <div className='col-span-4 text-center text-gray-500 mt-10'>
          No unarchived notes available.
        </div>
      ) : (
        unarchivedNotes.map((note) => (
          <Suspense
            key={note.id}
            fallback={<SkeletonLoader />}
          >
            <NotesItems
              id={note.id}
              title={note.title}
              body={note.body}
              createdAt={note.createdAt}
              archived={note.archived}
              archivedNotesHandler={archivedNotesHandler}
              deleteNoteHandler={deleteNoteHandler}
            />
          </Suspense>
        ))
      )}
    </div>
  );
}

NotesList.propTypes = {
  notes: PropTypes.arrayOf(PropTypes.object).isRequired,
}
