import Home from "./Home/Homepage";
import Login from "./Login/Loginpage";
import Register from "./Login/Signuppage";
import User from "./User/Userpage";
import Admin from './Admin/Userpage';
import TC from './TC/Userpage';
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
        </Routes>
      </Router>
    </div>
  );
}

export default App;
