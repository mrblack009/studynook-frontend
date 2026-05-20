import { AlertTriangle, Check, DollarSign, Settings, Trash, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Spinner from '../components/Spinner';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';

const RoomDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);

  // Modal Toggles
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Booking Form States
  const [bookingDate, setBookingDate] = useState('');
  const [startTime, setStartTime] = useState('08:00');
  const [endTime, setEndTime] = useState('09:00');
  const [specialNote, setSpecialNote] = useState('');
  const [bookingCost, setBookingCost] = useState(0);

  // Edit Form States
  const [editName, setEditName] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editImage, setEditImage] = useState('');
  const [editFloor, setEditFloor] = useState('');
  const [editCapacity, setEditCapacity] = useState('');
  const [editHourlyRate, setEditHourlyRate] = useState('');
  const [editAmenities, setEditAmenities] = useState([]);

  const amenitiesOptions = ['Whiteboard', 'Projector', 'Wi-Fi', 'Power Outlets', 'Quiet Zone', 'Air Conditioning'];
  const timeSlots = [
    '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00',
    '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'
  ];

  const fetchRoomDetails = async () => {
    try {
      const response = await api.get(`/rooms/${id}`);
      setRoom(response.data);
      setEditName(response.data.name);
      setEditDescription(response.data.description);
      setEditImage(response.data.image);
      setEditFloor(response.data.floor);
      setEditCapacity(response.data.capacity);
      setEditHourlyRate(response.data.hourlyRate);
      setEditAmenities(response.data.amenities);
    } catch (error) {
      toast.error('Failed to load room details');
      navigate('/rooms');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRoomDetails();
  }, [id]);

  useEffect(() => {
    if (room) {
      document.title = `StudyNook | ${room.name}`;
    }
  }, [room]);

  useEffect(() => {
    if (room && startTime && endTime) {
      const start = Number(startTime.split(':')[0]);
      const end = Number(endTime.split(':')[0]);
      if (end > start) {
        setBookingCost((end - start) * room.hourlyRate);
      } else {
        setBookingCost(0);
      }
    }
  }, [startTime, endTime, room]);

  const isOwner = user && room && room.owner?._id === user._id;

  const handleDeleteRoom = async () => {
    try {
      await api.delete(`/rooms/${id}`);
      toast.success('Room deleted successfully');
      navigate('/my-listings');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to delete room');
    }
  };

  const handleEditRoomSubmit = async (e) => {
    e.preventDefault();
    if (!editName || !editDescription || !editImage || !editFloor || !editCapacity || !editHourlyRate) {
      toast.error('Please fill in all fields');
      return;
    }

    try {
      await api.put(`/rooms/${id}`, {
        name: editName,
        description: editDescription,
        image: editImage,
        floor: editFloor,
        capacity: Number(editCapacity),
        hourlyRate: Number(editHourlyRate),
        amenities: editAmenities,
      });
      toast.success('Room updated successfully');
      setShowEditModal(false);
      fetchRoomDetails();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update room');
    }
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    if (!bookingDate) {
      toast.error('Please select a booking date');
      return;
    }

    const start = Number(startTime.split(':')[0]);
    const end = Number(endTime.split(':')[0]);
    if (end <= start) {
      toast.error('End time must be after start time');
      return;
    }

    try {
      await api.post('/bookings', {
        roomId: room._id,
        date: bookingDate,
        startTime,
        endTime,
        specialNote,
      });
      toast.success('Room booked successfully!');
      setShowBookingModal(false);
      setBookingDate('');
      setStartTime('08:00');
      setEndTime('09:00');
      setSpecialNote('');
      fetchRoomDetails();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to book room');
    }
  };

  const handleAmenityToggle = (amenity) => {
    setEditAmenities((prev) =>
      prev.includes(amenity)
        ? prev.filter((a) => a !== amenity)
        : [...prev, amenity]
    );
  };

  if (loading) return <Spinner />;
  if (!room) return <div className="text-center py-20 font-['Space_Grotesk'] text-slate-500 uppercase font-bold text-sm tracking-wide">Room details not found.</div>;

  return (
    <div className="w-full min-h-screen bg-white text-slate-950 dark:bg-[#09090B] dark:text-[#FAFAFA] font-['Space_Grotesk',_sans-serif] transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

          <div className="lg:col-span-7 space-y-8">
            <div className="relative aspect-[16/10] bg-slate-100 border border-slate-200 dark:bg-[#18181B] dark:border dark:border-[#3F3F46]">
              <img
                src={room.image}
                alt={room.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-xs font-black text-slate-950 bg-slate-100 px-3 py-1.5 border border-slate-200 uppercase tracking-wider dark:text-white dark:bg-[#18181B] dark:border-[#3F3F46]">
                  Floor: {room.floor}
                </span>
                <span className="text-xs font-black text-slate-950 bg-slate-100 px-3 py-1.5 border border-slate-200 uppercase tracking-wider dark:text-white dark:bg-[#18181B] dark:border-[#3F3F46]">
                  Capacity: {room.capacity} seats
                </span>
                <span className="text-xs font-black text-white bg-slate-950 px-3 py-1.5 border border-slate-200 uppercase tracking-wider dark:bg-[#DFE104] dark:text-black dark:border-black">
                  Booked {room.bookingCount} times
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl font-black tracking-tighter uppercase leading-none">
                {room.name}
              </h1>

              <p className="text-slate-400 dark:text-[#A1A1AA] leading-relaxed text-sm font-sans whitespace-pre-line font-bold tracking-tight">
                {room.description}
              </p>
            </div>

            <div className="space-y-4 pt-6 border-t border-slate-200 dark:border-t dark:border-[#3F3F46]">
              <h3 className="text-sm font-black uppercase tracking-widest text-slate-500 dark:text-[#A1A1AA]">Included Amenities</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {room.amenities.map((amenity) => (
                  <div
                    key={amenity}
                    className="flex items-center gap-2.5 p-3 border border-slate-200 bg-white dark:bg-[#09090B] dark:border-[#3F3F46]"
                  >
                    <div className="w-5 h-5 border border-slate-200 bg-slate-950 flex items-center justify-center text-white dark:bg-[#DFE104] dark:text-black dark:border-black">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                    <span className="text-xs font-black uppercase tracking-tight">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white border border-slate-200 p-6 space-y-6 dark:bg-[#09090B] dark:border dark:border-[#3F3F46]">
              <div className="flex items-baseline justify-between border-b border-slate-100 pb-4 dark:border-[#3F3F46]">
                <div>
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest dark:text-[#A1A1AA]">Hourly Rate</p>
                  <div className="flex items-center text-4xl font-black">
                    <DollarSign className="w-6 h-6 stroke-[2.5]" />
                    <span>{room.hourlyRate}</span>
                  </div>
                </div>
                <span className="text-xs font-black text-slate-500 uppercase tracking-wider dark:text-[#A1A1AA]">USD per hour</span>
              </div>

              {user ? (
                <button
                  onClick={() => setShowBookingModal(true)}
                  className="w-full py-4 bg-[#EAB308] text-black font-black uppercase tracking-widest border border-black hover:scale-[1.02] active:scale-[0.98] transition-all duration-150 text-base dark:bg-[#DFE104]"
                >
                  Book Now
                </button>
              ) : (
                <Link
                  to="/login"
                  state={{ from: `/rooms/${room._id}` }}
                  className="w-full block py-4 bg-slate-100 border border-slate-200 font-black uppercase tracking-widest text-center hover:bg-slate-200 transition-colors text-base dark:bg-[#18181B] dark:border-[#3F3F46] dark:hover:bg-[#27272A]"
                >
                  Login to Book
                </Link>
              )}

              {isOwner && (
                <div className="border-t border-slate-200 pt-5 space-y-3 dark:border-[#3F3F46]">
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest dark:text-[#A1A1AA]">Owner Controls</p>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setShowEditModal(true)}
                      className="flex items-center justify-center gap-2 py-2.5 border border-slate-200 bg-white hover:bg-slate-50 text-slate-950 transition-colors font-black text-xs uppercase tracking-wider dark:bg-[#18181B] dark:border-[#3F3F46] dark:text-white dark:hover:bg-[#27272A]"
                    >
                      <Settings className="w-4 h-4 stroke-[2.5]" /> Edit Room
                    </button>
                    <button
                      onClick={() => setShowDeleteModal(true)}
                      className="flex items-center justify-center gap-2 py-2.5 border border-red-600 bg-white hover:bg-red-50 text-red-600 transition-colors font-black text-xs uppercase tracking-wider dark:bg-[#18181B] dark:border-red-500 dark:hover:bg-red-950/20"
                    >
                      <Trash className="w-4 h-4 stroke-[2.5]" /> Delete Room
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="bg-white border border-slate-200 p-5 flex items-center gap-4 dark:bg-[#09090B] dark:border dark:border-[#3F3F46]">
              <img
                className="h-14 w-14 object-cover border border-slate-200 dark:border-[#3F3F46]"
                src={room.owner?.photoUrl}
                alt={room.owner?.name}
              />
              <div>
                <p className="text-[9px] text-slate-500 uppercase tracking-widest font-black dark:text-[#A1A1AA]">Room Host</p>
                <h4 className="text-sm font-black uppercase tracking-wide">{room.owner?.name}</h4>
                <p className="text-xs font-bold text-slate-500 lowercase tracking-tight dark:text-[#A1A1AA]">{room.owner?.email}</p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {showBookingModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/80 backdrop-blur-xs" onClick={() => setShowBookingModal(false)}></div>

          <div className="bg-white border border-slate-200 w-full max-w-md p-6 relative z-10 dark:bg-[#09090B] dark:border dark:border-[#3F3F46]">
            <button
              onClick={() => setShowBookingModal(false)}
              className="absolute top-4 right-4 p-1 text-slate-500 hover:text-slate-950 border border-transparent hover:border-slate-200 dark:text-[#A1A1AA] dark:hover:text-white dark:hover:border-[#3F3F46]"
            >
              <X className="w-5 h-5 stroke-[2.5]" />
            </button>

            <h2 className="text-2xl font-black uppercase tracking-tighter mb-1">Book Room</h2>
            <p className="text-xs text-slate-500 uppercase font-medium font-sans mb-6 dark:text-[#A1A1AA]">Specify date and choose conflict-free study times slots.</p>

            <form onSubmit={handleBookingSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-[#A1A1AA]">Date</label>
                <input
                  type="date"
                  value={bookingDate}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(e) => setBookingDate(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 py-2.5 px-4 text-sm font-bold uppercase text-slate-950 focus:outline-none dark:bg-[#18181B] dark:border-[#3F3F46] dark:text-white"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-[#A1A1AA]">Start Time</label>
                  <select
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 py-2.5 px-3 text-sm font-bold uppercase text-slate-950 focus:outline-none dark:bg-[#18181B] dark:border-[#3F3F46] dark:text-white"
                  >
                    {timeSlots.slice(0, -1).map((t) => (
                      <option key={t} value={t} className="text-black bg-white">{t}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-[#A1A1AA]">End Time</label>
                  <select
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 py-2.5 px-3 text-sm font-bold uppercase text-slate-950 focus:outline-none dark:bg-[#18181B] dark:border-[#3F3F46] dark:text-white"
                  >
                    {timeSlots.filter(t => t > startTime).map((t) => (
                      <option key={t} value={t} className="text-black bg-white">{t}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-[#A1A1AA]">Special Note (Optional)</label>
                <textarea
                  placeholder="Any requests for markers, specific setups..."
                  value={specialNote}
                  onChange={(e) => setSpecialNote(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 py-2.5 px-4 text-sm font-bold uppercase text-slate-950 focus:outline-none resize-none min-h-[80px] dark:bg-[#18181B] dark:border-[#3F3F46] dark:text-white"
                />
              </div>

              {bookingCost > 0 && (
                <div className="bg-slate-950 text-white p-4 border border-slate-200 flex items-center justify-between dark:bg-[#18181B] dark:border-[#3F3F46]">
                  <span className="text-xs font-black uppercase tracking-widest text-slate-400 dark:text-[#A1A1AA]">Computed Cost</span>
                  <span className="text-2xl font-black">${bookingCost}</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-4 bg-slate-950 text-white font-black uppercase text-sm tracking-widest border border-transparent hover:bg-[#EAB308] hover:text-black transition-colors duration-150 dark:bg-white dark:text-black dark:hover:bg-[#DFE104]"
              >
                Confirm Booking
              </button>
            </form>
          </div>
        </div>
      )}

      {showEditModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/80 backdrop-blur-xs" onClick={() => setShowEditModal(false)}></div>

          <div className="bg-white border border-slate-200 w-full max-w-lg p-6 relative z-10 max-h-[90vh] overflow-y-auto dark:bg-[#09090B] dark:border dark:border-[#3F3F46]">
            <button
              onClick={() => setShowEditModal(false)}
              className="absolute top-4 right-4 p-1 text-slate-500 hover:text-slate-950 border border-transparent hover:border-slate-200 dark:text-[#A1A1AA] dark:hover:text-white dark:hover:border-[#3F3F46]"
            >
              <X className="w-5 h-5 stroke-[2.5]" />
            </button>

            <h2 className="text-2xl font-black uppercase tracking-tighter mb-1">Edit Room</h2>
            <p className="text-xs text-slate-500 uppercase font-medium font-sans mb-6 dark:text-[#A1A1AA]">Modify any listings info for this study space.</p>

            <form onSubmit={handleEditRoomSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-[#A1A1AA]">Room Name</label>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 py-2.5 px-4 text-sm font-bold uppercase text-slate-950 focus:outline-none dark:bg-[#18181B] dark:border-[#3F3F46] dark:text-white"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-[#A1A1AA]">Description</label>
                <textarea
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 py-2.5 px-4 text-sm font-bold uppercase text-slate-950 focus:outline-none resize-none min-h-[80px] dark:bg-[#18181B] dark:border-[#3F3F46] dark:text-white"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-[#A1A1AA]">Image URL</label>
                <input
                  type="text"
                  value={editImage}
                  onChange={(e) => setEditImage(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 py-2.5 px-4 text-xs font-mono text-slate-950 focus:outline-none dark:bg-[#18181B] dark:border-[#3F3F46] dark:text-white"
                  required
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-[#A1A1AA]">Floor Level</label>
                  <input
                    type="text"
                    value={editFloor}
                    onChange={(e) => setEditFloor(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 py-2.5 px-3 text-sm font-bold uppercase text-slate-950 focus:outline-none dark:bg-[#18181B] dark:border-[#3F3F46] dark:text-white"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-[#A1A1AA]">Capacity</label>
                  <input
                    type="number"
                    value={editCapacity}
                    onChange={(e) => setEditCapacity(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 py-2.5 px-3 text-sm font-bold uppercase text-slate-950 focus:outline-none dark:bg-[#18181B] dark:border-[#3F3F46] dark:text-white"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-[#A1A1AA]">Hourly ($)</label>
                  <input
                    type="number"
                    value={editHourlyRate}
                    onChange={(e) => setEditHourlyRate(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 py-2.5 px-3 text-sm font-bold uppercase text-slate-950 focus:outline-none dark:bg-[#18181B] dark:border-[#3F3F46] dark:text-white"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-[#A1A1AA]">Amenities Available</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {amenitiesOptions.map((option) => (
                    <label
                      key={option}
                      className="flex items-center gap-2 text-xs font-black uppercase tracking-wide cursor-pointer text-slate-700 hover:text-slate-950 dark:text-[#A1A1AA] dark:hover:text-white"
                    >
                      <input
                        type="checkbox"
                        checked={editAmenities.includes(option)}
                        onChange={() => handleAmenityToggle(option)}
                        className="w-4 h-4 rounded-none border border-slate-200 accent-[#EAB308] dark:border-[#3F3F46] dark:accent-[#DFE104]"
                      />
                      <span>{option}</span>
                    </label>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="w-full mt-4 py-4 bg-slate-950 text-white font-black uppercase text-sm tracking-widest border border-transparent hover:bg-[#EAB308] hover:text-black transition-colors duration-150 dark:bg-white dark:text-black dark:hover:bg-[#DFE104]"
              >
                Update Room Info
              </button>
            </form>
          </div>
        </div>
      )}

      {showDeleteModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/80 backdrop-blur-xs" onClick={() => setShowDeleteModal(false)}></div>

          <div className="bg-white border border-slate-200 w-full max-w-sm p-6 relative z-10 text-center dark:bg-[#09090B] dark:border dark:border-[#3F3F46]">
            <div className="w-12 h-12 border border-red-600 bg-red-50 flex items-center justify-center text-red-600 mx-auto mb-4 dark:bg-red-950/20 dark:border-red-500 dark:text-red-400">
              <AlertTriangle className="w-6 h-6 stroke-[2.5]" />
            </div>

            <h2 className="text-xl font-black uppercase tracking-tighter mb-2">Delete Room</h2>
            <p className="text-xs text-slate-500 uppercase font-medium font-sans mb-6 dark:text-[#A1A1AA]">Are you absolutely sure you want to delete this listing? This action cannot be undone.</p>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="py-2.5 border border-slate-200 font-black text-xs uppercase tracking-wider hover:bg-slate-50 transition-colors dark:border-[#3F3F46] dark:hover:bg-[#18181B]"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteRoom}
                className="py-2.5 bg-red-600 text-white border border-red-600 font-black text-xs uppercase tracking-wider hover:bg-red-700 transition-colors"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoomDetails;