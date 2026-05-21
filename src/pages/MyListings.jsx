import { List, PlusCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import RoomCard from '../components/RoomCard';
import Spinner from '../components/Spinner';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';

const MyListings = () => {
  const { user } = useAuth();
  const [myRooms, setMyRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = 'StudyNook – My Listings';
    const fetchMyRooms = async () => {
      try {
        const response = await api.get('/rooms');
        const filtered = response.data.filter(
          (room) => room.owner === user?._id || room.owner?._id === user?._id
        );
        setMyRooms(filtered);
      } catch (error) {
        console.error('Error fetching my rooms:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchMyRooms();
    }
  }, [user]);

  if (loading) return <Spinner />;

  return (
    <div className="max-w-[95vw] mx-auto px-4 md:px-8 py-12 font-['Space_Grotesk',_sans-serif] text-slate-950 dark:text-[#FAFAFA] transition-colors duration-200">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-10 border-b border-slate-200 dark:border-b dark:border-[#3F3F46] pb-5 gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-[#EAB308] dark:text-[#DFE104] font-bold text-sm tracking-widest uppercase">
            <List className="w-5 h-5 stroke-[2.5]" />
            <span>Manage Listings</span>
          </div>
          <h1 className="text-4xl font-black text-slate-950 dark:text-white tracking-tighter uppercase">
            My Study Rooms
          </h1>
          <p className="text-xs text-slate-600 dark:text-[#A1A1AA] uppercase font-medium font-sans">
            Control the listings you created. Update room details, price values, or delete study spaces.
          </p>
        </div>
        <Link
          to="/add-room"
          className="group inline-flex items-center justify-center gap-3 px-6 py-4 bg-[#EAB308] text-black font-black uppercase tracking-tight border border-black hover:scale-105 active:scale-95 transition-transform duration-200 shrink-0 text-base dark:bg-[#DFE104]"
        >
          <PlusCircle className="w-5 h-5 stroke-[2.5]" />
          <span>Add Study Room</span>
        </Link>
      </div>

      {myRooms.length === 0 ? (
        <div className="flex flex-col md:flex-row-reverse items-center justify-center gap-12 py-20 px-6">
          <div className="w-[300px] h-[300px] md:w-[400px] md:h-[400px] shrink-0">
            <img src="/list.svg" alt="No listings" className="w-full h-full object-contain" />
          </div>

          <div className="text-center md:text-left max-w-md">
            <h3 className="text-3xl font-black text-slate-950 dark:text-white uppercase tracking-tighter">
              No active listings
            </h3>
            <p className="text-sm text-slate-600 dark:text-[#A1A1AA] mt-3 mb-8 font-sans">
              You have not added any study rooms to the platform yet.
              Start by creating your first listing to manage your space.
            </p>
            <Link
              to="/add-room"
              className="inline-block px-8 py-4 bg-slate-950 text-white font-black uppercase text-sm tracking-wider border border-transparent hover:bg-[#EAB308] hover:text-black transition-colors duration-150 dark:bg-white dark:text-black dark:hover:bg-[#DFE104]"
            >
              Create Your First Listing
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {myRooms.map((room) => (
            <RoomCard key={room._id} room={room} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyListings;