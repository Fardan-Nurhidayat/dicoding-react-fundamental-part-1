import PropTypes from "prop-types";
import { formatedDate } from "@utils/utils";
import Button from "@components/Button";
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
    <>
      <div className='p-4 border rounded-lg shadow-md bg-white'>
        <h2 className='text-xl font-bold mb-2'>{title}</h2>
        <p className='text-gray-600 mb-4'>{body}</p>
        <div className='text-sm text-gray-500'>
          Created At: {formatedDate(createdAt)}
        </div>
        <div className='text-sm text-gray-500'>
          Status: {archived ? "Archived" : "Unarchived"}
        </div>
        <div className='mt-4 flex space-x-2 justify-center items-center'>
          <Button
            variant='filled'
            onClick={() => archivedNotesHandler(id)}
          >
            Arsipkan
          </Button>
          <Button 
            variant='delete'
            onClick={() => deleteNoteHandler(id)}
          >
            Delete
          </Button>
        </div>
      </div>
    </>
  );
}

NotesItems.propTypes = {
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  archived: PropTypes.bool.isRequired,
  archivedNotesHandler: PropTypes.func.isRequired,
}