import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
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
import ManageHalls from './pages/admin/ManageHalls';
import ManageSchedule from './pages/admin/ManageSchedule';
import ManageBookings from './pages/admin/ManageBookings';
import ManageUsers from './pages/admin/ManageUsers';
import ManageAdmins from './pages/admin/ManageAdmins';
import AdminLayout from './layouts/AdminLayout';
import SuperAdminInfo from './pages/admin/SuperAdminInfo';
import AdminProfile from './pages/admin/AdminProfile'; 


function App() {
  return (
//     <Router>
//       <Navbar />
//       <Routes>
//         <Route path="/" element={<Home />} />  {/* Main Home Page */}
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} /> {/* Route */}
//         {/* <Route path="/" element={<Home />} /> */}

//         <Route path="/admin/add-movie" element={<AddMovie />} />

//         <Route path="/book/:movieId" element={<BookingPage />} />
//         <Route path="/admin/add-hall" element={<AddHall />} />
//         <Route path="/admin/add-showtime" element={<AddShowtime />} />


//         {/* Movie Details Page Route */}
//         <Route path="/movie/:id" element={<MovieDetails />} /> 
        
//         <Route path="/book/:movieId" element={<BookingPage />} />

//         <Route path="/my-bookings" element={<MyBookings />} />

//         <Route path="/payment" element={<Payment />} />

//         <Route path='/dashboard' element={<Dashboard />}/>

//         <Route path="/my-tickets" element={<MyTickets />} />


//         <Route path="/admin/dashboard" element={<AdminDashboard />} />

//         <Route path="/admin/manage-movies" element={<ManageMovies />} />

//         <Route path="/admin/manage-halls" element={<ManageHalls />} />

//         <Route path="/admin/manage-schedule" element={<ManageSchedule />} />

//         <Route path="/admin/manage-bookings" element={<ManageBookings />} />


//         <Route path="/admin/manage-users" element={<ManageUsers />} />

//          <Route path="/admin/manage-admins" element={<ManageAdmins />} />





<Router>
      <Routes>
        
        {/* === PUBLIC ROUTES (Navbar & Footer එක්ක) === */}
        <Route element={<><Navbar /><div className='min-h-screen'><Outlet/></div><Footer /></>}>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
           <Route path="/register" element={<Register />} /> {/* Route */}


         <Route path="/book/:movieId" element={<BookingPage />} />
        
         {/* <Route path="/admin/add-movie" element={<AddMovie />} />
         <Route path="/admin/add-hall" element={<AddHall />} />
         <Route path="/admin/add-showtime" element={<AddShowtime />} /> */}
         {/* <Route path="/admin/super-profile" element={<SuperAdminInfo />} /> */}



         {/* Movie Details Page Route */}
         <Route path="/movie/:id" element={<MovieDetails />} /> 
        
         <Route path="/book/:movieId" element={<BookingPage />} />

         <Route path="/my-bookings" element={<MyBookings />} />

         <Route path="/payment" element={<Payment />} />

         <Route path='/dashboard' element={<Dashboard />}/>

         <Route path="/my-tickets" element={<MyTickets />} />
            {/* ... other user routes */}
        </Route>


        <Route element={<><div className='min-h-screen'><Outlet/></div></>}>

        {/* === ADMIN ROUTES (Sidebar එක්ක) === */}
        <Route  path="/admin" element={<AdminLayout />} >
            
            {/* 👇 මේ Pages වලට දැන් Sidebar එක ඔටෝම එනවා */}
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="manage-movies" element={<ManageMovies />} />
            <Route path="manage-halls" element={<ManageHalls />} />
            <Route path="manage-schedule" element={<ManageSchedule />} />
            

            <Route path="manage-bookings" element={<ManageBookings />} />


           <Route path="manage-users" element={<ManageUsers />} />
           <Route path="manage-admins" element={<ManageAdmins />} />
           <Route path="super-profile" element={<SuperAdminInfo />} />
           <Route path="profile" element={<AdminProfile />} />



           <Route path="add-movie" element={<AddMovie />} />
           <Route path="add-hall" element={<AddHall />} />
           <Route path="add-showtime" element={<AddShowtime />} />

            {/* ... Add other admin pages here */}
            {/* <Route path="manage-bookings" element={<ManageBookings />} /> */}
            {/* <Route path="manage-users" element={<ManageUsers />} /> */}
            {/* <Route path="manage-admins" element={<ManageAdmins />} /> */}

        </Route>

        </Route>
      </Routes>
    </Router>




//       </Routes>
//       <Footer />
//     </Router>
  );
}

export default App;