import PropTypes from "prop-types";
import Label from "./label";

export default function FormField({ 
  label, 
  htmlFor, 
  required = false,
  error,
  helpText,
  icon,
  children,
  className = ""
}) {
  return (
    <div className={`mb-6 ${className}`}>
      {label && (
        <Label 
          htmlFor={htmlFor} 
          required={required}
          icon={icon}
        >
          {label}
        </Label>
      )}
      
      {children}
      
      {helpText && !error && (
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          {helpText}
        </p>
      )}
      
      {error && (
        <p className="mt-2 text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
}

FormField.propTypes = {
  label: PropTypes.string,
  htmlFor: PropTypes.string,
  required: PropTypes.bool,
  error: PropTypes.string,
  helpText: PropTypes.string,
  icon: PropTypes.node,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};
