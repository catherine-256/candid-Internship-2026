import { useState } from 'react';
import { Grid, Heart, MessageCircle, Share2, PlusCircle, Sparkles, X, Check, Edit3 } from 'lucide-react';
import { useAppStore } from '../storef/useAppStore';
import NotesFeature from './NotesFeature';

export default function Profile() {
  const { userProfile, posts, stories, highlights, setActiveStory, updateProfile, addUserStory, addPost } = useAppStore();
  const [copied, setCopied] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);
  const [isAddStoryOpen, setIsAddStoryOpen] = useState(false);

  const [fullName, setFullName] = useState(userProfile.fullName);
  const [bio, setBio] = useState(userProfile.bio);
  const [pronouns, setPronouns] = useState(userProfile.pronouns);
  const [caption, setCaption] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [storyUrl, setStoryUrl] = useState('');

  const myPosts = posts.filter((p) => p.username === userProfile.username);
  const userStory = stories.find((s) => s.isUser);

  const handleShareProfile = () => {
    const profileUrl = `${window.location.origin}/catherine`;
    navigator.clipboard.writeText(profileUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    updateProfile({ fullName, bio, pronouns });
    setIsEditOpen(false);
  };

  const handleCreatePost = (e) => {
    e.preventDefault();
    if (!caption.trim() && !imageUrl.trim()) return;
    addPost(caption, imageUrl);
    setCaption('');
    setImageUrl('');
    setIsCreatePostOpen(false);
  };

  const handleAddStorySubmit = (e) => {
    e.preventDefault();
    if (!storyUrl.trim()) return;
    addUserStory(storyUrl.trim());
    setStoryUrl('');
    setIsAddStoryOpen(false);
  };

  return (
    <div className="w-full max-w-2xl bg-white/90 backdrop-blur-md border border-pink-200/70 rounded-3xl p-6 sm:p-8 shadow-sm relative">


      <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-8 pb-6 border-b border-pink-100">
        <div
          onClick={() => userStory?.hasStory && setActiveStory(userStory)}
          className={`relative group cursor-pointer ${
            userStory?.hasStory ? 'p-1 rounded-full bg-gradient-to-tr from-pink-500 via-rose-400 to-purple-500 animate-pulse' : ''
          }`}
        >
          <img
            src={userProfile.avatar}
            alt={userProfile.username}
            className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover ring-4 ring-white shadow-md group-hover:opacity-90 transition"
          />
          {userStory?.hasStory && (
            <span className="absolute bottom-1 right-1 bg-pink-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full ring-2 ring-white">
              Story
            </span>
          )}
        </div>

        <div className="flex-1 text-center sm:text-left space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-3">
            <h2 className="text-2xl font-black text-gray-900">{userProfile.username}</h2>
            <span className="text-xs font-semibold text-pink-500 bg-pink-100 px-2.5 py-0.5 rounded-full w-max mx-auto sm:mx-0">
              {userProfile.pronouns}
            </span>
          </div>

          <div className="flex justify-center sm:justify-start space-x-6 text-xs text-gray-700">
            <span><strong className="text-gray-900 font-bold">{myPosts.length}</strong> posts</span>
            <span><strong className="text-gray-900 font-bold">142</strong> followers</span>
            <span><strong className="text-gray-900 font-bold">98</strong> following</span>
          </div>

          <div>
            <p className="text-sm font-bold text-gray-900">{userProfile.fullName}</p>
            <p className="text-xs text-pink-600 font-semibold mt-0.5">{userProfile.bio}</p>
          </div>

          <div className="flex flex-wrap gap-2 pt-1 justify-center sm:justify-start">
            <button
              onClick={() => setIsEditOpen(true)}
              className="flex items-center space-x-1.5 px-3.5 py-1.5 bg-pink-50 text-pink-600 font-bold text-xs rounded-xl hover:bg-pink-100 border border-pink-200 transition"
            >
              <Edit3 size={14} />
              <span>Edit Profile</span>
            </button>

            <button
              onClick={handleShareProfile}
              className="flex items-center space-x-1.5 px-3.5 py-1.5 bg-pink-500 text-white font-bold text-xs rounded-xl hover:bg-pink-600 transition shadow-sm"
            >
              {copied ? <Check size={14} /> : <Share2 size={14} />}
              <span>{copied ? 'Link Copied!' : 'Share Profile'}</span>
            </button>

            <button
              onClick={() => setIsCreatePostOpen(true)}
              className="flex items-center space-x-1.5 px-3.5 py-1.5 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold text-xs rounded-xl hover:opacity-95 transition shadow-sm"
            >
              <PlusCircle size={14} />
              <span>Create Post</span>
            </button>

            <button
              onClick={() => setIsAddStoryOpen(true)}
              className="flex items-center space-x-1.5 px-3.5 py-1.5 bg-purple-100 text-purple-700 font-bold text-xs rounded-xl hover:bg-purple-200 border border-purple-200 transition"
            >
              <Sparkles size={14} />
              <span>Add Story</span>
            </button>
          </div>
        </div>
      </div>

      <div className="py-4 border-b border-pink-100">
        <h3 className="text-xs font-bold text-pink-400 uppercase tracking-wider mb-3">Highlights</h3>
        <div className="flex space-x-4 overflow-x-auto scrollbar-none pb-1">
          {highlights.map((h) => (
            <div
              key={h.id}
              onClick={() => setActiveStory({ username: `${userProfile.username} - ${h.title}`, storyImage: h.cover, avatar: userProfile.avatar })}
              className="flex flex-col items-center flex-shrink-0 cursor-pointer group"
            >
              <div className="p-0.5 rounded-full bg-gradient-to-tr from-pink-300 to-purple-300 group-hover:scale-105 transition">
                <img src={h.cover} alt={h.title} className="w-14 h-14 rounded-full object-cover ring-2 ring-white" />
              </div>
              <span className="text-[11px] font-bold text-gray-700 mt-1">{h.title}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4">
        <NotesFeature />
      </div>

      <div className="flex justify-center space-x-8 py-3 border-b border-pink-100 text-xs font-bold text-pink-500 tracking-wider">
        <span className="flex items-center space-x-1.5 cursor-pointer border-b-2 border-pink-500 pb-1">
          <Grid size={16} />
          <span>MY POSTS</span>
        </span>
      </div>

      {myPosts.length === 0 ? (
        <div className="text-center py-12 text-gray-400 text-xs font-medium">
          No posts shared yet. Click "Create Post" above to share your first memory!
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4">
          {myPosts.map((post) => (
            <div key={post.id} className="relative group rounded-2xl overflow-hidden shadow-sm bg-black/5 border border-pink-100 aspect-square">
              <img src={post.image_url} alt="" className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition duration-200 flex items-center justify-center space-x-4 text-white font-bold text-xs backdrop-blur-[2px]">
                <div className="flex items-center space-x-1">
                  <Heart size={16} className="fill-white" />
                  <span>{post.likes_count}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <MessageCircle size={16} className="fill-white" />
                  <span>{post.comments.length}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}


      {isEditOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-md p-6 shadow-2xl relative border border-pink-100">
            <button onClick={() => setIsEditOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 bg-pink-50 p-2 rounded-full">
              <X size={18} />
            </button>
            <h2 className="text-lg font-bold text-gray-900 mb-4 text-center">Edit Profile</h2>
            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-pink-600 mb-1">Full Name</label>
                <input
                  type="text"
                  className="w-full text-xs p-3 bg-pink-50/50 border border-pink-200 rounded-xl outline-none focus:ring-2 focus:ring-pink-400 text-gray-800 font-medium"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-pink-600 mb-1">Pronouns</label>
                <input
                  type="text"
                  placeholder="e.g. she/her"
                  className="w-full text-xs p-3 bg-pink-50/50 border border-pink-200 rounded-xl outline-none focus:ring-2 focus:ring-pink-400 text-gray-800 font-medium"
                  value={pronouns}
                  onChange={(e) => setPronouns(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-pink-600 mb-1">Bio</label>
                <textarea
                  rows={3}
                  className="w-full text-xs p-3 bg-pink-50/50 border border-pink-200 rounded-xl outline-none focus:ring-2 focus:ring-pink-400 resize-none text-gray-800 font-medium"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                />
              </div>
              <button type="submit" className="w-full py-3 bg-pink-500 hover:bg-pink-600 text-white font-bold text-sm rounded-xl shadow-md transition">
                Save Changes
              </button>
            </form>
          </div>
        </div>
      )}

      {isAddStoryOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-md p-6 shadow-2xl relative border border-pink-100">
            <button onClick={() => setIsAddStoryOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 bg-pink-50 p-2 rounded-full">
              <X size={18} />
            </button>
            <h2 className="text-lg font-bold text-gray-900 mb-4 text-center">Add to Your Story</h2>
            <form onSubmit={handleAddStorySubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-pink-600 mb-1">Story Image URL</label>
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/..."
                  className="w-full text-xs p-3 bg-pink-50/50 border border-pink-200 rounded-xl outline-none focus:ring-2 focus:ring-pink-400 text-gray-800 font-medium"
                  value={storyUrl}
                  onChange={(e) => setStoryUrl(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="w-full py-3 bg-purple-500 hover:bg-purple-600 text-white font-bold text-sm rounded-xl shadow-md transition">
                Publish Story
              </button>
            </form>
          </div>
        </div>
      )}



      {isCreatePostOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-md p-6 shadow-2xl relative border border-pink-100">
            <button onClick={() => setIsCreatePostOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 bg-pink-50 p-2 rounded-full">
              <X size={18} />
            </button>
            <h2 className="text-lg font-bold text-gray-900 mb-4 text-center">Create New Post</h2>
            <form onSubmit={handleCreatePost} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-pink-600 mb-1">Image URL</label>
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/..."
                  className="w-full text-xs p-3 bg-pink-50/50 border border-pink-200 rounded-xl outline-none focus:ring-2 focus:ring-pink-400 text-gray-800 font-medium"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-pink-600 mb-1">Caption</label>
                <textarea
                  placeholder="What's on your mind?"
                  rows={3}
                  className="w-full text-xs p-3 bg-pink-50/50 border border-pink-200 rounded-xl outline-none focus:ring-2 focus:ring-pink-400 resize-none text-gray-800 font-medium"
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                />
              </div>
              <button type="submit" className="w-full py-3 bg-pink-500 hover:bg-pink-600 text-white font-bold text-sm rounded-xl shadow-md transition">
                Publish Post
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}