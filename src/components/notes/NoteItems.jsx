import PropTypes from "prop-types";
import { formatedDate } from "@utils/utils";
import Button from "@components/Button";
import { ArchiveBoxIcon, TrashIcon } from "@heroicons/react/24/outline";

export default function NotesItems({
  id,
  title,
  body,
  createdAt,
  archived,
  archivedNotesHandler,
  deleteNoteHandler,
}) {
  return (
    <div className="group relative bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-teal-500 to-blue-500"></div>
      
      <div className="p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2 group-hover:text-teal-600 transition-colors">
          {title}
        </h2>
        <p className="text-gray-600 mb-4 line-clamp-3 text-sm leading-relaxed">
          {body}
        </p>
        
        <div className="flex items-center justify-between text-xs text-gray-500 mb-4 pb-4 border-b border-gray-100">
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {formatedDate(createdAt)}
          </span>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${archived ? 'bg-gray-100 text-gray-600' : 'bg-green-100 text-green-700'}`}>
            {archived ? "Archived" : "Active"}
          </span>
        </div>
        
        <div className="flex gap-2">
          <Button
            variant="filled"
            onClick={() => archivedNotesHandler(id)}
            className="flex-1 flex items-center justify-center gap-2"
          >
            <ArchiveBoxIcon className="w-4 h-4" />
            Archive
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
  archivedNotesHandler: PropTypes.func.isRequired,
  deleteNoteHandler: PropTypes.func.isRequired,
}