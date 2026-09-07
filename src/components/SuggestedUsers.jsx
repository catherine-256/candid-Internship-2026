import { useAppStore } from '../storef/useAppStore';

const suggestedList = [
  { id: 1, username: 'chidi_o', relation: 'Followed by somto_k', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150' },
  { id: 2, username: 'amara_c', relation: 'Suggested for you', img: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150' },
  { id: 3, username: 'ijeoma_v', relation: 'New to Candid', img: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150' }
];

export default function SuggestedUsers() {
  const { following, toggleFollow, setActivePage, userProfile } = useAppStore();

  return (
    <div className="hidden lg:block w-80 pl-8">
      <div 
        onClick={() => setActivePage('profile')}
        className="flex items-center justify-between mb-6 bg-white/80 backdrop-blur-md p-3.5 rounded-3xl border border-pink-200/60 shadow-sm cursor-pointer hover:bg-pink-50/50 transition"
      >
        <div className="flex items-center space-x-3">
          <img
            src={userProfile.avatar}
            alt={userProfile.username}
            className="w-11 h-11 rounded-full object-cover ring-2 ring-pink-400"
          />
          <div>
            <p className="font-bold text-sm text-gray-900">{userProfile.username}</p>
            <p className="text-xs text-pink-500 font-medium">{userProfile.fullName}</p>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center mb-3 px-1">
        <span className="text-xs font-bold text-pink-400 uppercase tracking-wider">Suggested for you</span>
        <button 
          onClick={() => setActivePage('explore')}
          className="text-xs font-bold text-pink-600 hover:text-pink-800 transition"
        >
          See All
        </button>
      </div>

      <div className="space-y-3 bg-white/80 backdrop-blur-md p-4 rounded-3xl border border-pink-200/60 shadow-sm">
        {suggestedList.map((user) => (
          <div key={user.id} className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img src={user.img} alt="" className="w-9 h-9 rounded-full object-cover" />
              <div>
                <p className="font-bold text-xs text-gray-900">{user.username}</p>
                <p className="text-[10px] text-pink-400">{user.relation}</p>
              </div>
            </div>
            <button
              onClick={() => toggleFollow(user.username)}
              className={`text-xs font-bold transition px-3 py-1.5 rounded-xl ${
                following[user.username]
                  ? 'bg-gray-100 text-gray-500'
                  : 'bg-pink-100 text-pink-600 hover:bg-pink-200'
              }`}
            >
              {following[user.username] ? 'Following' : 'Follow'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}