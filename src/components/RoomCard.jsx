import { motion } from 'framer-motion';
import { ArrowRight, DollarSign, Layers, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const RoomCard = ({ room }) => {
  const { _id, name, description, image, floor, capacity, hourlyRate, amenities } = room;

  const shortDescription = description.length > 100 
    ? `${description.substring(0, 97)}...` 
    : description;

  const maxAmenities = 3;
  const displayedAmenities = amenities.slice(0, maxAmenities);
  const extraAmenitiesCount = amenities.length - maxAmenities;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ type: "square", ease: "easeInOut", duration: 0.15 }}
      className="flex flex-col h-full bg-white border border-slate-200 text-slate-950 dark:bg-[#09090B] dark:border dark:border-[#3F3F46] dark:text-[#FAFAFA] font-['Space_Grotesk',_sans-serif] select-none transition-colors duration-200"
    >
      
      <div className="relative aspect-[4/3] w-full border-b border-slate-200 dark:border-b dark:border-[#3F3F46] overflow-hidden bg-slate-100 dark:bg-[#18181B]">
        <img
          src={image}
          alt={name}
          className="h-full w-full object-cover"
          loading="lazy"
        />
        
        <div className="absolute top-0 right-0 bg-[#EAB308] dark:bg-[#DFE104] text-black px-3 py-1 border-b border-l-4 border-slate-200 dark:border-b dark:border-l-2 dark:border-[#3F3F46] flex items-center gap-0.5 font-bold">
          <DollarSign className="w-4 h-4 text-black stroke-[2.5]" />
          <span className="text-sm font-bold tracking-tighter uppercase">{hourlyRate}</span>
          <span className="text-[10px] uppercase font-bold tracking-tight">/hr</span>
        </div>
      </div>

      <div className="flex flex-col flex-grow p-6">
        <h3 className="text-xl font-bold uppercase tracking-tighter line-clamp-1 mb-2 text-slate-950 dark:text-[#FAFAFA] hover:text-[#EAB308] dark:hover:text-[#DFE104] transition-colors duration-200">
          {name}
        </h3>
        
        <p className="text-sm text-slate-700 dark:text-[#A1A1AA] mb-6 line-clamp-2 leading-relaxed flex-grow font-sans">
          {shortDescription}
        </p>

        <div className="grid grid-cols-2 gap-4 mb-5 border-t border-b border-slate-200 px-3 py-3 dark:border-t dark:border-b dark:border-[#3F3F46]">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-tighter text-slate-950 dark:text-[#FAFAFA]">
            <Layers className="w-4 h-4 text-[#EAB308] dark:text-[#DFE104] stroke-[2.5]" />
            <span className="truncate">{floor}</span>
          </div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-tighter text-slate-950 dark:text-[#FAFAFA]">
            <Users className="w-4 h-4 text-[#EAB308] dark:text-[#DFE104] stroke-[2.5]" />
            <span className="truncate">{capacity} seats</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {displayedAmenities.map((amenity, index) => (
            <span
              key={index}
              className="text-[10px] font-bold uppercase tracking-wider border border-slate-200 text-slate-950 px-2.5 py-1 dark:border-[#3F3F46] dark:text-[#FAFAFA]"
            >
              {amenity}
            </span>
          ))}
          {extraAmenitiesCount > 0 && (
            <span className="text-[10px] font-bold uppercase tracking-wider bg-[#EAB308] text-black border border-slate-200 px-2.5 py-1 dark:bg-[#DFE104] dark:border-black">
              +{extraAmenitiesCount} more
            </span>
          )}
        </div>

        <Link
          to={`/rooms/${_id}`}
          className="w-full h-12 flex items-center justify-center gap-2 bg-[#EAB308] text-black border border-black font-bold uppercase tracking-tighter text-sm hover:bg-[#CA8A04] dark:bg-[#DFE104] dark:hover:bg-[#b8ba03] transition-colors duration-150"
        >
          View Details
          <ArrowRight className="w-4 h-4 stroke-[2.5]" />
        </Link>
      </div>
    </motion.div>
  );
};

export default RoomCard;