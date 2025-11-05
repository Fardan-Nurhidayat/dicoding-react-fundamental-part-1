import PropTypes from "prop-types";

export default function FormActions({ 
  onSubmit,
  onCancel,
  submitText = "Submit",
  cancelText = "Cancel",
  submitDisabled = false,
  loading = false,
  className = ""
}) {
  return (
    <div className={`flex gap-4 ${className}`}>
      <button
        type="submit"
        onClick={onSubmit}
        disabled={submitDisabled || loading}
        className="flex-1 bg-teal-600 hover:bg-teal-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 flex items-center justify-center gap-2"
      >
        {loading && (
          <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
        )}
        {submitText}
      </button>
      
      {onCancel && (
        <button
          type="button"
          onClick={onCancel}
          disabled={loading}
          className="px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
        >
          {cancelText}
        </button>
      )}
    </div>
  );
}

FormActions.propTypes = {
  onSubmit: PropTypes.func,
  onCancel: PropTypes.func,
  submitText: PropTypes.string,
  cancelText: PropTypes.string,
  submitDisabled: PropTypes.bool,
  loading: PropTypes.bool,
  className: PropTypes.string,
};
