import { useState } from 'react';
import { Heart, MessageCircle, Bookmark, Send } from 'lucide-react';
import { useAppStore } from '../storef/useAppStore';

export default function Post({ post, isExplore = false }) {
  const [commentText, setCommentText] = useState('');
  const { toggleLike, toggleBookmark, addComment } = useAppStore();

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    addComment(post.id, commentText, isExplore);
    setCommentText('');
  };

  return (
    <div className="bg-white/90 backdrop-blur-md border border-pink-200/70 rounded-3xl shadow-sm mb-6 overflow-hidden">
      <div className="flex items-center space-x-3 p-4 border-b border-pink-100">
        <img
          src={post.user_avatar}
          alt={post.username}
          className="w-10 h-10 rounded-full object-cover ring-2 ring-pink-300"
        />
        <span className="font-bold text-sm text-gray-900">{post.username}</span>
      </div>

      <div className="relative bg-pink-50/50">
        <img
          src={post.image_url}
          alt=""
          className="w-full max-h-[500px] object-cover"
        />
      </div>

      <div className="p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => toggleLike(post.id, isExplore)}
              className="hover:scale-110 transition text-gray-700"
            >
              <Heart
                size={22}
                className={post.is_liked ? 'text-pink-500 fill-pink-500' : 'hover:text-pink-500'}
              />
            </button>
            <button className="hover:scale-110 transition text-gray-700 hover:text-pink-500">
              <MessageCircle size={22} />
            </button>
          </div>
          <button
            onClick={() => toggleBookmark(post.id, isExplore)}
            className="hover:scale-110 transition text-gray-700"
          >
            <Bookmark
              size={22}
              className={post.is_saved ? 'text-pink-500 fill-pink-500' : 'hover:text-pink-500'}
            />
          </button>
        </div>

        <p className="font-bold text-xs text-gray-900">{post.likes_count} likes</p>

        <p className="text-xs text-gray-800 leading-relaxed">
          <span className="font-bold text-gray-900 mr-2">{post.username}</span>
          {post.caption}
        </p>

        {post.comments.length > 0 && (
          <div className="space-y-1 pt-1 border-t border-pink-50">
            {post.comments.map((c) => (
              <p key={c.id} className="text-xs text-gray-700">
                <span className="font-bold text-gray-900 mr-2">{c.username}</span>
                {c.text}
              </p>
            ))}
          </div>
        )}

        <form onSubmit={handleCommentSubmit} className="flex items-center space-x-2 pt-2 border-t border-pink-100">
          <input
            type="text"
            placeholder="Add a comment..."
            className="w-full text-xs bg-pink-50/50 border border-pink-200/80 rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-pink-300 placeholder-pink-300 text-gray-800"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          />
          <button
            type="submit"
            disabled={!commentText.trim()}
            className="text-pink-500 hover:text-pink-600 disabled:opacity-30 transition font-bold text-xs px-2"
          >
            <Send size={16} />
          </button>
        </form>
      </div>
    </div>
  );
}