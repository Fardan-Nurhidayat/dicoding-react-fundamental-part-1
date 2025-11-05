import PropTypes from "prop-types";

export default function Textarea({ 
  name, 
  id,
  value, 
  onChange, 
  placeholder,
  required = false,
  className = "",
  disabled = false,
  rows = 4,
  maxLength,
  ...props
}) {
  return (
    <textarea
      name={name}
      id={id || name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      disabled={disabled}
      rows={rows}
      maxLength={maxLength}
      className={`w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 text-gray-800 placeholder-gray-400 resize-none disabled:bg-gray-100 disabled:cursor-not-allowed ${className}`}
      {...props}
    />
  );
}

Textarea.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  rows: PropTypes.number,
  maxLength: PropTypes.number,
};
