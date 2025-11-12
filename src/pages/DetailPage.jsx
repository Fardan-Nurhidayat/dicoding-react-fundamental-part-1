import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { getNoteById, archiveNoteById, unarchiveNoteById, deleteNoteById } from "@utils/utils";
import { formatedDate } from "@utils/utils";
import {
  ArrowLeftIcon,
  ArchiveBoxIcon,
  ArchiveBoxArrowDownIcon,
  TrashIcon,
  CalendarIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";
import { Spinner } from "@material-tailwind/react";

export default function DetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchNote() {
      setLoading(true);
      const fetchedNote = await getNoteById(id);
      setNote(fetchedNote);
      setLoading(false);
    }
    fetchNote();
  }, [id]);

  const handleBack = () => {
    navigate(-1);
  };

  const handleArchive = () => {
    if (note.archived) {
      unarchiveNoteById(id);
      setNote({ ...note, archived: false });
    } else {
      archiveNoteById(id);
      setNote({ ...note, archived: true });
    }
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this note?")) {
      deleteNoteById(id);
      navigate("/");
    }
  };

  if (loading) {
    return (
      <div className="col-span-10 flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <Spinner className="w-12 h-12 text-teal-600" />
      </div>
    );
  }

  if (!note) {
    return (
      <div className="col-span-10 flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <div className="text-center">
          <svg className="w-24 h-24 text-gray-300 dark:text-gray-600 mb-4 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">Note Not Found</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">The note you're looking for doesn't exist or has been deleted.</p>
          <button
            onClick={handleBack}
            className="inline-flex items-center gap-2 px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-lg transition-all duration-200 shadow-md hover:shadow-lg dark:bg-teal-700 dark:hover:bg-teal-600"
          >
            <ArrowLeftIcon className="w-5 h-5" />
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="col-span-10 bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors duration-300">
      <div className="sticky top-0 z-10 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm transition-colors duration-300">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={handleBack}
              className="inline-flex items-center gap-2 px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all duration-200"
            >
              <ArrowLeftIcon className="w-5 h-5" />
              Back
            </button>
            <div className="flex gap-2">
              <button
                onClick={handleArchive}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${
                  note.archived
                    ? "bg-teal-600 hover:bg-teal-700 dark:bg-teal-700 dark:hover:bg-teal-600 text-white shadow-sm hover:shadow-md"
                    : "bg-gray-600 hover:bg-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600 text-white shadow-sm hover:shadow-md"
                }`}
              >
                {note.archived ? (
                  <>
                    <ArchiveBoxArrowDownIcon className="w-5 h-5" />
                    Unarchive
                  </>
                ) : (
                  <>
                    <ArchiveBoxIcon className="w-5 h-5" />
                    Archive
                  </>
                )}
              </button>
              <button
                onClick={handleDelete}
                className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-600 text-white rounded-lg font-semibold transition-all duration-200 shadow-sm hover:shadow-md"
              >
                <TrashIcon className="w-5 h-5" />
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        <article className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden transition-colors duration-300">
          <div className="h-2 bg-linear-to-r from-teal-500 to-blue-500"></div>
          
          <div className="p-8">
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-4">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  note.archived 
                    ? 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400' 
                    : 'bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-400'
                }`}>
                  {note.archived ? "Archived" : "Active"}
                </span>
              </div>
              
              <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4 leading-tight">
                {note.title}
              </h1>
              
              <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center gap-2">
                  <CalendarIcon className="w-5 h-5 text-gray-400 dark:text-gray-500" />
                  <span>Created: {formatedDate(note.createdAt)}</span>
                </div>
                {note.updatedAt && note.updatedAt !== note.createdAt && (
                  <div className="flex items-center gap-2">
                    <ClockIcon className="w-5 h-5 text-gray-400 dark:text-gray-500" />
                    <span>Updated: {formatedDate(note.updatedAt)}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
                  {note.body}
                </p>
              </div>
            </div>
          </div>
        </article>

        <div className="mt-6 bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-700 rounded-lg p-4 transition-colors duration-300">
          <p className="text-sm text-blue-800 dark:text-blue-200">
            <span className="font-semibold">Tip:</span> You can archive this note to keep it for later reference, or delete it permanently if you no longer need it.
          </p>
        </div>
      </div>
    </div>
  );
}