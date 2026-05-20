import { Calendar, List, LogOut, Menu, Moon, PlusCircle, Sun, X } from 'lucide-react';
import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

const Navbar = () => {
  const { user, logoutUser } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logoutUser();
    setShowDropdown(false);
    navigate('/');
  };

  const toggleMobileMenu = () => setIsOpen(!isOpen);

  const activeClassName = "text-slate-900 bg-[#EAB308] border border-slate-200 dark:text-[#DFE104] dark:bg-[#27272A] dark:border-[#3F3F46] px-4 py-2 font-bold uppercase tracking-tighter text-sm transition-all";
  const inactiveClassName = "text-slate-800 hover:text-slate-950 hover:bg-slate-100 dark:text-[#FAFAFA] dark:hover:text-[#DFE104] dark:hover:bg-[#18181B] border border-transparent px-4 py-2 font-bold uppercase tracking-tighter text-sm transition-all";

  const mobileActiveClassName = "block mx-2 rounded px-4 py-3 border-b border-slate-200 bg-slate-100 text-sm font-bold text-[#EAB308] uppercase tracking-tighter dark:border-[#3F3F46] dark:bg-[#27272A] dark:text-[#DFE104]";
  const mobileInactiveClassName = "block px-4 py-3 text-sm font-bold text-slate-700 hover:bg-slate-50 hover:text-slate-950 dark:text-[#FAFAFA] dark:hover:bg-[#18181B] dark:hover:text-[#DFE104] uppercase tracking-tighter transition-all";

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 text-slate-950 dark:bg-[#09090B]/80 dark:backdrop-blur-md dark:border-[#3F3F46] dark:text-[#FAFAFA] font-['Space_Grotesk',_sans-serif] select-none transition-colors duration-200">      <div className="max-w-[95vw] mx-auto px-4 md:px-8">
      <div className="flex justify-between h-20 items-center">

        <div className="flex items-center">
          <Link to="/" className="flex items-center group">
            <span className="text-2xl font-bold tracking-tighter uppercase leading-none">
              <span className="text-[#EAB308] dark:text-[#DFE104]">Study</span>
              <span className="text-slate-950 dark:text-[#FAFAFA]">Nook</span>
            </span>
          </Link>
        </div>

        <div className="hidden md:flex items-center space-x-2">
          <NavLink to="/" className={({ isActive }) => isActive ? activeClassName : inactiveClassName}>
            Home
          </NavLink>
          <NavLink to="/rooms" className={({ isActive }) => isActive ? activeClassName : inactiveClassName}>
            Rooms
          </NavLink>

          {user && (
            <>
              <NavLink to="/add-room" className={({ isActive }) => isActive ? activeClassName : inactiveClassName}>
                Add Room
              </NavLink>
              <NavLink to="/my-listings" className={({ isActive }) => isActive ? activeClassName : inactiveClassName}>
                My Listings
              </NavLink>
              <NavLink to="/my-bookings" className={({ isActive }) => isActive ? activeClassName : inactiveClassName}>
                My Bookings
              </NavLink>
            </>
          )}
        </div>

        <div className="hidden md:flex items-center">

          <button
            onClick={toggleTheme}
            className="w-11 h-11 text-slate-950 bg-transparent flex items-center justify-center dark:text-[#FAFAFA] transition-colors duration-200"
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? <Sun className="w-5 h-5 stroke-[2.5]" /> : <Moon className="w-5 h-5 stroke-[2.5]" />}
          </button>

          {user ? (
            <div className="relative">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
                className="flex items-center gap-3 h-11 px-3 text-slate-950 bg-transparent hover:bg-slate-100 dark:text-[#FAFAFA] dark:hover:bg-[#18181B] transition-colors duration-200"
              >
                <img
                  className="h-6 w-6 object-cover rounded-full"
                  src={user.photoUrl}
                  alt={user.name}
                />
                <span className="text-sm font-bold uppercase tracking-tighter hidden lg:block">
                  {user.name}
                </span>
              </button>

              {showDropdown && (
                <div className="absolute right-0 mt-2 w-56 border-2 border-slate-200 bg-white dark:border-[#3F3F46] dark:bg-[#09090B] py-0 z-50">
                  <div className="px-4 py-3 border-b border-slate-200 bg-slate-50 dark:border-[#3F3F46] dark:bg-[#18181B]">
                    <p className="text-[10px] font-bold text-slate-500 dark:text-[#A1A1AA] uppercase tracking-widest">// USER LOGGED</p>
                    <p className="text-sm font-bold text-slate-950 dark:text-[#FAFAFA] truncate uppercase tracking-tighter">{user.name}</p>
                  </div>

                  <Link
                    to="/my-listings"
                    className="flex items-center gap-3 px-4 py-3 text-sm font-bold uppercase tracking-tighter text-slate-900 hover:bg-[#EAB308] dark:text-[#FAFAFA] dark:hover:bg-[#DFE104] dark:hover:text-black transition-colors"
                  >
                    <List className="w-4 h-4 stroke-[2.5]" /> My Listings
                  </Link>

                  <Link
                    to="/my-bookings"
                    className="flex items-center gap-3 px-4 py-3 text-sm font-bold uppercase tracking-tighter text-slate-900 hover:bg-[#EAB308] dark:text-[#FAFAFA] dark:hover:bg-[#DFE104] dark:hover:text-black transition-colors"
                  >
                    <Calendar className="w-4 h-4 stroke-[2.5]" /> My Bookings
                  </Link>

                  <Link
                    to="/add-room"
                    className="flex items-center gap-3 px-4 py-3 text-sm font-bold uppercase tracking-tighter text-slate-900 hover:bg-[#EAB308] dark:text-[#FAFAFA] dark:hover:bg-[#DFE104] dark:hover:text-black transition-colors"
                  >
                    <PlusCircle className="w-4 h-4 stroke-[2.5]" /> Add Room
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 border-t border-slate-200 dark:border-[#3F3F46] text-sm font-bold uppercase tracking-tighter text-red-600 hover:bg-red-600 hover:text-white transition-colors"
                  >
                    <LogOut className="w-4 h-4 stroke-[2.5]" /> Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Link
                to="/login"
                className="h-11 px-5 flex items-center justify-center text-sm font-bold uppercase tracking-tighter text-slate-900 border border-transparent hover:text-[#EAB308] dark:text-[#FAFAFA] dark:hover:text-[#DFE104] transition-all"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="h-11 px-5 flex items-center justify-center text-sm font-black uppercase tracking-wider bg-[#DFE104] dark:hover:bg-[#EAB308] dark:hover:text-[#FAFAFA] text-slate-950 border border-slate-200 hover:bg-slate-950 hover:text-white cursor-pointer">
                Register
              </Link>
            </div>
          )}
        </div>

        <div className="flex items-center md:hidden gap-1">
          <button
            onClick={toggleTheme}
            className="w-5 h-10 text-slate-950 bg-transparent flex items-center justify-center dark:text-[#FAFAFA]" // Slightly reduced size
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? <Sun className="w-5 h-5 stroke-[2.5]" /> : <Moon className="w-5 h-5 stroke-[2.5]" />}
          </button>

          <button
            onClick={toggleMobileMenu}
            className="w-10 h-10 text-slate-950 bg-transparent flex items-center justify-center dark:text-[#FAFAFA]" // Slightly reduced size
          >
            <span className="sr-only">Open main menu</span>
            {isOpen ? <X className="w-5 h-5 stroke-[2.5]" /> : <Menu className="w-5 h-5 stroke-[2.5]" />}
          </button>
        </div>
      </div>
    </div>

      {isOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white dark:border-[#3F3F46] dark:bg-[#09090B]">
          <div className="py-2 space-y-1">
            <NavLink to="/" onClick={toggleMobileMenu} className={({ isActive }) => isActive ? mobileActiveClassName : mobileInactiveClassName}>
              Home
            </NavLink>
            <NavLink to="/rooms" onClick={toggleMobileMenu} className={({ isActive }) => isActive ? mobileActiveClassName : mobileInactiveClassName}>
              Rooms
            </NavLink>

            {user && (
              <>
                <NavLink to="/add-room" onClick={toggleMobileMenu} className={({ isActive }) => isActive ? mobileActiveClassName : mobileInactiveClassName}>
                  Add Room
                </NavLink>
                <NavLink to="/my-listings" onClick={toggleMobileMenu} className={({ isActive }) => isActive ? mobileActiveClassName : mobileInactiveClassName}>
                  My Listings
                </NavLink>
                <NavLink to="/my-bookings" onClick={toggleMobileMenu} className={({ isActive }) => isActive ? mobileActiveClassName : mobileInactiveClassName}>
                  My Bookings
                </NavLink>
              </>
            )}
          </div>

          <div className="py-4 border-t border-slate-200 bg-slate-50 dark:border-[#3F3F46] dark:bg-[#18181B]">
            {user ? (
              <div className="px-4">
                <div className="flex items-center space-x-4 mb-4">
                  <img
                    className="h-10 w-10 object-cover border border-slate-200 dark:border-black"
                    src={user.photoUrl}
                    alt={user.name}
                  />
                  <div>
                    <div className="text-sm font-bold uppercase tracking-tighter text-slate-950 dark:text-[#FAFAFA]">{user.name}</div>
                    <div className="text-xs font-medium font-sans text-slate-500 dark:text-[#A1A1AA] lowercase">{user.email}</div>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-3 h-11 border border-red-500 text-sm font-bold uppercase tracking-tighter text-red-500 hover:bg-red-600 hover:text-white transition-all"
                >
                  <LogOut className="w-4 h-4 stroke-[2.5]" /> Logout
                </button>
              </div>
            ) : (
              <div className="px-4 flex flex-col gap-2">
                <Link
                  to="/login"
                  onClick={toggleMobileMenu}
                  className="w-full h-11 flex items-center justify-center text-sm font-bold uppercase tracking-tighter text-slate-900 border border-slate-200 hover:bg-[#EAB308] hover:text-black dark:text-[#FAFAFA] dark:border-[#3F3F46] dark:hover:bg-[#DFE104] dark:hover:text-black transition-all"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={toggleMobileMenu}
                  className="w-full h-11 flex items-center justify-center text-sm font-bold uppercase tracking-tighter bg-slate-950 text-white border border-slate-200 hover:bg-[#EAB308] hover:border-black hover:text-black dark:bg-[#DFE104] dark:text-black dark:border-black"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;