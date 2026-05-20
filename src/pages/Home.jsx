import { motion } from 'framer-motion';
import { ArrowRight, BookOpen, Calendar, Shield, Zap } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import RoomCard from '../components/RoomCard';
import Spinner from '../components/Spinner';
import api from '../utils/api';

const Home = () => {
  const [latestRooms, setLatestRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = 'StudyNook // HOME';
    const fetchLatestRooms = async () => {
      try {
        const response = await api.get('/rooms/latest');
        setLatestRooms(response.data);
      } catch (error) {
        console.error('Error fetching latest rooms:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchLatestRooms();
  }, []);

  return (
    <div className="bg-slate-50 space-y-24 pb-20 font-['Space_Grotesk',_sans-serif] select-none text-slate-950 dark:bg-[#09090B] dark:text-[#FAFAFA] transition-colors duration-200">

      <section
        className="relative pt-12 lg:pt-20 border-b border-slate-200 dark:border-b dark:border-[#3F3F46] pb-16 bg-white dark:bg-[#09090B] bg-[url('/herobg.jpg')] bg-cover bg-center before:absolute before:inset-0 before:bg-slate-900/80 dark:before:bg-[#18181B]/80 before:z-0"
      >
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: "spring", ease: "easeInOut", duration: 0.15, delay: 0.05 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tighter uppercase leading-[1.05] text-white"
              >
                Find Your Perfect <br />
                <span className="text-[#EAB308] inline-block mt-1 dark:text-[#DFE104]">
                  Study Room
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: "spring", ease: "easeInOut", duration: 0.15, delay: 0.1 }}
                className="text-base text-slate-200 max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium font-sans"
              >
                Browse and book quiet, private study rooms in your library. List your own room, schedule slots with active conflict checking, and learn efficiently.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: "spring", ease: "easeInOut", duration: 0.15, delay: 0.15 }}
                className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2"
              >
                <Link
                  to="/rooms"
                  className="w-full sm:w-auto h-14 px-8 flex items-center justify-center gap-2 bg-[#EAB308] text-black font-bold uppercase tracking-tighter text-base hover:bg-[#CA8A04] transition-colors duration-150"
                >
                  Explore Rooms
                  <ArrowRight className="w-5 h-5 stroke-[2.5]" />
                </Link>
                <a
                  href="#why-us"
                  className="w-full sm:w-auto h-14 px-8 flex items-center justify-center gap-2 border border-white/20 bg-transparent text-white font-bold uppercase tracking-tighter text-base hover:bg-white/10 transition-colors duration-150"
                >
                  How it Works
                </a>
              </motion.div>
            </div>

            <motion.div className="lg:col-span-5 relative flex justify-center">
              <div className="relative w-full max-w-md">
                <img
                  src="/study.svg"
                  alt="Studying"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-slate-200 dark:border-b dark:border-[#3F3F46] pb-6">
          <div className="space-y-2">
            <h2 className="text-3xl font-extrabold uppercase tracking-tighter text-slate-950 dark:text-[#FAFAFA]">
              Recently Listed Rooms
            </h2>
            <p className="text-sm text-slate-600 dark:text-[#A1A1AA] max-w-md font-medium font-sans">
              Secure your high productivity slot in one of these premium library study rooms listed recently.
            </p>
          </div>
          <Link
            to="/rooms"
            className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-tighter text-[#EAB308] hover:text-slate-950 dark:text-[#DFE104] dark:hover:text-[#FAFAFA] mt-4 md:mt-0 group transition-colors duration-150"
          >
            Browse All Rooms
            <ArrowRight className="w-4 h-4 stroke-[2.5]" />
          </Link>
        </div>

        {loading ? (
          <Spinner />
        ) : latestRooms.length === 0 ? (
          <div className="text-center py-16 bg-white border border-dashed border-slate-200 dark:bg-[#18181B] dark:border dark:border-[#3F3F46]">
            <BookOpen className="w-12 h-12 text-slate-300 dark:text-[#3F3F46] mx-auto mb-4 stroke-[2]" />
            <p className="text-slate-600 dark:text-[#A1A1AA] uppercase text-sm font-bold tracking-tighter">No rooms listed yet. Be the first to list!</p>
            <Link
              to="/add-room"
              className="inline-block mt-6 px-6 h-11 border border-black bg-[#EAB308] text-black font-bold uppercase text-xs tracking-wider flex items-center justify-center w-max mx-auto hover:bg-[#CA8A04] dark:bg-[#DFE104] dark:hover:bg-[#b8ba03] transition-colors"
            >
              Add Room
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {latestRooms.map((room) => (
              <RoomCard key={room._id} room={room} />
            ))}
          </div>
        )}
      </section>

      <section
        id="why-us"
        className="relative bg-white border-t border-b border-slate-200 py-20 dark:bg-[#18181B] dark:border-t dark:border-b dark:border-[#3F3F46] bg-[url('/featurebg.jpg')] bg-cover bg-center bg-fixed before:absolute before:inset-0 before:bg-slate-950/70 dark:before:bg-[#18181B]/85 before:z-0"
      >
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center space-y-3 mb-16">
            <span className="text-sm font-bold text-[#EAB308] uppercase tracking-widest px-3 py-1 dark:text-[#DFE104]">
        // ENGINEERED FOR FOCUS
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-tighter text-white dark:text-[#FAFAFA]">
              Why Students Love StudyNook
            </h2>
            <p className="text-sm text-slate-200 dark:text-[#A1A1AA] max-w-lg mx-auto font-medium font-sans">
              Our platform brings enterprise grade scheduling logic to campus study spaces, removing administrative delays.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/80 p-8 border border-slate-200 flex flex-col items-start gap-4 dark:bg-[#09090B]/80 dark:border-[#3F3F46]">
              <div className="w-12 h-12 bg-slate-100/50 border border-slate-200 flex items-center justify-center text-[#EAB308] dark:bg-[#18181B]/50 dark:border-[#3F3F46] dark:text-[#DFE104]">
                <Shield className="w-6 h-6 stroke-[2.5]" />
              </div>
              <h3 className="text-lg font-bold uppercase tracking-tighter text-slate-950 dark:text-[#FAFAFA]">Conflict-Free Bookings</h3>
              <p className="text-sm text-slate-700 dark:text-[#A1A1AA] leading-relaxed font-medium font-sans">
                Advanced slot bound checking ensures no two users can book overlapping time slots. Avoid study schedule conflicts completely.
              </p>
            </div>

            <div className="bg-white/80 p-8 border border-slate-200 flex flex-col items-start gap-4 dark:bg-[#09090B]/80 dark:border-[#3F3F46]">
              <div className="w-12 h-12 bg-slate-100/50 border border-slate-200 flex items-center justify-center text-[#EAB308] dark:bg-[#18181B]/50 dark:border-[#3F3F46] dark:text-[#DFE104]">
                <Calendar className="w-6 h-6 stroke-[2.5]" />
              </div>
              <h3 className="text-lg font-bold uppercase tracking-tighter text-slate-950 dark:text-[#FAFAFA]">Seamless Room Control</h3>
              <p className="text-sm text-slate-700 dark:text-[#A1A1AA] leading-relaxed font-medium font-sans">
                Control private study spaces easily. List available spaces, specify seats, floor locations, price rates, and manage bookings instantly.
              </p>
            </div>

            <div className="bg-white/80 p-8 border border-slate-200 flex flex-col items-start gap-4 dark:bg-[#09090B]/80 dark:border-[#3F3F46]">
              <div className="w-12 h-12 bg-slate-100/50 border border-slate-200 flex items-center justify-center text-[#EAB308] dark:bg-[#18181B]/50 dark:border-[#3F3F46] dark:text-[#DFE104]">
                <Zap className="w-6 h-6 stroke-[2.5]" />
              </div>
              <h3 className="text-lg font-bold uppercase tracking-tighter text-slate-950 dark:text-[#FAFAFA]">Persistent JWT Auth</h3>
              <p className="text-sm text-slate-700 dark:text-[#A1A1AA] leading-relaxed font-medium font-sans">
                Experience enterprise grade authentication. Secure HTTP only cookies prevent token tampering, keeping user data safe.
              </p>
            </div>
          </div>

        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-16">
          <span className="text-sm font-bold text-[#EAB308] uppercase tracking-widest px-3 py-1 dark:text-[#DFE104]">
            // COMMUNITY STORIES
          </span>
          <h2 className="text-3xl font-extrabold uppercase tracking-tighter text-slate-950 dark:text-[#FAFAFA]">
            Loved by Campus Innovators
          </h2>
          <p className="text-sm text-slate-600 dark:text-[#A1A1AA] max-w-md mx-auto font-medium font-sans">
            Discover how students improve their study groups and grades using StudyNook.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white p-6 border border-slate-200 flex flex-col justify-between dark:bg-[#18181B] dark:border dark:border-[#3F3F46]">
            <p className="text-sm text-slate-800 dark:text-[#FAFAFA] font-medium font-sans leading-relaxed mb-6">
              "Booking library group study rooms used to be a nightmare with overlapping emails and schedule conflicts. StudyNook resolved this completely. My study group holds regular sessions without conflict."
            </p>
            <div className="flex items-center gap-3 border-t border-slate-200 pt-4 bg-slate-50 -mx-6 -mb-6 p-4 dark:border-[#3F3F46] dark:bg-[#09090B]">
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&q=80"
                alt="Sarah Jenkins"
                className="w-10 h-10 object-cover grayscale border border-slate-200 dark:border-[#3F3F46]"
              />
              <div>
                <h4 className="text-sm font-bold uppercase tracking-tighter text-slate-950 dark:text-[#FAFAFA]">Sarah Jenkins</h4>
                <p className="text-[10px] font-bold uppercase text-slate-500 dark:text-[#A1A1AA] tracking-tight">Software Engineering Student</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 border border-slate-200 flex flex-col justify-between dark:bg-[#18181B] dark:border dark:border-[#3F3F46]">
            <p className="text-sm text-slate-800 dark:text-[#FAFAFA] font-medium font-sans leading-relaxed mb-6">
              "Listing my controlled seminar room on StudyNook allowed other students to utilize the space during hours I am in class. The hourly rate system provides extra budget for books!"
            </p>
            <div className="flex items-center gap-3 border-t border-slate-200 pt-4 bg-slate-50 -mx-6 -mb-6 p-4 dark:border-[#3F3F46] dark:bg-[#09090B]">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&q=80"
                alt="Alex Rivera"
                className="w-10 h-10 object-cover grayscale border border-slate-200 dark:border-[#3F3F46]"
              />
              <div>
                <h4 className="text-sm font-bold uppercase tracking-tighter text-slate-950 dark:text-[#FAFAFA]">Alex Rivera</h4>
                <p className="text-[10px] font-bold uppercase text-slate-500 dark:text-[#A1A1AA] tracking-tight">Research Assistant</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 border border-slate-200 flex flex-col justify-between dark:bg-[#18181B] dark:border dark:border-[#3F3F46]">
            <p className="text-sm text-slate-800 dark:text-[#FAFAFA] font-medium font-sans leading-relaxed mb-6">
              "The design theme is incredibly polished! I love switching between Dark/Light mode depending on late night cramming. Conflict checking is reliable and super quick."
            </p>
            <div className="flex items-center gap-3 border-t border-slate-200 pt-4 bg-slate-50 -mx-6 -mb-6 p-4 dark:border-[#3F3F46] dark:bg-[#09090B]">
              <img
                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=80&q=80"
                alt="Marcus Chen"
                className="w-10 h-10 object-cover grayscale border border-slate-200 dark:border-[#3F3F46]"
              />
              <div>
                <h4 className="text-sm font-bold uppercase tracking-tighter text-slate-950 dark:text-[#FAFAFA]">Marcus Chen</h4>
                <p className="text-[10px] font-bold uppercase text-slate-500 dark:text-[#A1A1AA] tracking-tight">Pre-Med Student</p>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;