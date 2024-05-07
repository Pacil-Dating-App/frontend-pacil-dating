import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import gif from '../../assets/dating-story.gif'
import { useAuth } from '../Authentication/AuthContext';

const Home: React.FC = () => {
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();

    // Components for authenticated and guest users
    const AuthenticatedContent = () => (
        <div className=''>
            <div className='mb-8'>
                <Link to="/matches">
                    <button className="bg-neutral-100 text-primary-500 font-bold py-2 px-4 rounded hover:bg-gray-100 mr-2">Explore</button>
                </Link>
                <Link to="/explore">
                    <button className="bg-neutral-100 text-primary-500 font-bold py-2 px-4 rounded hover:bg-gray-100 mr-2">Matches</button>
                </Link>
                <Link to="/profile">
                    <button className="bg-white text-ternary-500 font-bold py-2 px-4 rounded hover:bg-gray-100 mr-2">Profile</button>
                </Link>
            </div>
        </div>
    );
    
    const GuestContent = () => (
        <Link to="/login">
            <button className="bg-neutral-100 text-blue-500 font-bold py-2 px-4 rounded hover:bg-gray-100 mr-2">Login</button>
        </Link>
    );
    
    return (
        <div className="h-screen w-screen flex flex-wrap flex-row items-center text-center px-40 pb-40">
            <div className="lg:w-1/3" style={{ maxWidth: "100%", height: "auto" }}>
                <img className="" src={gif} alt="hero" />
            </div>
            <div className="lg:w-2/3 bg-white text-black text-left pl-20">
                <h1 className="text-4xl font-bold mb-2">Pacil Dating App</h1>
                <p className="text-xl mb-4">Connect with people around you and find your perfect match.</p>
                <div>
                    {isAuthenticated ? <AuthenticatedContent /> : <GuestContent />}
                </div>
            </div>
        </div>
    );
};

export default Home;
