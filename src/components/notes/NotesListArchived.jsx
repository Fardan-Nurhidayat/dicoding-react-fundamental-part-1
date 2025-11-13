import { lazy, Suspense } from "react";
import SkeletonLoader from "@components/ui/SkeletonLoader";
import PropTypes from "prop-types";
import { useLang } from "@hooks/useLang";

const NotesItemsArchived = lazy(() => import("@components/notes/NoteItemsArchived"));

export default function NotesListArchived({ archivedNotes, unarchiveNoteHandler, deleteNoteHandler }) {
  const { t } = useLang();

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6'>
      {archivedNotes.length === 0 ? (
        <div className='col-span-full flex flex-col items-center justify-center py-16'>
          <svg
            className='w-24 h-24 text-gray-300 dark:text-gray-600 mb-4'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={1.5}
              d='M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4'
            />
          </svg>
          <p className='text-gray-400 dark:text-gray-500 text-lg font-medium'>
            {t("nullNotes.archivedNotes")}
          </p>
          <p className='text-gray-400 dark:text-gray-500 text-sm mt-1'>
            {t("nullNotes.description")}
          </p>
        </div>
      ) : (
        archivedNotes.map((note) => (
          <Suspense
            key={note.id}
            fallback={<SkeletonLoader />}
          >
            <NotesItemsArchived
              id={note.id}
              title={note.title}
              body={note.body}
              createdAt={note.createdAt}
              archived={note.archived}
              unarchiveNoteHandler={unarchiveNoteHandler}
              deleteNoteHandler={deleteNoteHandler}
            />
          </Suspense>
        ))
      )}
    </div>
  );
}

NotesListArchived.propTypes = {
  archivedNotes: PropTypes.arrayOf(PropTypes.object).isRequired,
  unarchiveNoteHandler: PropTypes.func.isRequired,
  deleteNoteHandler: PropTypes.func.isRequired,
}

