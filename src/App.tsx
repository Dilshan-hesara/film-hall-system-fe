// import { BrowserRouter as Router, Routes, Route, Outlet, Navigate } from 'react-router-dom';
// import Login from './pages/Login';
// import Register from './pages/Register';
// import AddMovie from './pages/admin/AddMovie';
// import Home from './pages/Home'; 
// import BookingPage from './pages/BookingPage';
// import AddHall from './pages/admin/AddHall'; 
// import AddShowtime from './pages/admin/AddShowtime';
// import MovieDetails from './pages/MovieDetails';

// import MyBookings from './pages/MyBookings';

// import Navbar from './components/Navbar';
// import Footer from './components/Footer';

// import Payment from './pages/Payment';
// import Dashboard from './pages/Dashboard';  

// import MyTickets from './pages/MyTickets';


// import AdminDashboard from './pages/admin/AdminDashboard';
// import ManageMovies from './pages/admin/ManageMovies';
// import ManageHalls from './pages/admin/ManageHalls';
// import ManageSchedule from './pages/admin/ManageSchedule';
// import ManageBookings from './pages/admin/ManageBookings';
// import ManageUsers from './pages/admin/ManageUsers';
// import ManageAdmins from './pages/admin/ManageAdmins';
// import AdminLayout from './layouts/AdminLayout';
// import SuperAdminInfo from './pages/admin/SuperAdminInfo';
// import AdminProfile from './pages/admin/AdminProfile'; 
// import Feedback from './pages/Feedback';

// import NotFound from './pages/NotFound'; 


// import ScanTicket from './pages/admin/ScanTicket';
// import Watchlist from './pages/Watchlist';
// import ExploreMovies from './pages/ExploreMovies';



// import Terms from './pages/Terms';
// import Privacy from './pages/Privacy';
// import RefundPolicy from './pages/RefundPolicy';
// import FAQ from './pages/FAQ';


// import CounterBooking from './pages/admin/CounterBooking';
// import FindBooking from './pages/admin/FindBooking';
// import ReceptionDashboard from './pages/admin/ReceptionDashboard';
// import ReceptionLayout from './layouts/ReceptionLayout'; 
// import ReceptionProfile from './pages/admin/ReceptionProfile';

// import FindBookingPage from './pages/FindBookingPage';
// import ChatBot from './components/user/ChatBot';

// function App() {
//   return (
// //     <Router>
// //       <Navbar />
// //       <Routes>
// //         <Route path="/" element={<Home />} />  {/* Main Home Page */}
// //         <Route path="/login" element={<Login />} />
// //         <Route path="/register" element={<Register />} /> {/* Route */}
// //         {/* <Route path="/" element={<Home />} /> */}

// //         <Route path="/admin/add-movie" element={<AddMovie />} />

// //         <Route path="/book/:movieId" element={<BookingPage />} />
// //         <Route path="/admin/add-hall" element={<AddHall />} />
// //         <Route path="/admin/add-showtime" element={<AddShowtime />} />

// //         <Route path="/movie/:id" element={<MovieDetails />} /> 
        
// //         <Route path="/book/:movieId" element={<BookingPage />} />

// //         <Route path="/my-bookings" element={<MyBookings />} />

// //         <Route path="/payment" element={<Payment />} />

// //         <Route path='/dashboard' element={<Dashboard />}/>

// //         <Route path="/my-tickets" element={<MyTickets />} />


// //         <Route path="/admin/dashboard" element={<AdminDashboard />} />

// //         <Route path="/admin/manage-movies" element={<ManageMovies />} />

// //         <Route path="/admin/manage-halls" element={<ManageHalls />} />

// //         <Route path="/admin/manage-schedule" element={<ManageSchedule />} />

// //         <Route path="/admin/manage-bookings" element={<ManageBookings />} />


// //         <Route path="/admin/manage-users" element={<ManageUsers />} />

// //          <Route path="/admin/manage-admins" element={<ManageAdmins />} />





// <Router>
//       <Routes>
        
//         <Route element={<><Navbar /><div className='min-h-screen'><Outlet/></div><Footer /><ChatBot /></>}>
//             <Route path="/" element={<Home />} />
//             <Route path="/login" element={<Login />} />
//            <Route path="/register" element={<Register />} /> {/* Route */}


//          <Route path="/book/:movieId" element={<BookingPage />} />
        
//          {/* <Route path="/admin/add-movie" element={<AddMovie />} />
//          <Route path="/admin/add-hall" element={<AddHall />} />
//          <Route path="/admin/add-showtime" element={<AddShowtime />} /> */}
//          {/* <Route path="/admin/super-profile" element={<SuperAdminInfo />} /> */}

//           <Route path="/watchlist" element={<Watchlist />} />
//           <Route path="/movies" element={<ExploreMovies />} />


//          <Route path="/movie/:id" element={<MovieDetails />} /> 
        
//          <Route path="/book/:movieId" element={<BookingPage />} />

//          <Route path="/my-bookings" element={<MyBookings />} />

//          <Route path="/payment" element={<Payment />} />

//          <Route path='/dashboard' element={<Dashboard />}/>

//          <Route path="/my-tickets" element={<MyTickets />} />


//         <Route path="/feedback" element={<Feedback />} />
//         <Route path="*" element={<NotFound />} />

//         <Route path="/terms" element={<Terms />} />
//         <Route path="/privacy" element={<Privacy />} />
//         <Route path="/refund-policy" element={<RefundPolicy />} />
//         <Route path="/faq" element={<FAQ />} />
//               <Route path="/find-booking-d" element={<FindBookingPage />} />

//         </Route>


//         <Route element={<><div className='min-h-screen'><Outlet/></div></>}>


//             <Route path="/reception" element={<ReceptionLayout />}>
//           <Route index element={<Navigate to="/reception-dashboard" replace />} />
          
//           <Route path="reception-dashboard" element={<ReceptionDashboard />} />
//           <Route path="pos" element={<CounterBooking />} />
//           <Route path="scan-tickets" element={<ScanTicket />} />
//           <Route path="find-booking" element={<FindBooking />} />
//               <Route path="profile" element={<ReceptionProfile />} /> 
//               <Route path="find-booking-d" element={<FindBookingPage />} />


//       </Route>
      
//         <Route  path="/admin" element={<AdminLayout />} >
            
//             <Route path="dashboard" element={<AdminDashboard />} />
//             <Route path="manage-movies" element={<ManageMovies />} />
//             <Route path="manage-halls" element={<ManageHalls />} />
//             <Route path="manage-schedule" element={<ManageSchedule />} />
            

//             <Route path="manage-bookings" element={<ManageBookings />} />


//            <Route path="manage-users" element={<ManageUsers />} />
//            <Route path="manage-admins" element={<ManageAdmins />} />
//            <Route path="super-profile" element={<SuperAdminInfo />} />
//            <Route path="profile" element={<AdminProfile />} />



//            <Route path="add-movie" element={<AddMovie />} />
//            <Route path="add-hall" element={<AddHall />} />
//            <Route path="add-showtime" element={<AddShowtime />} />


//           <Route path="scan-ticket" element={<ScanTicket />} />

// {/* <Route path="pos" element={<CounterBooking />} />
// <Route path="find-booking" element={<FindBooking />} />
// <Route path="reception-dashboard" element={<ReceptionDashboard />} /> */}
//             {/* <Route path="manage-bookings" element={<ManageBookings />} /> */}
//             {/* <Route path="manage-users" element={<ManageUsers />} /> */}
//             {/* <Route path="manage-admins" element={<ManageAdmins />} /> */}

//         </Route>

//         </Route>

//         <Route path="*" element={<NotFound />} />

//       </Routes>


//     </Router>




// //       </Routes>
// //       <Footer />
// //     </Router>
//   );
// }

// export default App;


import { BrowserRouter as Router, Routes, Route, Outlet, Navigate } from 'react-router-dom';

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
import Feedback from './pages/Feedback';
import NotFound from './pages/NotFound';
import ScanTicket from './pages/admin/ScanTicket';
import Watchlist from './pages/Watchlist';
import ExploreMovies from './pages/ExploreMovies';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import RefundPolicy from './pages/RefundPolicy';
import FAQ from './pages/FAQ';
import CounterBooking from './pages/admin/CounterBooking';
import FindBooking from './pages/admin/FindBooking';
import ReceptionDashboard from './pages/admin/ReceptionDashboard';
import ReceptionLayout from './layouts/ReceptionLayout';
import ReceptionProfile from './pages/admin/ReceptionProfile';
import FindBookingPage from './pages/FindBookingPage';
import ChatBot from './components/user/ChatBot';

function App() {
  return (
    <Router>
      <Routes>

        <Route element={<><Navbar /><div className='min-h-screen'><Outlet /></div><Footer /><ChatBot /></>}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/book/:movieId" element={<BookingPage />} />
          <Route path="/watchlist" element={<Watchlist />} />
          <Route path="/movies" element={<ExploreMovies />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="/my-bookings" element={<MyBookings />} />
          <Route path="/payment" element={<Payment />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path="/my-tickets" element={<MyTickets />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/refund-policy" element={<RefundPolicy />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/find-booking-d" element={<FindBookingPage />} />
        </Route>


        <Route element={<><div className='min-h-screen'><Outlet /></div></>}>
          
          <Route path="/reception" element={<ReceptionLayout />}>
            <Route index element={<Navigate to="reception-dashboard" replace />} />
            <Route path="reception-dashboard" element={<ReceptionDashboard />} />
            <Route path="pos" element={<CounterBooking />} />
            <Route path="scan-tickets" element={<ScanTicket />} />
            <Route path="find-booking" element={<FindBooking />} />
            <Route path="profile" element={<ReceptionProfile />} />
            <Route path="find-booking-d" element={<FindBookingPage />} />
          </Route>

          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Navigate to="dashboard" replace />} />
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
            <Route path="scan-ticket" element={<ScanTicket />} />
          </Route>
        
        </Route>

        <Route path="*" element={<NotFound />} />

      </Routes>
    </Router>
  );
}

export default App;