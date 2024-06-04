import React from 'react';
import './index.css'
import { BrowserRouter as Router, Routes, Route, Link, BrowserRouter } from 'react-router-dom';
import Home from './features/Home/Home';
import Profile, { User } from './features/Profile/Profile';
import Matches from './features/Matches/Matches';
import Login from './features/Authentication/Login';
import { AuthProvider } from './features/Authentication/AuthContext';
import Registration from './features/Authentication/Registration';
import ChatRoom from './features/Chat/ChatRoom';
import MahasiswaDetailPage from './features/Matches/MatchDetailProfile';
import EditProfile from './features/Profile/EditProfile';

const user: User = {
  id: 1,
  username: 'johndoe',
  name: 'John Doe',
  age: 25,
  email: 'johndoe@example.com',
  bio: 'A passionate developer.',
  description: 'Loves coding, music, and coffee.',
  profile_image: 'https://example.com/profile.jpg',
  major: 'Computer Science',
  year_of_study: 'Senior',
  interests: ['Coding', 'Music', 'Coffee']
};


const App: React.FC = () => {
    return (
      <AuthProvider>
        <BrowserRouter>
        <div className="bg-white text-black px-20">
          <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login"element={<Login />} />
              <Route path="/profile" element={<Profile/>} />
              <Route path="/matches" element={<Matches />} />
              <Route path="/signup" element={<Registration />} />
              <Route path="/chatroom" element={<ChatRoom />} />
              <Route path="/mahasiswa-detail" element={<MahasiswaDetailPage />} />
              <Route path="/edit-profile" element={<EditProfile/>} />
          </Routes>
        </div>
        </BrowserRouter>
      </AuthProvider>
    );
};

export default App;
