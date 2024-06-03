import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import gif from '../../assets/dating-story.gif'
import { useAuth } from '../Authentication/AuthContext';
import Cookies from 'js-cookie';

const Home: React.FC = () => {
    const idToken = Cookies.get('access_token');
    const navigate = useNavigate();

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
                <h1 className="text-4xl font-bold mb-2">Find Your Pacil Match</h1>
                <p className="text-xl mb-4">Connect with people around you and find your perfect pacilians match.</p>
                <div>
                    {idToken !== "" ? <AuthenticatedContent /> : <GuestContent />}
                </div>
            </div>
        </div>
    );
};

export default Home;
