import { Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Breadcrumbs from './components/Breadcrumbs';
import ToastContainer from './components/ToastContainer';
import Dashboard from './pages/Dashboard';
import Logs from './pages/Logs';
import Queues from './pages/Queues';
import Register from './pages/Register';
import ManageIntegrations from './pages/ManageIntegrations';
import SystemReport from './pages/SystemReport';
import About from './pages/About';
import NotFound from './pages/NotFound';

function App() {
  return (
    <div className="App-Layout">
      <Sidebar />
      
      <ToastContainer />
      
      <div className="content-area">
        <Breadcrumbs />
        <main className="main-padding">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/logs" element={<Logs />} />
            <Route path="/queues" element={<Queues />} />
            <Route path="/manage-integrations" element={<ManageIntegrations />} />
            <Route path="/register" element={<Register />} />
            <Route path="/system/:systemName" element={<SystemReport />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;