import React, { useState, useRef, useEffect } from 'react';
import Header from './components/Header';
import ActionButtons from './components/ActionButtons';
import LinkList from './components/LinkList';
import AddEditLinkForm from './components/AddEditLinkForm';
import { type Link } from './types.ts';

function App() {
  const [links, setLinks] = useState<Link[]>(() => {
    try {
      const storedLinks = localStorage.getItem('myLinks');
      return storedLinks ? JSON.parse(storedLinks) : [
        { id: '1', title: 'Google', url: 'https://www.google.com', image: 'https://placehold.co/60x60/FFD700/000000?text=G' },
        { id: '2', title: 'YouTube', url: 'https://www.youtube.com', image: 'https://placehold.co/60x60/FF0000/FFFFFF?text=YT' },
        { id: '3', title: 'Wikipedia', url: 'https://www.wikipedia.org', image: 'https://placehold.co/60x60/000000/FFFFFF?text=W' },
        { id: '4', title: 'GitHub', url: 'https://github.com', image: 'https://placehold.co/60x60/333333/FFFFFF?text=GH' },
        { id: '5', title: 'React Docs', url: 'https://react.dev/', image: 'https://placehold.co/60x60/61DAFB/000000?text=R' },
        { id: '6', title: 'ChatGPT', url: 'https://chat.openai.com/', image: 'https://placehold.co/60x60/74AA9C/FFFFFF?text=AI' },
        { id: '7', title: 'Dribbble', url: 'https://dribbble.com/', image: 'https://placehold.co/60x60/EA4C89/FFFFFF?text=D' },
        { id: '8', title: 'Figma', url: 'https://www.figma.com/', image: 'https://placehold.co/60x60/F24E1E/FFFFFF?text=F' },
        { id: '9', title: 'Stack Overflow', url: 'https://stackoverflow.com/', image: 'https://placehold.co/60x60/F48024/FFFFFF?text=SO' },
      ];
    } catch (error) {
      console.error("Failed to load links from localStorage:", error);
      return [
        { id: '1', title: 'Google', url: 'https://www.google.com', image: 'https://placehold.co/60x60/FFD700/000000?text=G' },
        { id: '2', title: 'YouTube', url: 'https://www.youtube.com', image: 'https://placehold.co/60x60/FF0000/FFFFFF?text=YT' },
        { id: '3', title: 'Wikipedia', url: 'https://www.wikipedia.org', image: 'https://placehold.co/60x60/000000/FFFFFF?text=W' },
        { id: '4', title: 'GitHub', url: 'https://github.com', image: 'https://placehold.co/60x60/333333/FFFFFF?text=GH' },
        { id: '5', title: 'React Docs', url: 'https://react.dev/', image: 'https://placehold.co/60x60/61DAFB/000000?text=R' },
      ];
    }
  });

  const [newLinkTitle, setNewLinkTitle] = useState('');
  const [newLinkUrl, setNewLinkUrl] = useState('');
  const [newLinkImage, setNewLinkImage] = useState('');
  const [editingLink, setEditingLink] = useState<Link | null>(null);
  const [selectedLinks, setSelectedLinks] = useState<string[]>([]);

  const dragItem = useRef<number | null>(null);
  const dragOverItem = useRef<number | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem('myLinks', JSON.stringify(links));
    } catch (error) {
      console.error("Failed to save links to localStorage:", error);
    }
  }, [links]);

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    if (editingLink || selectedLinks.length > 0) {
      e.preventDefault();
      return;
    }
    dragItem.current = index;
    e.currentTarget.classList.add('dragging');
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    e.preventDefault();
    dragOverItem.current = index;
    e.currentTarget.classList.add('drag-over');
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.currentTarget.classList.remove('drag-over');
  };

  const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    e.currentTarget.classList.remove('dragging');
    const allItems = document.querySelectorAll('.link-item');
    allItems.forEach(item => item.classList.remove('drag-over'));
  };

  const handleDrop = () => {
    if (editingLink || selectedLinks.length > 0 || dragItem.current === null || dragOverItem.current === null) {
      return;
    }

    const newLinks = [...links];
    const draggedLink = newLinks[dragItem.current];
    newLinks.splice(dragItem.current, 1);
    newLinks.splice(dragOverItem.current, 0, draggedLink);

    setLinks(newLinks);

    dragItem.current = null;
    dragOverItem.current = null;
  };

  const handleClick = (url: string) => {
    if (dragItem.current === null && dragOverItem.current === null && !editingLink && selectedLinks.length === 0) {
      window.open(url, '_blank');
    }
  };

  const handleSubmitLink = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!newLinkTitle || !newLinkUrl) {
      alert('Please enter both title and URL for the link.');
      return;
    }

    const linkData = {
      title: newLinkTitle,
      url: newLinkUrl,
      image: newLinkImage || `https://placehold.co/60x60/CCCCCC/000000?text=${newLinkTitle.charAt(0).toUpperCase()}`
    };

    if (editingLink) {
      const updatedLinks = links.map(link =>
        link.id === editingLink.id ? { ...link, ...linkData } : link
      );
      setLinks(updatedLinks);
      setEditingLink(null);
    } else {
      const newLink: Link = {
        id: String(Date.now()),
        ...linkData
      };
      setLinks([...links, newLink]);
    }

    setNewLinkTitle('');
    setNewLinkUrl('');
    setNewLinkImage('');
    setSelectedLinks([]);
  };

  const handleEditClick = (linkToEdit: Link) => {
    setEditingLink(linkToEdit);
    setNewLinkTitle(linkToEdit.title);
    setNewLinkUrl(linkToEdit.url);
    setNewLinkImage(linkToEdit.image);
    setSelectedLinks([]);
  };

  const handleCancelEdit = () => {
    setEditingLink(null);
    setNewLinkTitle('');
    setNewLinkUrl('');
    setNewLinkImage('');
  };

  const handleDeleteLink = () => {
    if (editingLink && window.confirm(`Are you sure you want to delete "${editingLink.title}"?`)) {
      const filteredLinks = links.filter(link => link.id !== editingLink.id);
      setLinks(filteredLinks);
      setEditingLink(null);
      setNewLinkTitle('');
      setNewLinkUrl('');
      setNewLinkImage('');
      setSelectedLinks([]);
    }
  };

  const handleCheckboxChange = (linkId: string) => {
    setEditingLink(null);
    if (selectedLinks.includes(linkId)) {
      setSelectedLinks(selectedLinks.filter(id => id !== linkId));
    } else {
      setSelectedLinks([...selectedLinks, linkId]);
    }
  };

  const handleDeleteSelected = () => {
    if (selectedLinks.length === 0) {
      alert('No links selected for deletion.');
      return;
    }
    if (window.confirm(`Are you sure you want to delete ${selectedLinks.length} selected link(s)?`)) {
      const remainingLinks = links.filter(link => !selectedLinks.includes(link.id));
      setLinks(remainingLinks);
      setSelectedLinks([]);
      setEditingLink(null);
      setNewLinkTitle('');
      setNewLinkUrl('');
      setNewLinkImage('');
    }
  };

  const handleCancelSelection = () => {
    setSelectedLinks([]);
    setEditingLink(null);
  };

  const handleDeleteAllLinks = () => {
    if (links.length === 0) {
      alert('There are no links to delete.');
      return;
    }
    if (window.confirm('Are you sure you want to delete ALL links? This action cannot be undone.')) {
      setLinks([]);
      setSelectedLinks([]);
      setEditingLink(null);
      setNewLinkTitle('');
      setNewLinkUrl('');
      setNewLinkImage('');
    }
  };

  const handleCopyLink = () => {
    if (editingLink && editingLink.url) {
      const el = document.createElement('textarea');
      el.value = editingLink.url;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      alert('Link URL copied to clipboard!');
    }
  };

  const isInteractionDisabled = editingLink || selectedLinks.length > 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-200 flex items-center justify-center p-4">
      <div className="bg-white p-4 sm:p-6 md:p-8 rounded-xl shadow-2xl w-full max-w-4xl border border-gray-200 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
        <div>
          <Header isInteractionDisabled={isInteractionDisabled} />
          <ActionButtons
            selectedLinks={selectedLinks}
            handleDeleteSelected={handleDeleteSelected}
            handleCancelSelection={handleCancelSelection}
          />
          <LinkList
            links={links}
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
          {links.length > 5 && (
            <p className="text-center text-gray-500 text-sm mt-4">
              Scroll down to see more links.
            </p>
          )}
          {links.length > 0 && (
            <button
              onClick={handleDeleteAllLinks}
              className="w-full bg-red-700 text-white font-bold py-2 px-4 rounded-md hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 transition duration-200 ease-in-out shadow-lg mt-4"
              disabled={isInteractionDisabled}
            >
              Delete All Links
            </button>
          )}
        </div>
        <AddEditLinkForm
          editingLink={editingLink}
          newLinkTitle={newLinkTitle}
          setNewLinkTitle={setNewLinkTitle}
          newLinkUrl={newLinkUrl}
          setNewLinkUrl={setNewLinkUrl}
          newLinkImage={newLinkImage}
          setNewLinkImage={setNewLinkImage}
          selectedLinks={selectedLinks}
          handleSubmitLink={handleSubmitLink}
          handleCancelEdit={handleCancelEdit}
          handleDeleteLink={handleDeleteLink}
          handleCopyLink={handleCopyLink}
        />
        <style>
          {`
          .dragging {
            opacity: 0.5;
            border: 2px dashed #6366F1;
          }
          .drag-over {
            background-color: #EEF2FF;
            border: 2px solid #818CF8;
          }
          .custom-scrollbar::-webkit-scrollbar {
            width: 8px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: #f1f1f1;
            border-radius: 10px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: #888;
            border-radius: 10px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: #555;
          }
          .custom-scrollbar {
            scrollbar-width: thin;
            scrollbar-color: #888 #f1f1f1;
          }
          `}
        </style>
      </div>
    </div>
  );
}

export default App;
