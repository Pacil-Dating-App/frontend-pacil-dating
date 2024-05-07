import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './features/Home/Home';
import Profile from './features/Profile/Profile';
import Matches from './features/Matches/Matches';

import './index.css'
import Login from './features/Authentication/Login';

const App: React.FC = () => {
    return (
      <div className="bg-white text-black">
        <Router>
            {/* <nav>
                <Link to="/">
                  <span className="m-2 text-l mb-2">Home</span>
                </Link>
                <Link to="/profile">
                  <span className="m-2 text-l mb-2">Profile</span>
                </Link>
                <Link to="/matches">
                  <span className="m-2 text-l mb-2">Matches</span>
                </Link>
            </nav> */}
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login"element={<Login />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/matches" element={<Matches />} />
            </Routes>
        </Router>
      </div>
    );
};

export default App;
