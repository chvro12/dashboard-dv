import React from 'react';

export const Card = ({ children, className = '', onClick }) => (
  <div
    className={`bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 ${className}`}
    onClick={onClick}
  >
    {children}
  </div>
);

export const CardHeader = ({ children, className = '' }) => (
  <div className={`p-4 ${className}`}>{children}</div>
);

export const CardContent = ({ children, className = '' }) => (
  <div className={`p-4 pt-0 ${className}`}>{children}</div>
);

export const Progress = ({ value, max = 100, colorClass = "bg-blue-500" }) => {
  const percentage = Math.min((value / max) * 100, 100);
  return (
    <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
      <div
        className={`absolute left-0 top-0 h-full transition-all duration-500 ${colorClass}`}
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
};