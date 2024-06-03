// src/MatchmakingPage.tsx
import React, { useState } from 'react';
import ChatRoom from '../Chat/ChatRoom';
import useGetUsers, { User } from './getAllUsers';
import Cookies from 'js-cookie';

// const users: User[] = [
//   {
//     id: 2,
//     username: "mikasuryo",
//     name: "Mika Suryofakhri R",
//     age: 25,
//     email: "mika@gmail.com",
//     bio: "Tesitng",
//     description: "Lorem ipsum",
//     profile_image: "",
//     major: "Computer Science",
//     year_of_study: "2020",
//     interests: []
//   },
//   {
//     id: 3,
//     username: "john_doe",
//     name: "John Doe",
//     age: 22,
//     email: "john@example.com",
//     bio: "Aspiring software engineer",
//     description: "Lorem ipsum dolor sit amet",
//     profile_image: "john_doe.jpg",
//     major: "Software Engineering",
//     year_of_study: "2021",
//     interests: ["coding", "gaming", "reading"]
//   },
//   {
//     id: 4,
//     username: "jane_smith",
//     name: "Jane Smith",
//     age: 24,
//     email: "jane@example.com",
//     bio: "Loves data science",
//     description: "Consectetur adipiscing elit",
//     profile_image: "jane_smith.jpg",
//     major: "Data Science",
//     year_of_study: "2019",
//     interests: ["data analysis", "machine learning", "hiking"]
//   },
//   {
//     id: 5,
//     username: "alice_wonder",
//     name: "Alice Wonder",
//     age: 23,
//     email: "alice@example.com",
//     bio: "Tech enthusiast",
//     description: "Sed do eiusmod tempor",
//     profile_image: "alice_wonder.jpg",
//     major: "Information Technology",
//     year_of_study: "2020",
//     interests: ["tech blogs", "AI", "traveling"]
//   },
//   {
//     id: 6,
//     username: "bob_builder",
//     name: "Bob Builder",
//     age: 21,
//     email: "bob@example.com",
//     bio: "Future civil engineer",
//     description: "Ut labore et dolore magna",
//     profile_image: "bob_builder.jpg",
//     major: "Civil Engineering",
//     year_of_study: "2022",
//     interests: ["construction", "architecture", "photography"]
//   }
// ];

const MatchmakingPage: React.FC = () => {
  const idToken = Cookies.get('access_token');
  const { users } = useGetUsers(idToken || '');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [acceptedUser, setAcceptedUser] = useState<User | null>(null);

  const handleNextProfile = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % users.length);
  };

  const handlePrevProfile = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + users.length) % users.length);
  };

  const handleAcceptUser = () => {
    setAcceptedUser(users[currentIndex]);
  };


  if (acceptedUser) {
    return <ChatRoom user={acceptedUser} />;
  }

  const currentUser = users[currentIndex];

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-xs">
        <img className="rounded-full w-36 h-36 object-cover mx-auto mb-4" src={currentUser.profile_image} alt={`${currentUser.name}'s photo`} />
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
