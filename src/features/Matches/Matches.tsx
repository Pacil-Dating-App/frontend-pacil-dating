// src/MatchmakingPage.tsx
import React, { useState } from 'react';
import ChatRoom from '../Chat/ChatRoom';

interface UserProfile {
  id: number;
  name: string;
  age: number;
  bio: string;
  photo: string;
}

const userProfiles: UserProfile[] = [
  {
    id: 1,
    name: 'Alice',
    age: 25,
    bio: 'Loves hiking and outdoor adventures.',
    photo: 'https://via.placeholder.com/150',
  },
  {
    id: 2,
    name: 'Bob',
    age: 30,
    bio: 'Enjoys cooking and trying out new recipes.',
    photo: 'https://via.placeholder.com/150',
  },
  // Add more profiles as needed
];

const MatchmakingPage: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [acceptedUser, setAcceptedUser] = useState<UserProfile | null>(null);

  const handleNextProfile = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % userProfiles.length);
  };

  const handlePrevProfile = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + userProfiles.length) % userProfiles.length);
  };

  const handleAcceptUser = () => {
    setAcceptedUser(userProfiles[currentIndex]);
  };

  if (acceptedUser) {
    return <ChatRoom user={acceptedUser} />;
  }

  const currentUser = userProfiles[currentIndex];

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-xs">
        <img className="rounded-full w-36 h-36 object-cover mx-auto mb-4" src={currentUser.photo} alt={`${currentUser.name}'s photo`} />
        <h2 className="text-xl font-semibold">{currentUser.name}</h2>
        <p className="text-gray-600">Age: {currentUser.age}</p>
        <p className="text-gray-600">{currentUser.bio}</p>
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
