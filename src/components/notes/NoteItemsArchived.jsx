import PropTypes from "prop-types";
import { formatedDate } from "@utils/utils";
import Button from "@components/Button";
import { ArchiveBoxArrowDownIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router";

export default function NotesItems({ id, title, body, createdAt, archived, unarchiveNoteHandler, deleteNoteHandler }) {
  return (
    <div className="group relative bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-gray-400 to-gray-600"></div>
      
      <div className="p-6">
        <Link to={`/notes/${id}`} className="block mb-4">
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-3 line-clamp-2 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors">
            {title}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3 text-sm leading-relaxed">
            {body}
          </p>
        </Link>
        
        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-4 pb-4 border-b border-gray-100 dark:border-gray-700">
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {formatedDate(createdAt)}
          </span>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${archived ? 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400' : 'bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-400'}`}>
            {archived ? "Archived" : "Active"}
          </span>
        </div>
        
        <div className="flex gap-2">
          <Button
            variant="filled"
            onClick={() => unarchiveNoteHandler(id)}
            className="flex-1 flex items-center justify-center gap-2"
          >
            <ArchiveBoxArrowDownIcon className="w-4 h-4" />
            Unarchive
          </Button>
          <Button 
            variant="delete"
            onClick={() => deleteNoteHandler(id)}
            className="flex items-center justify-center gap-2"
          >
            <TrashIcon className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

NotesItems.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  archived: PropTypes.bool.isRequired,
  unarchiveNoteHandler: PropTypes.func.isRequired,
  deleteNoteHandler: PropTypes.func.isRequired,
}
