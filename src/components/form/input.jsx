import PropTypes from "prop-types";

export default function Input({ 
  type = "text", 
  name, 
  id,
  value, 
  onChange, 
  placeholder,
  required = false,
  className = "",
  disabled = false,
  maxLength,
  ...props
}) {
  return (
    <input
      type={type}
      name={name}
      id={id || name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      disabled={disabled}
      maxLength={maxLength}
      className={`w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 text-gray-800 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 disabled:bg-gray-100 dark:disabled:bg-gray-700 disabled:cursor-not-allowed bg-white dark:bg-gray-800 ${className}`}
      {...props}
    />
  );
}

Input.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  id: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  maxLength: PropTypes.number,
};