import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  useEffect(() => {
    document.title = 'StudyNook | Page Not Found';
  }, []);

  return (
    <div className="max-w-[95vw] mx-auto px-4 md:px-8 py-20 font-['Space_Grotesk',_sans-serif] text-slate-950 dark:text-[#FAFAFA] transition-colors duration-200">
      <div className="flex flex-col md:flex-row items-center justify-center gap-12 py-10 px-6">

        <div className="w-[300px] h-[300px] md:w-[400px] md:h-[400px] shrink-0">
          <img
            src="/notfound.svg"
            alt="Page Not Found"
            className="w-full h-full object-contain"
          />
        </div>

        <div className="text-center md:text-left max-w-md flex flex-col items-end">
          <h1 className="text-8xl font-black text-slate-950 dark:text-white uppercase tracking-tighter">
            404
          </h1>
          <h3 className="text-3xl font-black text-slate-950 dark:text-white uppercase tracking-tighter mt-2">
            Page Not Found
          </h3>
          <p className="text-sm text-slate-600 dark:text-[#A1A1AA] mt-3 mb-8 text-right font-sans">
            The page you are trying to access has been relocated or deleted. Return to the dashboard to continue your session.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-8 py-4 bg-slate-950 text-white font-black uppercase text-sm tracking-wider border border-transparent hover:bg-[#EAB308] hover:text-black transition-colors duration-150 dark:bg-white dark:text-black dark:hover:bg-[#DFE104]"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;