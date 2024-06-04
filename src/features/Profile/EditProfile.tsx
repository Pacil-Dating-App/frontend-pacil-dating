import React, { useState } from 'react';
import { User } from './Profile';

interface EditProfileProps {
    user: User;
}

const EditProfile: React.FC<EditProfileProps> = ({ user }) => {
    const [formData, setFormData] = useState<User>(user);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/edit-profile', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            // Handle successful response (e.g., redirect to profile page, show success message, etc.)
            alert('Profile updated successfully!');
        } catch (error) {
            console.error('Error:', error);
            // Handle error (e.g., show error message)
        }
    };

    return (
        <div className="max-w-md mx-auto bg-white shadow-md rounded-lg overflow-hidden md:max-w-2xl p-8">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">Edit Profile</h2>
            <form onSubmit={handleSubmit}>
                <label className="block mb-2">
                    Username:
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                    />
                </label>
                <label className="block mb-2">
                    Name:
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                    />
                </label>
                <label className="block mb-2">
                    Age:
                    <input
                        type="number"
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                    />
                </label>
                <label className="block mb-2">
                    Email:
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                    />
                </label>
                <label className="block mb-2">
                    Bio:
                    <textarea
                        name="bio"
                        value={formData.bio}
                        onChange={handleChange}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                    />
                </label>
                <label className="block mb-2">
                    Description:
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                    />
                </label>
                <label className="block mb-2">
                    Major:
                    <input
                        type="text"
                        name="major"
                        value={formData.major}
                        onChange={handleChange}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                    />
                </label>
                <label className="block mb-2">
                    Year of Study:
                    <input
                        type="text"
                        name="year_of_study"
                        value={formData.year_of_study}
                        onChange={handleChange}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                    />
                </label>
                <label className="block mb-2">
                    Interests:
                    <input
                        type="text"
                        name="interests"
                        value={formData.interests.join(', ')}
                        onChange={handleChange}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                    />
                </label>
                <label className="block mb-2">
                    Profile Image URL:
                    <input
                        type="text"
                        name="profile_image"
                        value={formData.profile_image}
                        onChange={handleChange}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                    />
                </label>
                <button
                    type="submit"
                    className="mt-4 bg-indigo-500 text-white px-4 py-2 rounded"
                >
                    Save Changes
                </button>
            </form>
        </div>
    );
};

export default EditProfile;
