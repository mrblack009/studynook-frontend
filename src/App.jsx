import { BrowserRouter as Router } from 'react-router-dom';
function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <main className="flex-grow flex items-center justify-center bg-slate-50 dark:bg-zinc-950">
          <h1 className="text-4xl font-bold">StudyNook Frontend</h1>
        </main>
      </div>
    </Router>
  );
}
export default App;