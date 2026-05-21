import { AlertTriangle, Calendar, CheckCircle, Clock, Trash, XCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import Spinner from '../components/Spinner';
import api from '../utils/api';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showCancelModal, setShowCancelModal] = useState(false);

  const fetchBookings = async () => {
    try {
      const response = await api.get('/bookings/my-bookings');
      setBookings(response.data);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      toast.error('Failed to load bookings');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    document.title = 'StudyNook – My Bookings';
    fetchBookings();
  }, []);

  const handleCancelClick = (booking) => {
    setSelectedBooking(booking);
    setShowCancelModal(true);
  };

  const handleConfirmCancel = async () => {
    if (!selectedBooking) return;
    try {
      await api.patch(`/bookings/${selectedBooking._id}/cancel`);
      toast.success('Booking cancelled successfully');
      setShowCancelModal(false);
      setSelectedBooking(null);
      fetchBookings();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to cancel booking');
    }
  };

  const isCancellable = (booking) => {
    if (booking.status !== 'confirmed') return false;
    const bDate = new Date(booking.date);
    bDate.setHours(0, 0, 0, 0);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return bDate >= today;
  };

  const formatDate = (dateStr) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateStr).toLocaleDateString(undefined, options).toUpperCase();
  };

  if (loading) return <Spinner />;

  return (
    <div className="max-w-[95vw] mx-auto px-4 md:px-8 py-12 font-['Space_Grotesk',_sans-serif] text-slate-950 dark:text-[#FAFAFA] transition-colors duration-200">
      <div className="mb-10 border-b border-slate-200 dark:border-b dark:border-[#3F3F46] pb-5 space-y-2">
        <div className="flex items-center gap-2 text-[#EAB308] dark:text-[#DFE104] font-bold text-sm tracking-widest uppercase">
          <Calendar className="w-5 h-5 stroke-[2.5]" />
          <span>// My Reservations</span>
        </div>
        <h1 className="text-4xl font-black text-slate-950 dark:text-white tracking-tighter uppercase">
          My Room Bookings
        </h1>
        <p className="text-xs text-slate-600 dark:text-[#A1A1AA] uppercase font-medium font-sans">
          View details of active study spaces you booked. Cancel future sessions if plans change.
        </p>
      </div>

      {bookings.length === 0 ? (
        <div className="flex flex-col md:flex-row-reverse items-center justify-center gap-12 py-20 px-6">
          <div className="w-[300px] h-[300px] md:w-[400px] md:h-[400px] shrink-0">
            <img src="/calendar.svg" alt="No bookings" className="w-full h-full object-contain" />
          </div>

          <div className="text-center md:text-left max-w-md">
            <h3 className="text-3xl font-black text-slate-950 dark:text-white uppercase tracking-tighter">
              You have no bookings yet
            </h3>
            <p className="text-sm text-slate-600 dark:text-[#A1A1AA] mt-3 mb-8 font-sans">
              Explore available study rooms to secure your first workspace for your upcoming academic sessions.
            </p>
            <Link
              to="/rooms"
              className="inline-block px-8 py-4 bg-slate-950 text-white font-black uppercase text-sm tracking-wider border border-transparent hover:bg-[#EAB308] hover:text-black transition-colors duration-150 dark:bg-white dark:text-black dark:hover:bg-[#DFE104]"
            >
              Explore Study Rooms
            </Link>
          </div>
        </div>
      ) : (
        <div className="bg-white border border-slate-200 overflow-hidden dark:bg-[#09090B] dark:border dark:border-[#3F3F46]">
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-100 border-b border-slate-200 text-slate-600 text-xs font-bold uppercase tracking-widest dark:bg-[#18181B] dark:border-b dark:border-[#3F3F46] dark:text-[#A1A1AA]">
                  <th className="py-4 px-6 border-r-4 border-slate-200 dark:border-r-2 dark:border-[#3F3F46]">Room Name</th>
                  <th className="py-4 px-6 border-r-4 border-slate-200 dark:border-r-2 dark:border-[#3F3F46]">Booking Date</th>
                  <th className="py-4 px-6 border-r-4 border-slate-200 dark:border-r-2 dark:border-[#3F3F46]">Duration Slot</th>
                  <th className="py-4 px-6 border-r-4 border-slate-200 dark:border-r-2 dark:border-[#3F3F46]">Total Cost</th>
                  <th className="py-4 px-6 border-r-4 border-slate-200 dark:border-r-2 dark:border-[#3F3F46]">Status</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y-4 divide-slate-950 dark:divide-y-2 dark:divide-[#3F3F46]">
                {bookings.map((booking) => {
                  const cancelActive = isCancellable(booking);
                  return (
                    <tr key={booking._id} className="hover:bg-slate-50 dark:hover:bg-[#18181B]/40 transition-colors">
                      <td className="py-4 px-6 border-r-4 border-slate-200 dark:border-r-2 dark:border-[#3F3F46] flex items-center gap-4">
                        <div className="w-14 h-10 bg-slate-100 border border-slate-200 overflow-hidden shrink-0 dark:bg-[#18181B] dark:border-[#3F3F46]">
                          {booking.room?.image ? (
                            <img
                              src={booking.room.image}
                              alt={booking.room.name}
                              className="w-full h-full object-cover filter grayscale contrast-125"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-[10px] font-bold text-slate-400 dark:text-[#A1A1AA]">NO IMG</div>
                          )}
                        </div>
                        <div>
                          <span className="text-base font-bold text-slate-950 block uppercase tracking-tight dark:text-white">{booking.room?.name}</span>
                          <span className="text-xs text-slate-500 dark:text-[#A1A1AA] uppercase font-bold">Floor {booking.room?.floor}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6 border-r-4 border-slate-200 dark:border-r-2 dark:border-[#3F3F46] text-sm font-bold uppercase text-slate-950 dark:text-[#FAFAFA]">
                        {formatDate(booking.date)}
                      </td>
                      <td className="py-4 px-6 border-r-4 border-slate-200 dark:border-r-2 dark:border-[#3F3F46] text-sm font-bold uppercase text-slate-950 dark:text-[#FAFAFA]">
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-4 h-4 text-[#EAB308] dark:text-[#DFE104]" />
                          <span>{booking.startTime} - {booking.endTime}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6 border-r-4 border-slate-200 dark:border-r-2 dark:border-[#3F3F46] text-base font-black text-slate-950 tracking-tight dark:text-white">
                        ${booking.totalCost}
                      </td>
                      <td className="py-4 px-6 border-r-4 border-slate-200 dark:border-r-2 dark:border-[#3F3F46]">
                        {booking.status === 'confirmed' ? (
                          <span className="inline-flex items-center gap-1.5 text-xs font-black bg-[#EAB308] text-black px-2.5 py-1 border border-black uppercase tracking-tight dark:bg-[#DFE104]">
                            <CheckCircle className="w-3.5 h-3.5 stroke-[2.5]" /> Confirmed
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 text-xs font-black bg-slate-200 text-slate-600 px-2.5 py-1 border border-slate-100 uppercase tracking-tight dark:bg-[#27272A] dark:text-[#A1A1AA] dark:border-[#3F3F46]">
                            <XCircle className="w-3.5 h-3.5 stroke-[2.5]" /> Cancelled
                          </span>
                        )}
                      </td>
                      <td className="py-4 px-6 text-right">
                        {cancelActive && (
                          <button
                            onClick={() => handleCancelClick(booking)}
                            className="px-4 py-2 text-xs font-bold text-white bg-slate-950 hover:bg-red-600 hover:text-white active:scale-95 transition-all duration-150 uppercase tracking-tight border border-transparent dark:bg-white dark:text-black dark:hover:bg-red-600 dark:hover:text-white"
                          >
                            Cancel Booking
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="md:hidden divide-y-4 divide-slate-950 dark:divide-y-2 dark:divide-[#3F3F46]">
            {bookings.map((booking) => {
              const cancelActive = isCancellable(booking);
              return (
                <div key={booking._id} className="p-6 space-y-5 bg-white dark:bg-[#09090B]">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-12 bg-slate-100 border border-slate-200 overflow-hidden shrink-0 dark:bg-[#18181B] dark:border-[#3F3F46]">
                      {booking.room?.image ? (
                        <img
                          src={booking.room.image}
                          alt={booking.room.name}
                          className="w-full h-full object-cover filter grayscale contrast-125"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-[10px] font-bold text-slate-400 dark:text-[#A1A1AA]">NO IMG</div>
                      )}
                    </div>
                    <div>
                      <h3 className="text-base font-black text-slate-950 uppercase tracking-tight dark:text-white">{booking.room?.name}</h3>
                      <p className="text-xs text-slate-500 dark:text-[#A1A1AA] font-bold uppercase tracking-wider">Floor {booking.room?.floor}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-xs border-t border-b border-slate-200 py-4 dark:border-t dark:border-b dark:border-[#3F3F46]">
                    <div>
                      <p className="text-[10px] text-slate-500 dark:text-[#A1A1AA] uppercase font-bold tracking-widest">// Booking Date</p>
                      <p className="font-bold text-slate-950 uppercase tracking-tight mt-1 dark:text-white">{formatDate(booking.date)}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-500 dark:text-[#A1A1AA] uppercase font-bold tracking-widest">// Time Slot</p>
                      <p className="font-bold text-slate-950 uppercase tracking-tight mt-1 dark:text-white">{booking.startTime} - {booking.endTime}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-[10px] text-slate-500 dark:text-[#A1A1AA] uppercase font-bold tracking-widest">// Total Cost</p>
                      <p className="text-xl font-black text-slate-950 tracking-tighter mt-0.5 dark:text-white">${booking.totalCost}</p>
                    </div>

                    <div className="flex items-center gap-3">
                      {booking.status === 'confirmed' ? (
                        <span className="inline-flex items-center text-[10px] font-black bg-[#EAB308] text-black px-2 py-1 uppercase tracking-wider dark:bg-[#DFE104]">
                          Confirmed
                        </span>
                      ) : (
                        <span className="inline-flex items-center text-[10px] font-black bg-slate-200 text-slate-600 px-2 py-1 uppercase tracking-wider border border-slate-100 dark:bg-[#27272A] dark:text-[#A1A1AA] dark:border-[#3F3F46]">
                          Cancelled
                        </span>
                      )}

                      {cancelActive && (
                        <button
                          onClick={() => handleCancelClick(booking)}
                          className="p-2 text-slate-950 bg-transparent border border-slate-200 hover:bg-red-600 hover:border-red-600 hover:text-white active:scale-95 transition-all duration-150 dark:text-white dark:border-[#3F3F46] dark:hover:bg-red-600 dark:hover:border-red-600"
                          aria-label="Cancel booking"
                        >
                          <Trash className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {showCancelModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/80 backdrop-blur-xs" onClick={() => setShowCancelModal(false)}></div>

          <div className="bg-white border border-slate-200 w-full max-w-md p-8 relative shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] z-10 text-center transition-all duration-200 dark:bg-[#09090B] dark:border dark:border-[#3F3F46] dark:shadow-none">
            <div className="w-12 h-12 bg-red-600 flex items-center justify-center text-white border border-slate-200 mx-auto mb-6 dark:text-black dark:border-black">
              <AlertTriangle className="w-6 h-6 stroke-[2.5]" />
            </div>

            <h2 className="text-2xl font-black text-slate-950 uppercase tracking-tighter mb-2 dark:text-white">Cancel Reservation?</h2>
            <p className="text-sm text-slate-600 uppercase font-medium font-sans leading-tight mb-8 dark:text-[#A1A1AA]">
              Are you sure you want to cancel this study room reservation? This will free up the time slot for other learners.
            </p>

            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => setShowCancelModal(false)}
                className="py-3 border border-slate-200 hover:bg-slate-100 text-slate-950 font-bold text-sm uppercase tracking-wider active:scale-95 transition-all duration-150 dark:border-[#3F3F46] dark:hover:bg-[#18181B] dark:text-white"
              >
                Go Back
              </button>
              <button
                onClick={handleConfirmCancel}
                className="py-3 bg-red-600 hover:bg-red-700 text-white font-bold text-sm uppercase tracking-wider active:scale-95 transition-all duration-150 border border-transparent"
              >
                Confirm Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyBookings;