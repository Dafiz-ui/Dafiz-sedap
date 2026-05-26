import React from 'react';

export default function PageHeader({ title = 'Dashboard', breadcrumb = [], children }) {
  return (
    <div className="mb-6">
      {breadcrumb.length > 0 && (
        <nav aria-label="Breadcrumb" className="mb-4">
          <ol className="inline-flex items-center space-x-1 md:space-x-2">
            {breadcrumb.map((item, index) => (
              <li key={index} className="inline-flex items-center">
                {index > 0 && <span className="mx-1 text-gray-400 md:mx-2">/</span>}
                <span className={`text-sm font-medium ${index === breadcrumb.length - 1 ? 'text-gray-900' : 'text-gray-500 hover:text-gray-900'}`}>
                  {item}
                </span>
              </li>
            ))}
          </ol>
        </nav>
      )}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2 font-poppins">{title}</h1>
        </div>
        {children && (
          <div className="flex space-x-2">
            
            {children}
          </div>
        )}
      </div>
    </div>
  );
}
