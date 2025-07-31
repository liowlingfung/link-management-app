import React from 'react';
import LinkItem from './LinkItem';
import { type Link } from '../types';

interface LinkListProps {
  links: Link[];
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

const LinkList: React.FC<LinkListProps> = ({
  links,
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
    <div className="space-y-4 max-h-96 overflow-y-auto pr-2 custom-scrollbar">
      {links.length > 0 ? (
        links.map((link, index) => (
          <LinkItem
            key={link.id}
            link={link}
            index={index}
            isInteractionDisabled={isInteractionDisabled}
            editingLink={editingLink}
            selectedLinks={selectedLinks}
            handleDragStart={handleDragStart}
            handleDragOver={handleDragOver}
            handleDragLeave={handleDragLeave}
            handleDrop={handleDrop}
            handleDragEnd={handleDragEnd}
            handleClick={handleClick}
            handleCheckboxChange={handleCheckboxChange}
            handleEditClick={handleEditClick}
          />
        ))
      ) : (
        <p className="text-center text-gray-500 italic">No links added yet. Add some using the form!</p>
      )}
    </div>
  );
};

export default LinkList;
