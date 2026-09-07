import { Plus } from 'lucide-react';
import { useAppStore } from '../storef/useAppStore';

export default function Stories() {
  const { stories, setActiveStory, addUserStory } = useAppStore();

  const handleAddStory = (e) => {
    e.stopPropagation();
    const url = prompt('Enter image URL for your story:');
    if (url) {
      addUserStory(url);
    }
  };

  return (
    <div className="bg-white/90 backdrop-blur-md border border-pink-200/70 rounded-3xl p-4 shadow-sm mb-6 flex space-x-4 overflow-x-auto scrollbar-none">
      {stories.map((story) => (
        <div
          key={story.id}
          onClick={() => story.hasStory && setActiveStory(story)}
          className="flex flex-col items-center flex-shrink-0 cursor-pointer group"
        >
          <div
            className={`relative p-0.5 rounded-full transition duration-300 ${
              story.hasStory
                ? 'bg-gradient-to-tr from-pink-500 via-rose-400 to-purple-500 group-hover:scale-105'
                : 'bg-gray-200'
            }`}
          >
            <img
              src={story.avatar}
              alt={story.username}
              className="w-16 h-16 rounded-full object-cover ring-2 ring-white"
            />
            {story.isUser && (
              <button
                onClick={handleAddStory}
                className="absolute bottom-0 right-0 bg-pink-500 text-white p-1 rounded-full border-2 border-white hover:bg-pink-600 transition shadow-sm"
              >
                <Plus size={12} />
              </button>
            )}
          </div>
          <span className="text-[11px] font-bold text-gray-700 mt-1.5 truncate max-w-[68px]">
            {story.username}
          </span>
        </div>
      ))}
    </div>
  );
}