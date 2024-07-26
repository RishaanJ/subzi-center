import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/login';
import Register from './components/register';
import Profile from './components/profile';

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
