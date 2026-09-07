import { useEffect } from 'react';
import { Search, UserPlus, UserCheck } from 'lucide-react';
import { useAppStore } from '../storef/useAppStore';
import Post from './Post';

export default function Explore() {
  const { explorePosts, fetchExploreFeed, following, toggleFollow } = useAppStore();

  useEffect(() => {
    fetchExploreFeed();
  }, [fetchExploreFeed]);

  return (
    <div className="w-full max-w-xl space-y-6">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-4 top-3.5 text-pink-400" size={18} />
        <input
          type="text"
          placeholder="Search accounts, tags, or topics..."
          className="w-full pl-11 pr-4 py-3 bg-white/90 backdrop-blur-md border border-pink-200/80 rounded-2xl text-xs font-medium text-gray-800 placeholder-pink-300 outline-none focus:ring-2 focus:ring-pink-400 shadow-sm transition"
        />
      </div>

      <div className="space-y-6">
        {explorePosts.map((post) => {
          const isFollowingUser = !!following[post.username];
          return (
            <div key={post.id} className="relative group">
              <div className="absolute top-3 right-3 z-20">
                <button
                  onClick={() => toggleFollow(post.username)}
                  className={`flex items-center space-x-1 px-3 py-1.5 rounded-xl text-xs font-bold transition shadow-sm ${
                    isFollowingUser
                      ? 'bg-white/90 text-gray-600 border border-gray-200 hover:bg-gray-100'
                      : 'bg-pink-500 text-white hover:bg-pink-600'
                  }`}
                >
                  {isFollowingUser ? (
                    <>
                      <UserCheck size={14} />
                      <span>Following</span>
                    </>
                  ) : (
                    <>
                      <UserPlus size={14} />
                      <span>Follow</span>
                    </>
                  )}
                </button>
              </div>
              <Post post={post} isExplore={true} />
            </div>
          );
        })}
      </div>
    </div>
  );
}