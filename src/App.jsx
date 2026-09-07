import Sidebarr from './components/Sidebarr.jsx';
import Stories from './components/Stories.jsx';
import Post from './components/Post.jsx';
import Profile from './components/Profile.jsx';
import Explore from './components/Explore.jsx';
import Updates from './components/updates.jsx';
import SuggestedUsers from './components/SuggestedUsers.jsx';
import NotesFeature from './components/NotesFeature.jsx';
import { useAppStore } from './storef/useAppStore.js';

export default function App() {
  const { posts, activePage, activeStory, setActiveStory } = useAppStore();

  const renderContent = () => {
    switch (activePage) {
      case 'profile':
        return <Profile />;
      case 'explore':
        return <Explore />;
      case 'notifications':
        return <Updates />;
      case 'saved':
        return (
          <div className="w-full max-w-[530px]">
            <h2 className="text-lg font-bold text-gray-900 mb-4 bg-white/90 backdrop-blur-md p-4 rounded-3xl border border-pink-200/70 text-center shadow-sm">
              Saved Posts
            </h2>
            {posts.filter((p) => p.is_saved).map((post) => (
              <Post key={post.id} post={post} />
            ))}
          </div>
        );
      case 'home':
      default:
        return (
          <div className="w-full max-w-[530px]">
            <NotesFeature />
            <Stories />
            {posts.map((post) => (
              <Post key={post.id} post={post} />
            ))}
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-rose-50 to-purple-100 flex relative overflow-x-hidden font-sans">
      <div className="fixed top-[-10%] left-[20%] w-[500px] h-[500px] bg-pink-300/30 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed bottom-[-10%] right-[10%] w-[600px] h-[600px] bg-purple-300/20 rounded-full blur-3xl pointer-events-none" />

      <Sidebarr />

      <div className="pl-64 w-full flex justify-center py-8 px-6 z-10">
        <main className="max-w-5xl w-full flex justify-center items-start">
          {renderContent()}
          {activePage === 'home' && <SuggestedUsers />}
        </main>
      </div>



      {activeStory && (
        <div
          onClick={() => setActiveStory(null)}
          className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4 cursor-pointer"
        >
          <div className="relative max-w-sm w-full bg-black rounded-3xl overflow-hidden shadow-2xl border border-pink-300/30">
            <img src={activeStory.storyImage || activeStory.avatar} alt="" className="w-full h-[500px] object-cover" />
            <div className="absolute top-4 left-4 flex items-center space-x-3 bg-black/40 backdrop-blur-sm px-3 py-1.5 rounded-full">
              <img src={activeStory.avatar} alt="" className="w-8 h-8 rounded-full ring-2 ring-pink-400" />
              <span className="text-white text-xs font-bold">{activeStory.username}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}