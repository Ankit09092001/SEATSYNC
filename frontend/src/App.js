import Home from "./Home/Homepage";
import Login from "./Login/Loginpage";
import Register from "./Login/Signuppage";
import User from "./User/Userpage";
import Admin from './Admin/Userpage';
import TC from './TC/Userpage';
import AddTC from './Admin/Addtc';
import ViewTC from './Admin/Viewtc';
import Addtrain from './Admin/Addtrain';
import Booktrain from './User/Booktrain';
import AddPassenger from './User/AddPassenger';
import PassengerForm from "./User/PassengerForm";
import AlternateBooking from './User/AlternateBooking';
import AlternateForm from './User/AlternateForm';
import TravelOption from './User/TravelOption'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import "./App.css";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="signin" element={<Login/>} />
          <Route path="signup" element={<Register/>} />
          <Route path="user" element={<User/>} />
          <Route path="admin" element={<Admin/>} />
          <Route path="tc" element={<TC/>} />
          <Route path="addtc" element={<AddTC/>} />
          <Route path="viewtc" element={<ViewTC/>} />
          <Route path="addtrain" element={<Addtrain/>} />
          <Route path="booktrain" element={<Booktrain/>} />
          <Route path="addpassenger" element={<AddPassenger />} />
          <Route path="passengerform" element={<PassengerForm />} />
          <Route path="alternatebooking" element={<AlternateBooking />} />
          <Route path="traveloption" element={<TravelOption />} />
          <Route path="alternateform" element={<AlternateForm />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
