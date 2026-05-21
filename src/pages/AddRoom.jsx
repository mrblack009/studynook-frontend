import { Check, PlusCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';

const AddRoom = () => {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [floor, setFloor] = useState('1st Floor');
  const [capacity, setCapacity] = useState('');
  const [hourlyRate, setHourlyRate] = useState('');
  const [selectedAmenities, setSelectedAmenities] = useState([]);

  const amenitiesOptions = ['Whiteboard', 'Projector', 'Wi-Fi', 'Power Outlets', 'Quiet Zone', 'Air Conditioning'];

  useEffect(() => {
    document.title = 'StudyNook // ADD ROOM';
  }, []);

  const handleAmenityChange = (amenity) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity)
        ? prev.filter((a) => a !== amenity)
        : [...prev, amenity]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !description || !image || !floor || !capacity || !hourlyRate) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      const response = await api.post('/rooms', {
        name,
        description,
        image,
        floor,
        capacity: Number(capacity),
        hourlyRate: Number(hourlyRate),
        amenities: selectedAmenities,
      });

      toast.success(response.data.message || 'Room added successfully');
      navigate('/my-listings');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to add study room');
    }
  };

  const applyPresetImage = (url) => {
    setImage(url);
    toast.success('Preset image applied!');
  };

  const presetImages = [
    { name: 'Cozy Pod', url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=500&q=80' },
    { name: 'Creative Hub', url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=500&q=80' },
    { name: 'Silent Zone', url: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=500&q=80' }
  ];

  return (
    <div className="bg-slate-50 min-h-screen text-slate-950 dark:bg-[#09090B] dark:text-[#FAFAFA] font-['Space_Grotesk',_sans-serif] select-none py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-200">
      <div className="max-w-4xl mx-auto bg-white border border-slate-200 p-4 space-y-8 dark:bg-[#18181B] dark:border dark:border-[#3F3F46]">

        <div className="space-y-2 border-b border-slate-200 dark:border-b dark:border-[#3F3F46] pb-5">
          <div className="flex items-center gap-2 text-[#EAB308] dark:text-[#DFE104] text-xs font-bold uppercase tracking-wider">
            <PlusCircle className="w-4 h-4 stroke-[2.5]" />
            <span> LIST A ROOM</span>
          </div>
          <h1 className="text-2xl font-extrabold uppercase tracking-tighter text-slate-950 dark:text-[#FAFAFA]">
            Create Study Room Listing
          </h1>
          <p className="text-xs text-slate-600 dark:text-[#A1A1AA] font-medium font-sans max-w-xl">
            Provide descriptive specs and features to attract students to book your controlled library spaces.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-500 dark:text-[#A1A1AA] uppercase tracking-wider">Room Name</label>
            <input
              type="text"
              placeholder="e.g. Creative Sandbox Studio, Penthouse Focus Pod"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 border border-slate-200 bg-white text-sm text-slate-950 placeholder-slate-400 focus:border-[#EAB308] focus:outline-none dark:border-[#3F3F46] dark:bg-[#09090B] dark:text-[#FAFAFA] dark:placeholder-[#52525B] dark:focus:border-[#DFE104] transition-colors duration-150 font-medium font-sans"
              required
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-500 dark:text-[#A1A1AA] uppercase tracking-wider">Description</label>
            <textarea
              placeholder="Detail the location, ideal users (group studies, private interviews), atmosphere, noise levels, and general space features..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-3 border border-slate-200 bg-white text-sm text-slate-950 placeholder-slate-400 focus:border-[#EAB308] focus:outline-none dark:border-[#3F3F46] dark:bg-[#09090B] dark:text-[#FAFAFA] dark:placeholder-[#52525B] dark:focus:border-[#DFE104] transition-colors duration-150 min-h-[120px] font-medium font-sans resize-none"
              required
            />
          </div>

          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 dark:text-[#A1A1AA] uppercase tracking-wider">Image URL</label>
              <input
                type="url"
                placeholder="https://example.com/room-image.jpg"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className="w-full px-4 py-3 border border-slate-200 bg-white text-sm text-slate-950 placeholder-slate-400 focus:border-[#EAB308] focus:outline-none dark:border-[#3F3F46] dark:bg-[#09090B] dark:text-[#FAFAFA] dark:placeholder-[#52525B] dark:focus:border-[#DFE104] transition-colors duration-150 font-medium font-sans"
                required
              />
            </div>

            <div className="space-y-2">
              <span className="text-[10px] font-bold text-slate-400 dark:text-[#71717A] uppercase tracking-widest block">
                // OR CHOOSE A PRESET CONCEPT IMAGE
              </span>
              <div className="flex gap-3 flex-wrap">
                {presetImages.map((img) => (
                  <button
                    key={img.name}
                    type="button"
                    onClick={() => applyPresetImage(img.url)}
                    className="px-4 py-2 border border-slate-200 bg-white text-xs font-bold text-slate-950 uppercase tracking-tighter hover:border-[#EAB308] dark:border-[#3F3F46] dark:bg-[#09090B] dark:text-[#FAFAFA] dark:hover:border-[#DFE104] transition-colors duration-150"
                  >
                    {img.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 dark:text-[#A1A1AA] uppercase tracking-wider">Floor Level</label>
              <select
                value={floor}
                onChange={(e) => setFloor(e.target.value)}
                className="w-full px-4 py-3 border border-slate-200 bg-white text-sm text-slate-950 focus:border-[#EAB308] focus:outline-none font-bold uppercase tracking-tighter dark:border-[#3F3F46] dark:bg-[#09090B] dark:text-[#FAFAFA] dark:focus:border-[#DFE104]"
              >
                <option value="1st Floor">1st Floor</option>
                <option value="2nd Floor">2nd Floor</option>
                <option value="3rd Floor">3rd Floor</option>
                <option value="4th Floor">4th Floor</option>
                <option value="5th Floor">5th Floor</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 dark:text-[#A1A1AA] uppercase tracking-wider">Seat Capacity</label>
              <input
                type="number"
                placeholder="e.g. 4"
                min="1"
                value={capacity}
                onChange={(e) => setCapacity(e.target.value)}
                className="w-full px-4 py-3 border border-slate-200 bg-white text-sm text-slate-950 placeholder-slate-400 focus:border-[#EAB308] focus:outline-none dark:border-[#3F3F46] dark:bg-[#09090B] dark:text-[#FAFAFA] dark:placeholder-[#52525B] dark:focus:border-[#DFE104] font-medium font-sans"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 dark:text-[#A1A1AA] uppercase tracking-wider">Hourly Rate ($)</label>
              <input
                type="number"
                placeholder="e.g. 8"
                min="1"
                value={hourlyRate}
                onChange={(e) => setHourlyRate(e.target.value)}
                className="w-full px-4 py-3 border border-slate-200 bg-white text-sm text-slate-950 placeholder-slate-400 focus:border-[#EAB308] focus:outline-none dark:border-[#3F3F46] dark:bg-[#09090B] dark:text-[#FAFAFA] dark:placeholder-[#52525B] dark:focus:border-[#DFE104] font-medium font-sans"
                required
              />
            </div>
          </div>

          <div className="space-y-3 pt-4 border-t border-slate-200 dark:border-[#3F3F46]">
            <label className="text-xs font-bold text-slate-500 dark:text-[#A1A1AA] uppercase tracking-wider">Included Amenities</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {amenitiesOptions.map((option) => {
                const isSelected = selectedAmenities.includes(option);
                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => handleAmenityChange(option)}
                    className={`flex items-center justify-between p-3.5 border text-left transition-colors duration-150 ${isSelected
                        ? 'border-[#EAB308] bg-slate-50 text-[#EAB308] font-bold dark:border-[#DFE104] dark:bg-[#18181B] dark:text-[#DFE104]'
                        : 'border-slate-200 bg-white text-slate-950 font-medium font-sans dark:border-[#3F3F46] dark:bg-[#09090B] dark:text-[#FAFAFA]'
                      }`}
                  >
                    <span className="text-xs uppercase tracking-tighter">{option}</span>
                    {isSelected && (
                      <div className="w-4 h-4 bg-[#EAB308] dark:bg-[#DFE104] flex items-center justify-center text-black">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <button
            type="submit"
            className="w-full h-14 bg-[#EAB308] text-black font-extrabold uppercase tracking-tighter text-base border border-black hover:bg-[#CA8A04] dark:bg-[#DFE104] dark:hover:bg-[#b8ba03] transition-colors duration-150"
          >
            Create Listing
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddRoom;