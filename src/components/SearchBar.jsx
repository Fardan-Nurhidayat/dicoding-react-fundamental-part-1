import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import PropTypes from "prop-types";

export default function SearchBar({ query, onQueryChange, placeholder = "Search notes..." }) {
  return (
    <div className="relative w-full max-w-md">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 dark:text-gray-500" />
      </div>
      <input
        type="text"
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 text-gray-700 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500"
      />
    </div>
  );
}

SearchBar.propTypes = {
  query: PropTypes.string.isRequired,
  onQueryChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
};
