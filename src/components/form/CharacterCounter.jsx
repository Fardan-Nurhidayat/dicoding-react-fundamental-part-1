import PropTypes from "prop-types";

export default function CharacterCounter({ 
  current = 0, 
  max,
  className = "" 
}) {
  const percentage = (current / max) * 100;
  const isWarning = percentage > 90;
  const isDanger = percentage >= 100;

  return (
    <div className={`flex items-center justify-between ${className}`}>
      <span className={`text-xs font-medium ${
        isDanger ? 'text-red-600 dark:text-red-400' : 
        isWarning ? 'text-orange-500 dark:text-orange-400' : 
        'text-gray-500 dark:text-gray-400'
      }`}>
        {current}/{max} characters
      </span>
      
      <div className="w-24 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <div 
          className={`h-full transition-all duration-300 ${
            isDanger ? 'bg-red-500' : 
            isWarning ? 'bg-orange-500' : 
            'bg-teal-500'
          }`}
          style={{ width: `${Math.min(percentage, 100)}%` }}
        />
      </div>
    </div>
  );
}

CharacterCounter.propTypes = {
  current: PropTypes.number,
  max: PropTypes.number.isRequired,
  className: PropTypes.string,
};
