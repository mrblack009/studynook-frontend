import { BookOpen, RotateCcw, Search, SlidersHorizontal } from 'lucide-react';
import { useEffect, useState } from 'react';
import RoomCard from '../components/RoomCard';
import Spinner from '../components/Spinner';
import api from '../utils/api';

const Rooms = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [floor, setFloor] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const amenitiesOptions = ['Whiteboard', 'Projector', 'Wi-Fi', 'Power Outlets', 'Quiet Zone', 'Air Conditioning'];

  const fetchRooms = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.append('search', search);
      if (selectedAmenities.length > 0) params.append('amenities', selectedAmenities.join(','));
      if (floor) params.append('floor', floor);
      if (minPrice) params.append('minPrice', minPrice);
      if (maxPrice) params.append('maxPrice', maxPrice);

      const response = await api.get(`/rooms?${params.toString()}`);
      setRooms(response.data);
    } catch (error) {
      console.error('Error fetching rooms:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    document.title = 'StudyNook | Available Rooms';
    fetchRooms();
  }, [search, selectedAmenities, floor, minPrice, maxPrice]);

  const handleAmenityChange = (amenity) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity)
        ? prev.filter((a) => a !== amenity)
        : [...prev, amenity]
    );
  };

  const handleResetFilters = () => {
    setSearch('');
    setSelectedAmenities([]);
    setFloor('');
    setMinPrice('');
    setMaxPrice('');
  };

  return (
    <div className="w-full min-h-screen bg-white text-slate-950 dark:bg-[#09090B] dark:text-[#FAFAFA] font-['Space_Grotesk',_sans-serif] transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        <div className="space-y-2 mb-10 pb-6 border-b border-slate-200 dark:border-[#3F3F46]">
          <h1 className="text-4xl sm:text-5xl font-black tracking-tighter uppercase leading-none">
            Explore Study Rooms
          </h1>
          <p className="text-xs uppercase font-bold text-slate-500 tracking-wider dark:text-[#A1A1AA]">
            Find and book perfect spaces suited for private focus sessions or creative group collaborations.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          <aside className="bg-white border border-slate-200 p-6 space-y-6 lg:sticky lg:top-28 dark:bg-[#09090B] dark:border dark:border-[#3F3F46]">
            <div className="flex items-center justify-between border-b border-slate-200 pb-4 dark:border-[#3F3F46]">
              <div className="flex items-center gap-2 font-black text-slate-950 uppercase tracking-wider text-sm dark:text-white">
                <SlidersHorizontal className="w-4 h-4 stroke-[2.5]" />
                <span>Filters</span>
              </div>
              <button
                onClick={handleResetFilters}
                className="text-xs font-black uppercase bg-slate-100 hover:bg-slate-200 text-slate-950 px-2.5 py-1 border border-slate-200 flex items-center gap-1 transition-colors dark:bg-[#18181B] dark:border-[#3F3F46] dark:text-white dark:hover:bg-[#27272A]"
              >
                <RotateCcw className="w-3 h-3 stroke-[2.5]" /> Reset
              </button>
            </div>

            <div className="space-y-1.5">
              <label className="block text-[10px] font-black text-slate-500 dark:text-[#A1A1AA] uppercase tracking-widest">
                Search Name
              </label>
              <div className="relative">
                <Search className="w-4.5 h-4.5 text-slate-950 absolute left-3.5 top-1/2 -translate-y-1/2 z-10 dark:text-white" />
                <input
                  type="text"
                  placeholder="SEARCH ROOMS..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 text-xs font-black uppercase tracking-wider text-slate-950 placeholder-slate-400 focus:outline-none dark:bg-[#18181B] dark:border-[#3F3F46] dark:text-white"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-[10px] font-black text-slate-500 dark:text-[#A1A1AA] uppercase tracking-widest">
                Hourly Price Range ($)
              </label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="number"
                  placeholder="MIN"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 text-xs font-black uppercase tracking-wider text-slate-950 placeholder-slate-400 focus:outline-none dark:bg-[#18181B] dark:border-[#3F3F46] dark:text-white"
                />
                <input
                  type="number"
                  placeholder="MAX"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 text-xs font-black uppercase tracking-wider text-slate-950 placeholder-slate-400 focus:outline-none dark:bg-[#18181B] dark:border-[#3F3F46] dark:text-white"
                />
              </div>
            </div>
            
            <div className="space-y-1.5">
              <label className="block text-[10px] font-black text-slate-500 dark:text-[#A1A1AA] uppercase tracking-widest">
                Floor Level
              </label>
              <select
                value={floor}
                onChange={(e) => setFloor(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 text-xs font-black uppercase tracking-wider text-slate-950 focus:outline-none dark:bg-[#18181B] dark:border-[#3F3F46] dark:text-white"
              >
                <option value="" className="text-black bg-white">ALL FLOORS</option>
                <option value="1st Floor" className="text-black bg-white">1ST FLOOR</option>
                <option value="2nd Floor" className="text-black bg-white">2ND FLOOR</option>
                <option value="3rd Floor" className="text-black bg-white">3RD FLOOR</option>
                <option value="4th Floor" className="text-black bg-white">4TH FLOOR</option>
                <option value="5th Floor" className="text-black bg-white">5TH FLOOR</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-[10px] font-black text-slate-500 dark:text-[#A1A1AA] uppercase tracking-widest">
                Amenities
              </label>
              <div className="space-y-2.5 pt-1">
                {amenitiesOptions.map((amenity) => (
                  <label
                    key={amenity}
                    className="flex items-center gap-3 text-xs font-black uppercase tracking-wide cursor-pointer text-slate-800 hover:text-slate-950 dark:text-[#A1A1AA] dark:hover:text-white"
                  >
                    <input
                      type="checkbox"
                      checked={selectedAmenities.includes(amenity)}
                      onChange={() => handleAmenityChange(amenity)}
                      className="w-4 h-4 rounded-none border border-slate-200 accent-black dark:border-[#3F3F46] dark:accent-[#DFE104]"
                    />
                    <span>{amenity}</span>
                  </label>
                ))}
              </div>
            </div>
          </aside>

          <main className="lg:col-span-3">
            {loading ? (
              <Spinner />
            ) : rooms.length === 0 ? (
              <div className="text-center py-20 bg-white border border-slate-200 flex flex-col items-center dark:bg-[#09090B] dark:border dark:border-[#3F3F46]">
                <div className="w-16 h-16 border border-slate-200 bg-slate-100 flex items-center justify-center mb-4 dark:bg-[#18181B] dark:border-[#3F3F46]">
                  <BookOpen className="w-8 h-8 text-slate-950 dark:text-white stroke-[2.5]" />
                </div>
                <h3 className="text-lg font-black uppercase tracking-tight text-slate-950 dark:text-white">No rooms found</h3>
                <p className="text-xs uppercase font-bold text-slate-500 mt-1 dark:text-[#A1A1AA]">Try resetting your filters or search terms.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {rooms.map((room) => (
                  <RoomCard key={room._id} room={room} />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Rooms;