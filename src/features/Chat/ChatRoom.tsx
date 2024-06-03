// src/ChatRoom.tsx
import React from 'react';
import { useLocation } from 'react-router-dom';
import { Mahasiswa } from '../Matches/getAllUsers';

const ChatRoom: React.FC = () => {
  const location = useLocation();
  const { user } = location.state as { user: Mahasiswa };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-xs">
        <h2 className="text-xl font-semibold">Chat with {user.user_detail.full_name}</h2>
        <div className="mt-4">
          {/* Placeholder for chat messages */}
          <div className="h-64 bg-gray-200 rounded-lg p-4">Chat messages here</div>
        </div>
        <div className="mt-4">
          <input
            type="text"
            placeholder="Type your message..."
            className="border rounded-lg p-2 w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;
