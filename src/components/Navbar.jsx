import { Home, Compass, Heart, PlusSquare, Search } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 z-50 flex items-center justify-between px-6 md:px-20">
      <h1 className="text-2xl font-bold tracking-tight font-serif cursor-pointer">Candid</h1>
      
      <div className="hidden sm:flex items-center bg-gray-100 px-3 py-1.5 rounded-lg text-gray-500 w-64 border border-gray-200">
        <Search size={16} className="mr-2 text-gray-400" />
        <input 
          type="text" 
          placeholder="Search Candid" 
          className="bg-transparent outline-none text-sm w-full text-gray-800 placeholder-gray-400" 
        />
      </div>

      <div className="flex items-center space-x-5 text-gray-700">
        <Home size={22} className="cursor-pointer hover:text-black transition" />
        <Compass size={22} className="cursor-pointer hover:text-black transition" />
        <PlusSquare size={22} className="cursor-pointer hover:text-black transition" />
        <Heart size={22} className="cursor-pointer hover:text-black transition" />
        <img 
          src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150" 
          alt="Profile" 
          className="w-7 h-7 rounded-full object-cover cursor-pointer ring-2 ring-gray-200"
        />
      </div>
    </nav>
  );
}