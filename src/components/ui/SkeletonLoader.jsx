const SkeletonLoader = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="h-1 bg-gray-200 animate-pulse"></div>
      <div className="p-6 animate-pulse">
        <div className="h-6 bg-gray-200 rounded-lg w-3/4 mb-4"></div>
        <div className="space-y-3 mb-4">
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          <div className="h-4 bg-gray-200 rounded w-4/6"></div>
        </div>
        <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-100">
          <div className="h-3 bg-gray-200 rounded w-24"></div>
          <div className="h-5 bg-gray-200 rounded-full w-16"></div>
        </div>
        <div className="flex gap-2">
          <div className="h-10 bg-gray-200 rounded-lg flex-1"></div>
          <div className="h-10 bg-gray-200 rounded-lg w-12"></div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonLoader;