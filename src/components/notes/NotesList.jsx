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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
      {unarchivedNotes.length === 0 ? (
        <div className="col-span-full flex flex-col items-center justify-center py-16">
          <svg className="w-24 h-24 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <p className="text-gray-400 text-lg font-medium">No active notes yet</p>
          <p className="text-gray-400 text-sm mt-1">Create your first note to get started</p>
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
  unarchivedNotes: PropTypes.arrayOf(PropTypes.object).isRequired,
  archivedNotesHandler: PropTypes.func.isRequired,
  deleteNoteHandler: PropTypes.func.isRequired,
}
