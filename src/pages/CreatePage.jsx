import { createNote } from "@utils/api";
import { useNavigate } from "react-router";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import FormInput from "@components/form/FormInput";
import { Spinner } from "@material-tailwind/react";
import { useState } from "react";
import { useLang } from "@/hooks/useLang";
export default function CreatePage() {
  const [loading , setLoading] = useState(false);
  const navigate = useNavigate();
  const { t } = useLang();

  const handleSubmit = (formData) => {
    try {
      setLoading(true);
      createNote(formData);
      navigate("/");
    } catch (error) {
      console.error("Error creating note:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <div className='col-span-10 min-h-screen bg-linear-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-6 transition-colors duration-300'>
      {loading && (
        <div className='absolute top-0 left-0 w-full h-full bg-gray-500/50 dark:bg-gray-900/70 flex items-center justify-center z-50'>
          <Spinner
            className='h-12 w-12 text-blue-500'
            color='blue'
          />
        </div>
      )}
      <div className='max-w-4xl mx-auto'>
        <div className='mb-8'>
          <h1 className='text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2 flex items-center gap-3'>
            <PencilSquareIcon className='w-8 h-8 text-teal-600' />
            {t("createPage.title")}
          </h1>
          <p className='text-gray-600 dark:text-gray-400'>{t("createPage.subtitle")}</p>
        </div>

        <FormInput
          onSubmit={handleSubmit}
          submitText={t("createPage.submitButton")}
          showCancel={true}
          onCancel={handleCancel}
          titleMaxLength={50}
          bodyMaxLength={500}
        />

        <div className='mt-6 bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-700 rounded-lg p-4'>
          <p className='text-sm text-blue-800 dark:text-blue-200'>
            <span className='font-semibold'>{t("createPage.tip")}</span> {t("createPage.tipMessage")}
          </p>
        </div>
      </div>
    </div>
  );
}