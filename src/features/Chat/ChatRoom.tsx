// src/ChatRoom.tsx
import React from 'react';

interface ChatRoomProps {
  user: { id: number; name: string };
}

const ChatRoom: React.FC<ChatRoomProps> = ({ user }) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-xs">
        <h2 className="text-xl font-semibold">Chat with {user.name}</h2>
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
