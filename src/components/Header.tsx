import React from 'react';

interface HeaderProps {
  isInteractionDisabled: boolean;
}

const Header: React.FC<HeaderProps> = ({ isInteractionDisabled }) => {
  return (
    <div>
      <h1 className="text-3xl sm:text-4xl font-extrabold text-center text-indigo-700 mb-8 drop-shadow-sm">
        Link Management
      </h1>
      <p className="text-center text-gray-600 mb-6">
        Drag and drop links to reorder them. Click a link to open it.
        {isInteractionDisabled && <span className="text-red-500 font-bold ml-2"> (Interaction disabled: Edit/Select mode active)</span>}
      </p>
    </div>
  );
};

export default Header;
