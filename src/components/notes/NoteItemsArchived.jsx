import PropTypes from "prop-types";
import { formatedDate } from "@utils/utils";
export default function NotesItems({ title, body, createdAt, archived }) {
  return (
    <>
      <div className='p-4 border rounded-lg shadow-md bg-white'>
        <h2 className='text-xl font-bold mb-2'>{title}</h2>
        <p className='text-gray-600 mb-4'>{body}</p>
        <div className='text-sm text-gray-500'>
          Created At:  {formatedDate(createdAt)}
        </div>
        <div className='text-sm text-gray-500'>
          Status: {archived ? "Archived" : "Active"}
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
}
