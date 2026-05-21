import { Toaster } from 'react-hot-toast';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import AddRoom from './pages/AddRoom';
import Home from './pages/Home';
import Login from './pages/Login';
import MyBookings from './pages/MyBookings';
import MyListings from './pages/MyListings';
import Register from './pages/Register';
import RoomDetails from './pages/RoomDetails';
import Rooms from './pages/Rooms';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-zinc-950 text-slate-800 dark:text-slate-100 transition-colors duration-300">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<div className="p-8">StudyNook Home</div>} />
                <Route path="/" element={<Home />} />
                <Route path="/rooms" element={<Rooms />} />
                <Route path="/rooms/:id" element={<RoomDetails />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/add-room" element={<ProtectedRoute><AddRoom /></ProtectedRoute>} />
                <Route path="/my-bookings" element={<ProtectedRoute><MyBookings /></ProtectedRoute>} />
                <Route path="/my-listings" element={<ProtectedRoute><MyListings /></ProtectedRoute>} />
              </Routes>
            </main>
            <Footer />
            <Toaster position="top-center" />
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}
export default App;