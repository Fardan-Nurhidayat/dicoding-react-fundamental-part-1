import PropTypes from "prop-types";

export default function Button({ variant = "filled", children, onClick, type = "button", className = "" }) {
  const baseClasses = "px-4 py-2.5 rounded-lg font-semibold cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200 dark:focus:ring-offset-gray-800";
  const variants = {
    filled: "bg-teal-600 hover:bg-teal-700 text-white focus:ring-teal-500 shadow-sm hover:shadow-md dark:bg-teal-700 dark:hover:bg-teal-600",
    outlined: "bg-transparent border-2 border-teal-600 text-teal-600 hover:bg-teal-600 hover:text-white focus:ring-teal-500 dark:border-teal-400 dark:text-teal-400 dark:hover:bg-teal-600 dark:hover:text-white",
    text: "bg-transparent hover:bg-gray-100 text-gray-700 dark:text-gray-200 dark:hover:bg-gray-700",
    delete: "bg-red-600 hover:bg-red-700 text-white focus:ring-red-500 shadow-sm hover:shadow-md dark:bg-red-700 dark:hover:bg-red-600",
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