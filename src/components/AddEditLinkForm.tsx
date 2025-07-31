import React from 'react';
import { type Link } from '../types';

interface AddEditLinkFormProps {
  editingLink: Link | null;
  newLinkTitle: string;
  setNewLinkTitle: (title: string) => void;
  newLinkUrl: string;
  setNewLinkUrl: (url: string) => void;
  newLinkImage: string;
  setNewLinkImage: (image: string) => void;
  selectedLinks: string[];
  handleSubmitLink: (e: React.FormEvent<HTMLFormElement>) => void;
  handleCancelEdit: () => void;
  handleDeleteLink: () => void;
  handleCopyLink: () => void;
}

const AddEditLinkForm: React.FC<AddEditLinkFormProps> = ({
  editingLink,
  newLinkTitle,
  setNewLinkTitle,
  newLinkUrl,
  setNewLinkUrl,
  newLinkImage,
  setNewLinkImage,
  selectedLinks,
  handleSubmitLink,
  handleCancelEdit,
  handleDeleteLink,
  handleCopyLink,
}) => {
  return (
    <div className="p-6 bg-blue-50 rounded-lg border border-blue-200 shadow-inner">
      <h2 className="text-2xl font-bold text-blue-800 mb-6 text-center">
        {editingLink ? 'Edit Link' : 'Add New Link'}
      </h2>
      <form onSubmit={handleSubmitLink} className="space-y-4">
        <div>
          <label htmlFor="linkTitle" className="block text-gray-700 text-sm font-semibold mb-2">
            Title
          </label>
          <input
            type="text"
            id="linkTitle"
            value={newLinkTitle}
            onChange={(e) => setNewLinkTitle(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
            placeholder="e.g., My Favorite Blog"
            required
            disabled={selectedLinks.length > 0}
          />
        </div>
        <div>
          <label htmlFor="linkUrl" className="block text-gray-700 text-sm font-semibold mb-2">
            URL
          </label>
          <input
            type="url"
            id="linkUrl"
            value={newLinkUrl}
            onChange={(e) => setNewLinkUrl(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
            placeholder="e.g., https://www.example.com"
            required
            disabled={selectedLinks.length > 0}
          />
        </div>
        <div>
          <label htmlFor="linkImage" className="block text-gray-700 text-sm font-semibold mb-2">
            Image URL (Optional)
          </label>
          <input
            type="url"
            id="linkImage"
            value={newLinkImage}
            onChange={(e) => setNewLinkImage(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
            placeholder="e.g., https://example.com/logo.png"
            disabled={selectedLinks.length > 0}
          />
          <p className="text-xs text-gray-500 mt-1">
            If left blank, a placeholder image will be generated.
          </p>
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-200 ease-in-out shadow-lg"
          disabled={selectedLinks.length > 0}
        >
          {editingLink ? 'Update Link' : 'Add Link'}
        </button>
        {editingLink && (
          <>
            <button
              type="button"
              onClick={handleCancelEdit}
              className="w-full bg-gray-400 text-white font-bold py-3 px-4 rounded-md hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 transition duration-200 ease-in-out shadow-lg mt-2"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleDeleteLink}
              className="w-full bg-red-600 text-white font-bold py-3 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition duration-200 ease-in-out shadow-lg mt-2"
            >
              Delete Link
            </button>
            <button
              type="button"
              onClick={handleCopyLink}
              className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200 ease-in-out shadow-lg mt-2"
            >
              Copy Link
            </button>
          </>
        )}
      </form>
    </div>
  );
};

export default AddEditLinkForm;
