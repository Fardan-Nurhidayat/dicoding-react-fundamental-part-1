import { addNote } from "@utils/utils";
import { useNavigate } from "react-router";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import FormInput from "@components/form/FormInput";

export default function CreatePage() {
  const navigate = useNavigate();

  const handleSubmit = (formData) => {
    addNote(formData.title, formData.body);
    navigate("/");
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

        <FormInput
          onSubmit={handleSubmit}
          submitText="Create Note"
          showCancel={true}
          onCancel={handleCancel}
          titleMaxLength={50}
          bodyMaxLength={500}
        />

        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-800">
            <span className="font-semibold">Tip:</span> Keep your notes concise and organized. Use a descriptive title to make them easy to find later.
          </p>
        </div>
      </div>
    </div>
  );
}