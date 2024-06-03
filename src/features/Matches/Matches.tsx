import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useGetUsers, { Mahasiswa } from './getAllUsers';
import Cookies from 'js-cookie';

const MatchmakingPage: React.FC = () => {
  const idToken = Cookies.get('access_token');
  const { users } = useGetUsers(idToken || '');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (users.length > 0) {
      setIsLoading(false);
    }
  }, [users]);

  const handleNextProfile = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % users.length);
  };

  const handlePrevProfile = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + users.length) % users.length);
  };

  const handleAcceptUser = () => {
    const acceptedUser = users[currentIndex];
    navigate('/chatroom', { state: { user: acceptedUser } });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <p>Loading...</p>
      </div>
    );
  }

  const currentUser = users[currentIndex];

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-xs">
        <img className="rounded-full w-36 h-36 object-cover mx-auto mb-4" src={currentUser.user_profile.profile_image} alt={`${currentUser.user_detail.full_name}'s photo`} />
        <h2 className="text-xl font-semibold">{currentUser.user_detail.full_name}</h2>
        <p className="text-gray-600">Program Studi: {currentUser.user_detail.organization.study_program}</p>
        <p className="text-gray-600">{currentUser.email}</p>
      </div>
      <div className="mt-4 flex space-x-4">
        <button onClick={handlePrevProfile} className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-400">
          Previous
        </button>
        <button onClick={handleAcceptUser} className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-400">
          Accept
        </button>
        <button onClick={handleNextProfile} className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-400">
          Next
        </button>
      </div>
    </div>
  );
};

export default MatchmakingPage;
