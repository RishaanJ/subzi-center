import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/login.jsx';
import Register from './components/register.jsx';
import Profile from './components/profile.jsx'
import Subzis from './components/Subzis.jsx'
import Admin from './components/admin.jsx'
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/subzis/:subziId" element={<Subzis />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
  );
}

export default App;
