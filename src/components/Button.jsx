export default function Button({ variant = "filled" ,  children, onClick, type = "button" }) {
  const baseClasses = "px-4 py-2 rounded text-white font-semibold cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 ";
  const variants = {
    filled: "bg-teal-600 hover:bg-teal-700 focus:ring-teal-500",
    outlined: "bg-transparent border-2 border-teal-600 text-teal-600 hover:bg-teal-600 hover:text-white focus:ring-teal-500",
    text: "bg-transparent",
    delete: "bg-red-600 hover:bg-red-700 focus:ring-red-500",
  };  
  return (
    <button
      type={type}
      onClick={onClick}
      className={baseClasses + (variants[variant] || variants.filled)}
 >
      {children}
    </button>
  );
}