import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Mahasiswa } from './getAllUsers';

const MahasiswaDetailPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = location.state as { user: Mahasiswa };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-md">
        <img className="rounded-full w-36 h-36 object-cover mx-auto mb-4" src={user.user_profile.profile_image} alt={`${user.user_detail.full_name}'s photo`} />
        <h2 className="text-xl font-semibold">{user.user_detail.full_name}</h2>
        <p className="text-gray-600">Program Studi: {user.user_detail.organization.study_program}</p>
        <p className="text-gray-600">{user.email}</p>
        <p className="text-gray-600">Bio: {user.user_profile.about}</p>
        <p className="text-gray-600">Experiences: {user.user_profile.experiences}</p>
        {/* Add more details as needed */}
        <button onClick={handleBack} className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-400">
          Back
        </button>
      </div>
    </div>
  );
};

export default MahasiswaDetailPage;
