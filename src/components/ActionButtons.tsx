import React from 'react';

interface ActionButtonsProps {
  selectedLinks: string[];
  handleDeleteSelected: () => void;
  handleCancelSelection: () => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ selectedLinks, handleDeleteSelected, handleCancelSelection }) => {
  if (selectedLinks.length === 0) {
    return null;
  }

  return (
    <>
      <button
        onClick={handleDeleteSelected}
        className="w-full bg-red-500 text-white font-bold py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 transition duration-200 ease-in-out shadow-lg mb-2"
      >
        Delete Selected ({selectedLinks.length}) Links
      </button>
      <button
        onClick={handleCancelSelection}
        className="w-full bg-gray-500 text-white font-bold py-2 px-4 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 transition duration-200 ease-in-out shadow-lg mb-4"
      >
        Cancel Selection
      </button>
    </>
  );
};

export default ActionButtons;
