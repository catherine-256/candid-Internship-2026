import { useState } from 'react';
import { Home, Compass, Heart, PlusCircle, Bookmark, User, X, Image as ImageIcon } from 'lucide-react';
import { useAppStore } from '../storef/useAppStore';

export default function Sidebarr() {
  const [isOpen, setIsOpen] = useState(false);
  const [caption, setCaption] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const { activePage, setActivePage, addPost, userProfile } = useAppStore();

  const handleCreatePost = (e) => {
    e.preventDefault();
    if (!caption.trim() && !imageUrl.trim()) return;
    addPost(caption, imageUrl);
    setCaption('');
    setImageUrl('');
    setIsOpen(false);
  };

  const navItems = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'explore', icon: Compass, label: 'Explore' },
    { id: 'notifications', icon: Heart, label: 'Notifications' },
    { id: 'saved', icon: Bookmark, label: 'Saved' },
    { id: 'profile', icon: User, label: 'Profile' }
  ];

  return (
    <>
      <aside className="fixed top-0 left-0 h-screen w-64 bg-white/80 backdrop-blur-md border-r border-pink-200/60 flex flex-col justify-between p-5 z-40 shadow-sm">
        <div className="space-y-6">
          <div className="px-3 pt-2">
            <h1 className="text-3xl font-black bg-gradient-to-r from-pink-500 via-purple-500 to-pink-600 bg-clip-text text-transparent font-serif tracking-tight cursor-pointer" onClick={() => setActivePage('home')}>
              Candid
            </h1>
          </div>

          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActivePage(item.id)}
                  className={`flex items-center space-x-4 w-full px-4 py-3 rounded-2xl font-semibold text-sm transition-all duration-200 ${
                    isActive
                      ? 'bg-pink-500 text-white shadow-md shadow-pink-200'
                      : 'text-gray-600 hover:bg-pink-50 hover:text-pink-600'
                  }`}
                >
                  <Icon size={20} />
                  <span>{item.label}</span>
                </button>
              );
            })}

            <button
              onClick={() => setIsOpen(true)}
              className="flex items-center space-x-4 w-full px-4 py-3 rounded-2xl font-bold text-sm bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg shadow-pink-300/50 hover:opacity-95 transition-all duration-200 mt-4"
            >
              <PlusCircle size={20} />
              <span>Create Post</span>
            </button>
          </nav>
        </div>

        <div 
          onClick={() => setActivePage('profile')} 
          className="flex items-center space-x-3 p-3 rounded-2xl bg-pink-50/80 border border-pink-100 cursor-pointer hover:bg-pink-100/70 transition"
        >
          <img
            src={userProfile.avatar}
            alt={userProfile.username}
            className="w-10 h-10 rounded-full object-cover ring-2 ring-pink-400"
          />
          <div className="overflow-hidden">
            <p className="font-bold text-sm text-gray-900 truncate">{userProfile.username}</p>
            <p className="text-xs text-pink-500 font-medium truncate">{userProfile.fullName}</p>
          </div>
        </div>
      </aside>

      {isOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-md p-6 shadow-2xl relative border border-pink-100">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 bg-pink-50 p-2 rounded-full"
            >
              <X size={18} />
            </button>
            <h2 className="text-lg font-bold text-gray-900 mb-4 text-center">Create New Post</h2>
            <form onSubmit={handleCreatePost} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-pink-600 mb-1">Image URL</label>
                <div className="flex items-center bg-pink-50/50 border border-pink-200 rounded-xl px-3 py-2">
                  <ImageIcon size={18} className="text-pink-400 mr-2" />
                  <input
                    type="url"
                    placeholder="https://images.unsplash.com/..."
                    className="w-full text-xs bg-transparent outline-none text-gray-800 placeholder-pink-300"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-pink-600 mb-1">Caption</label>
                <textarea
                  placeholder="What's on your mind?"
                  rows={3}
                  className="w-full text-xs p-3 bg-pink-50/50 border border-pink-200 rounded-xl outline-none focus:ring-2 focus:ring-pink-400 resize-none placeholder-pink-300"
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-pink-500 hover:bg-pink-600 text-white font-bold text-sm rounded-xl shadow-md shadow-pink-200 transition"
              >
                Share to Feed
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}