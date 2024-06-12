import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import {Home} from './components/pages/Home'
import {InAndOut} from './components/pages/InAndOut'
import { History } from './components/pages/History'
import {Monitoring} from './components/pages/Monitoring'
import {Dashboard} from './components/pages/Dashboard'
import { Sidebar } from './components/Sidebar'

const AppContent = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <>
      {!isHome && <Sidebar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/in-and-out" element={<InAndOut />} />
        <Route path="/history" element={<History />} />
        <Route path="/monitoring" element={<Monitoring />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App
