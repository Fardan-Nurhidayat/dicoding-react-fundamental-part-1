import { useState } from "react";
import { addNote } from "@utils/utils";
import { useNavigate } from "react-router";
import { PencilSquareIcon, DocumentTextIcon } from "@heroicons/react/24/outline";

export default function CreatePage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    body: ""
  });
  const [charCount, setCharCount] = useState(0);
  const MAX_TITLE_LENGTH = 50;

  const handleTitleChange = (e) => {
    const newTitle = e.target.value;
    if (newTitle.length <= MAX_TITLE_LENGTH) {
      setFormData({ ...formData, title: newTitle });
      setCharCount(newTitle.length);
    }
  };

  const handleBodyChange = (e) => {
    setFormData({ ...formData, body: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (formData.title.trim() && formData.body.trim()) {
      addNote(formData.title, formData.body);
      setFormData({ title: "", body: "" });
      setCharCount(0);
      navigate("/");
    }
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <div className="col-span-10 min-h-screen bg-linear-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2 flex items-center gap-3">
            <PencilSquareIcon className="w-8 h-8 text-teal-600" />
            Create New Note
          </h1>
          <p className="text-gray-600">Capture your thoughts and ideas</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-8 space-y-6">
          <div>
            <div className="flex items-center justify-between mb-2">
              <label htmlFor="title" className="block text-sm font-semibold text-gray-700">
                Title
              </label>
              <span className={`text-xs font-medium ${charCount > MAX_TITLE_LENGTH * 0.9 ? 'text-red-500' : 'text-gray-500'}`}>
                {charCount}/{MAX_TITLE_LENGTH}
              </span>
            </div>
            <input
              type="text"
              id="title"
              value={formData.title}
              onChange={handleTitleChange}
              placeholder="Enter note title..."
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 text-gray-800 placeholder-gray-400"
              required
            />
          </div>

          <div>
            <label htmlFor="body" className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
              <DocumentTextIcon className="w-5 h-5" />
              Content
            </label>
            <textarea
              id="body"
              value={formData.body}
              onChange={handleBodyChange}
              placeholder="Write your note content here..."
              rows={12}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 text-gray-800 placeholder-gray-400 resize-none"
              required
            />
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              className="flex-1 bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
            >
              Create Note
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
            >
              Cancel
            </button>
          </div>
        </form>

        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-800">
            <span className="font-semibold">Tip:</span> Keep your notes concise and organized. Use a descriptive title to make them easy to find later.
          </p>
        </div>
      </div>
    </div>
  );
}