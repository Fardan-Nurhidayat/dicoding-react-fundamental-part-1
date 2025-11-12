import PropTypes from "prop-types";

export default function Label({ 
  children, 
  htmlFor, 
  required = false,
  className = "",
  icon 
}) {
  return (
    <label 
      htmlFor={htmlFor} 
      className={`flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 ${className}`}
    >
      {icon && <span className="w-5 h-5">{icon}</span>}
      {children}
      {required && <span className="text-red-500">*</span>}
    </label>
  );
}

Label.propTypes = {
  children: PropTypes.node.isRequired,
  htmlFor: PropTypes.string,
  required: PropTypes.bool,
  className: PropTypes.string,
  icon: PropTypes.node,
};