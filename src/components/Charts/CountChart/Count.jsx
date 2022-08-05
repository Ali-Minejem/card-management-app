import React from "react";

function Count(props) {
  const { label, count } = props;
  return (
    <div className="flex items-center p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800 w-[250px]">
      <div>
        <p className="mb-2 text-lg font-medium  text-gray-600 dark:text-gray-400">
          {label}
        </p>
        <p className="text-3xl font-semibold text-[#00C49F] text-gray-700 dark:text-gray-200">
          {count}
        </p>
      </div>
    </div>
  );
}

export default Count;
