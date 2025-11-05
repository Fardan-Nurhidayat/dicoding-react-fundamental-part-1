import { lazy , Suspense } from "react";
import SkeletonLoader from "@components//ui/SkeletonLoader";
import PropTypes from "prop-types";
const NotesItemsArchived = lazy(() => import("@components/notes/NoteItemsArchived"));
export default function NotesListArchived({ archivedNotes  }) {
  return (
    <div className='col-span-10 grid grid-cols-4 gap-5'>
      {archivedNotes.length === 0 ? (
        <div className='col-span-4 text-center text-gray-500 mt-10'>
          No archived notes available.
        </div>
        ) : (
        archivedNotes.map((note) => (
          <Suspense
            key={note.id}
            fallback={
              <SkeletonLoader />
            }
          >
            <NotesItemsArchived
              title={note.title}
              body={note.body}
              createdAt={note.createdAt}
              archived={note.archived}
            />
          </Suspense>
        ))
      )}
    </div>
  );
}

NotesItemsArchived.propTypes = {
  notes: PropTypes.arrayOf(PropTypes.object).isRequired,
}

