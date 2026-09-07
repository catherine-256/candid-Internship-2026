import { useState } from 'react';
import { Send, Sparkles } from 'lucide-react';
import { useAppStore } from '../storef/useAppStore';

export default function NotesFeature() {
  const [noteText, setNoteText] = useState('');
  const { userNotes, addNote, userProfile } = useAppStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!noteText.trim()) return;
    addNote(noteText.trim());
    setNoteText('');
  };

  return (
    <div className="bg-gradient-to-r from-pink-50 via-white to-purple-50 backdrop-blur-md border border-pink-200/80 rounded-3xl p-4 shadow-sm mb-6">
      <div className="flex items-center space-x-2 mb-3">
        <Sparkles size={16} className="text-pink-500 animate-pulse" />
        <h3 className="text-xs font-bold text-gray-800 uppercase tracking-wider">What's on your mind?</h3>
      </div>

      <form onSubmit={handleSubmit} className="flex items-center space-x-3">
        <img
          src={userProfile.avatar}
          alt={userProfile.username}
          className="w-9 h-9 rounded-full object-cover ring-2 ring-pink-400"
        />

        
        <div className="flex-1 flex items-center bg-white/90 border border-pink-200 rounded-2xl px-4 py-2 shadow-inner focus-within:ring-2 focus-within:ring-pink-400 transition">
          <input
            type="text"
            placeholder="Share a quick thought..."
            className="w-full text-xs text-gray-800 bg-transparent outline-none placeholder-pink-300 font-medium"
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
            maxLength={100}
          />
          <button
            type="submit"
            disabled={!noteText.trim()}
            className="text-pink-500 hover:text-pink-600 disabled:opacity-30 transition ml-2"
          >
            <Send size={16} />
          </button>
        </div>
      </form>



      {userNotes.length > 0 && (
        <div className="mt-3 pt-3 border-t border-pink-100 flex gap-2 overflow-x-auto pb-1 scrollbar-none">
          {userNotes.map((note) => (
            <div
              key={note.id}
              className="bg-white border border-pink-200/80 shadow-sm rounded-2xl px-3 py-2 flex-shrink-0 max-w-[220px] relative group"
            >
              <p className="text-xs text-gray-800 font-semibold italic">"{note.text}"</p>
              <span className="text-[9px] text-pink-400 block text-right mt-1 font-bold">{note.time}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}