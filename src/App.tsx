import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import AddMovie from './pages/admin/AddMovie'; // Import කරන්න

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} /> {/* Route */}
        {/* <Route path="/" element={<Home />} /> */}

        <Route path="/admin/add-movie" element={<AddMovie />} />
      </Routes>
    </Router>
  );
}

export default App;