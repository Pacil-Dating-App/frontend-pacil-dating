import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './features/Home/Home';
import Profile from './features/Profile/Profile';
import Matches from './features/Matches/Matches';

const App: React.FC = () => {
    return (
        <Router>
            <nav>
                <Link to="/">Home</Link>
                <Link to="/profile">Profile</Link>
                <Link to="/matches">Matches</Link>
            </nav>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/matches" element={<Matches />} />
            </Routes>
        </Router>
    );
};

export default App;
