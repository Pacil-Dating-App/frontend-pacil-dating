import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useGetMe from './getMeUser';
import Cookies from 'js-cookie';

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

const UserProfile: React.FC = () => {
    const navigate = useNavigate();
    const idToken = Cookies.get('access_token');
    const { me } = useGetMe(idToken || '');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (me != null) {
          setIsLoading(false);
        }
      }, [me]);

    const handleEditClick = () => {
        navigate('/edit-profile');
    };

    const currentUser = me

    if (isLoading) {
        return (
          <div className="flex items-center justify-center h-screen bg-gray-100">
            <p>Loading...</p>
          </div>
        );
      }

    return (
        <div className="max-w-md mx-auto bg-white shadow-md rounded-lg overflow-hidden md:max-w-2xl">
            <div className="md:flex">
                <div className="md:flex-shrink-0">
                    {/* <img className="h-48 w-full object-cover md:w-48" src={me.profile_image} alt={`${user.name}'s profile`} /> */}
                </div>
                <div className="p-8">
                    <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">{currentUser?.name}</div>
                    <p className="mt-2 text-gray-500">Age: {currentUser?.age}</p>
                    <p className="mt-2 text-gray-500">Email: {currentUser?.email}</p>
                    <p className="mt-2 text-gray-500">Major: {currentUser?.major}</p>
                    <p className="mt-2 text-gray-500">Year of Study: {currentUser?.year_of_study}</p>
                    <p className="mt-2 text-gray-500">Bio: {currentUser?.bio}</p>
                    <p className="mt-2 text-gray-500">Description: {currentUser?.description}</p>
                    <div className="mt-4">
                        <h2 className="text-sm font-semibold text-gray-700">Interests</h2>
                        <ul className="list-disc list-inside">
                            {currentUser?.interests.map((interest, index) => (
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
