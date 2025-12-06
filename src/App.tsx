import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import AddMovie from './pages/admin/AddMovie';
import Home from './pages/Home'; 
import BookingPage from './pages/BookingPage';
import AddHall from './pages/admin/AddHall'; 
import AddShowtime from './pages/admin/AddShowtime';
import MovieDetails from './pages/MovieDetails';

import MyBookings from './pages/MyBookings';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Payment from './pages/Payment';
import Dashboard from './pages/Dashboard';  

import MyTickets from './pages/MyTickets';


import AdminDashboard from './pages/admin/AdminDashboard';
import ManageMovies from './pages/admin/ManageMovies';

// ...

// Routes...
// ...
// ...
function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />  {/* Main Home Page */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} /> {/* Route */}
        {/* <Route path="/" element={<Home />} /> */}

        <Route path="/admin/add-movie" element={<AddMovie />} />

        <Route path="/book/:movieId" element={<BookingPage />} />
        <Route path="/admin/add-hall" element={<AddHall />} />
        <Route path="/admin/add-showtime" element={<AddShowtime />} />


        {/* Movie Details Page Route */}
        <Route path="/movie/:id" element={<MovieDetails />} /> 
        
        <Route path="/book/:movieId" element={<BookingPage />} />

        <Route path="/my-bookings" element={<MyBookings />} />

        <Route path="/payment" element={<Payment />} />

        <Route path='/dashboard' element={<Dashboard />}/>

        <Route path="/my-tickets" element={<MyTickets />} />

        <Route path="/admin/dashboard" element={<AdminDashboard />} />

        <Route path="/admin/manage-movies" element={<ManageMovies />} />




      </Routes>
      <Footer />
    </Router>
  );
}

export default App;