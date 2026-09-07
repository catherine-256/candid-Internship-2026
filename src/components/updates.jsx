import { useState } from 'react';
import { Heart, MessageCircle, Bookmark, Bell, UserPlus, Image, Sparkles } from 'lucide-react';
import { useAppStore } from '../storef/useAppStore';

export default function Updates() {
  const { notifications } = useAppStore();
  const [filter, setFilter] = useState('all');

  const filteredNotifications = notifications.filter((n) => {
    if (filter === 'likes') return n.type === 'like';
    if (filter === 'comments') return n.type === 'comment';
    if (filter === 'saves') return n.type === 'save';
    return true;
  });

  const getIcon = (type) => {
    switch (type) {
      case 'like': return <Heart size={12} className="text-white fill-white" />;
      case 'comment': return <MessageCircle size={12} className="text-white fill-white" />;
      case 'save': return <Bookmark size={12} className="text-white fill-white" />;
      case 'follow': return <UserPlus size={12} className="text-white" />;
      case 'post': return <Image size={12} className="text-white" />;
      case 'story': return <Sparkles size={12} className="text-white" />;
      default: return null;
    }
  };

  const getBadgeBg = (type) => {
    switch (type) {
      case 'like': return 'bg-rose-500';
      case 'comment': return 'bg-purple-500';
      case 'save': return 'bg-pink-500';
      case 'follow': return 'bg-emerald-500';
      case 'post': return 'bg-indigo-500';
      case 'story': return 'bg-amber-500';
      default: return 'bg-pink-400';
    }
  };

  return (
    <div className="w-full max-w-lg bg-white/90 backdrop-blur-md border border-pink-200/70 rounded-3xl p-5 sm:p-6 shadow-sm transition-all">
      <div className="flex items-center justify-between pb-4 border-b border-pink-100 mb-4">
        <div className="flex items-center space-x-2">
          <div className="bg-pink-100 p-2 rounded-2xl text-pink-600">
            <Bell size={20} />
          </div>
          <div>
            <h2 className="text-lg font-black text-gray-900">Notifications</h2>
            <p className="text-[11px] text-pink-500 font-medium">Your activity stream</p>
          </div>
        </div>
      </div>

      <div className="flex space-x-2 mb-4 overflow-x-auto pb-1 scrollbar-none">
        {['all', 'likes', 'comments', 'saves'].map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold capitalize transition ${
              filter === tab
                ? 'bg-pink-500 text-white shadow-md shadow-pink-200'
                : 'bg-pink-50 text-gray-600 hover:bg-pink-100 hover:text-pink-600'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filteredNotifications.length === 0 ? (
          <div className="text-center py-12 text-gray-400 text-xs font-medium">
            No notifications yet. Perform actions like following, posting, or liking to see activity here!
          </div>
        ) : (
          filteredNotifications.map((n) => (
            <div
              key={n.id}
              className="flex items-center justify-between p-3.5 rounded-2xl bg-gradient-to-r from-pink-50/60 to-rose-50/30 border border-pink-100 hover:border-pink-300 transition duration-200 shadow-2xs group"
            >
              <div className="flex items-center space-x-3.5 min-w-0">
                <div className="relative flex-shrink-0">
                  <img src={n.avatar} alt={n.username} className="w-11 h-11 rounded-full object-cover ring-2 ring-pink-200" />
                  <div className={`absolute -bottom-1 -right-1 p-1 rounded-full shadow-sm ${getBadgeBg(n.type)}`}>
                    {getIcon(n.type)}
                  </div>
                </div>

                <div className="text-xs truncate">
                  <p className="text-gray-800 truncate leading-relaxed">
                    <span className="font-bold text-gray-900">{n.username}</span> {n.text}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}