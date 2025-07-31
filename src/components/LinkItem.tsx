import React from 'react';
import { type Link } from '../types';
import { truncateUrl, truncate } from '../utils';

interface LinkItemProps {
  link: Link;
  index: number;
  isInteractionDisabled: boolean;
  editingLink: Link | null;
  selectedLinks: string[];
  handleDragStart: (e: React.DragEvent<HTMLDivElement>, index: number) => void;
  handleDragOver: (e: React.DragEvent<HTMLDivElement>, index: number) => void;
  handleDragLeave: (e: React.DragEvent<HTMLDivElement>) => void;
  handleDrop: () => void;
  handleDragEnd: (e: React.DragEvent<HTMLDivElement>) => void;
  handleClick: (url: string) => void;
  handleCheckboxChange: (linkId: string) => void;
  handleEditClick: (link: Link) => void;
}

const LinkItem: React.FC<LinkItemProps> = ({
  link,
  index,
  isInteractionDisabled,
  editingLink,
  selectedLinks,
  handleDragStart,
  handleDragOver,
  handleDragLeave,
  handleDrop,
  handleDragEnd,
  handleClick,
  handleCheckboxChange,
  handleEditClick,
}) => {
  return (
    <div
      className={`link-item bg-gray-50 p-2 sm:p-4 rounded-lg shadow-md flex items-center space-x-2 sm:space-x-4 border border-gray-100 transition duration-200 ease-in-out
        ${isInteractionDisabled ? 'cursor-not-allowed opacity-70' : 'cursor-grab active:cursor-grabbing hover:border-indigo-300'}
        ${editingLink && editingLink.id === link.id ? 'border-4 border-blue-500 bg-blue-100' : ''}
        ${selectedLinks.includes(link.id) ? 'bg-blue-50 border-blue-400' : ''}
      `}
      draggable={!isInteractionDisabled}
      onDragStart={(e) => handleDragStart(e, index)}
      onDragOver={(e) => handleDragOver(e, index)}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onDragEnd={handleDragEnd}
      onClick={() => handleClick(link.url)}
    >
      <input
        type="checkbox"
        checked={selectedLinks.includes(link.id)}
        onChange={() => handleCheckboxChange(link.id)}
        onClick={(e) => e.stopPropagation()}
        className="form-checkbox h-4 w-4 text-indigo-600 rounded focus:ring-indigo-500 cursor-pointer"
      />
      <img
        src={link.image}
        alt={link.title}
        className="w-12 h-12 sm:w-16 sm:h-16 rounded-full object-cover border-2 border-indigo-400 p-1"
        onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => { (e.target as HTMLImageElement).onerror = null; (e.target as HTMLImageElement).src="https://placehold.co/60x60/CCCCCC/000000?text=?" }}
      />
      <div className="flex-1">
        <h3 className="text-lg sm:text-xl font-semibold text-indigo-800" title={link.title}>{truncate(link.title, 20)}</h3>
        <p className="text-xs sm:text-sm text-gray-600 truncate" title={link.url}>
          {truncateUrl(link.url, 30)}
        </p>
      </div>
      <button
        onClick={(e) => {
          e.stopPropagation();
          handleEditClick(link);
        }}
        className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        title="Edit Link"
        disabled={selectedLinks.length > 0}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-gray-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>
    </div>
  );
};

export default LinkItem;
