import React from 'react';
import './index.css'
import { BrowserRouter as Router, Routes, Route, Link, BrowserRouter } from 'react-router-dom';
import Home from './features/Home/Home';
import Profile from './features/Profile/Profile';
import Matches from './features/Matches/Matches';
import Login from './features/Authentication/Login';
import { AuthProvider } from './features/Authentication/AuthContext';

const App: React.FC = () => {
    return (
      <AuthProvider>
        <BrowserRouter>
        <div className="bg-white text-black px-20">
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
        </div>
        </BrowserRouter>
      </AuthProvider>
    );
};

export default App;
