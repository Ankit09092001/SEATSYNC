import Home from "./Home/Homepage";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import "./App.css";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          {/* <Route path="signup" element={<Login/>} /> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
