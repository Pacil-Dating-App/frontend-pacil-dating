import React from 'react';
import { useNavigate } from 'react-router-dom';

export interface User {
    id: number;
    username: string;
    name: string;
    age: number;
    email: string;
    bio: string;
    description: string;
    profile_image: string;
    major: string;
    year_of_study: string;
    interests: string[];
}

interface UserProfileProps {
    user: User;
}

const UserProfile: React.FC<UserProfileProps> = ({ user }) => {
    const navigate = useNavigate();

    const handleEditClick = () => {
        navigate('/edit-profile');
    };

    return (
        <div className="max-w-md mx-auto bg-white shadow-md rounded-lg overflow-hidden md:max-w-2xl">
            <div className="md:flex">
                <div className="md:flex-shrink-0">
                    <img className="h-48 w-full object-cover md:w-48" src={user.profile_image} alt={`${user.name}'s profile`} />
                </div>
                <div className="p-8">
                    <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">{user.username}</div>
                    <h1 className="block mt-1 text-lg leading-tight font-medium text-black">{user.name}</h1>
                    <p className="mt-2 text-gray-500">Age: {user.age}</p>
                    <p className="mt-2 text-gray-500">Email: {user.email}</p>
                    <p className="mt-2 text-gray-500">Major: {user.major}</p>
                    <p className="mt-2 text-gray-500">Year of Study: {user.year_of_study}</p>
                    <p className="mt-2 text-gray-500">Bio: {user.bio}</p>
                    <p className="mt-2 text-gray-500">Description: {user.description}</p>
                    <div className="mt-4">
                        <h2 className="text-sm font-semibold text-gray-700">Interests</h2>
                        <ul className="list-disc list-inside">
                            {user.interests.map((interest, index) => (
                                <li key={index} className="text-gray-500">{interest}</li>
                            ))}
                        </ul>
                    </div>
                    <button
                        onClick={handleEditClick}
                        className="mt-4 bg-indigo-500 text-white px-4 py-2 rounded"
                    >
                        Edit Profile
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
