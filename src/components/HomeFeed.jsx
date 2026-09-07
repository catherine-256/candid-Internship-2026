import { useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { useAppStore } from '../storef/useAppStore';
import Post from './Post';
import Stories from './Stories';

export default function HomeFeed() {
  const { posts, fetchHomeFeed, isLoading } = useAppStore();

  useEffect(() => {
    fetchHomeFeed();
  }, [fetchHomeFeed]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-pink-500 space-y-3">
        <Loader2 className="animate-spin" size={32} />
        <p className="text-xs font-bold tracking-wide">Fetching Live Feed...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 w-full max-w-xl">
      <Stories />
      <div className="space-y-6">
        {posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}