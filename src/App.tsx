import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import AddMovie from './pages/admin/AddMovie';
import Home from './pages/Home'; 
import BookingPage from './pages/BookingPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />  {/* Main Home Page */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} /> {/* Route */}
        {/* <Route path="/" element={<Home />} /> */}

        <Route path="/admin/add-movie" element={<AddMovie />} />

        <Route path="/book/:movieId" element={<BookingPage />} />
      </Routes>
    </Router>
  );
}

export default App;