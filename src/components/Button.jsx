import PropTypes from "prop-types";

export default function Button({ variant = "filled", children, onClick, type = "button", className = "" }) {
  const baseClasses = "px-4 py-2.5 rounded-lg font-semibold cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200 ";
  const variants = {
    filled: "bg-teal-600 hover:bg-teal-700 text-white focus:ring-teal-500 shadow-sm hover:shadow-md",
    outlined: "bg-transparent border-2 border-teal-600 text-teal-600 hover:bg-teal-600 hover:text-white focus:ring-teal-500",
    text: "bg-transparent hover:bg-gray-100 text-gray-700",
    delete: "bg-red-600 hover:bg-red-700 text-white focus:ring-red-500 shadow-sm hover:shadow-md",
  };
  
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseClasses}${variants[variant] || variants.filled} ${className}`}
    >
      {children}
    </button>
  );
}

Button.propTypes = {
  variant: PropTypes.oneOf(["filled", "outlined", "text", "delete"]),
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  type: PropTypes.oneOf(["button", "submit", "reset"]),
  className: PropTypes.string,
};