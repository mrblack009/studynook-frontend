import { Toaster } from 'react-hot-toast';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';

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