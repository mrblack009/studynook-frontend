import { motion } from 'framer-motion';

const Spinner = () => {
  return (
    <div className="flex items-center justify-center min-h-[50vh] w-full bg-[#09090B]">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          duration: 1.2,
          ease: "linear",
          repeat: Infinity
        }}
        className="relative w-12 h-12"
      >
        <svg className="w-full h-full" viewBox="0 0 50 50">
          <circle
            cx="25"
            cy="25"
            r="20"
            fill="none"
            stroke="#18181B"
            strokeWidth="4"
          />
          <circle
            cx="25"
            cy="25"
            r="20"
            fill="none"
            stroke="#DFE104"
            strokeWidth="4"
            strokeDasharray="30 100"
            strokeLinecap="round"
          />
        </svg>
      </motion.div>
    </div>
  );
};

export default Spinner;