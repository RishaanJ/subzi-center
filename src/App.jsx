import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/login.jsx';
import Register from './components/register.jsx';
import Profile from './components/profile.jsx'
// Import other components

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;
