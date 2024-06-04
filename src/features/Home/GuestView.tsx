import React from 'react'
import { Link } from 'react-router-dom';
import gif from '../../assets/dating-story.gif'

const GuestView: React.FC = () => {
  return (
    <div className="h-screen w-screen flex flex-wrap flex-row items-center text-center px-40 pb-40">
      <div className="lg:w-1/3" style={{ maxWidth: "100%", height: "auto" }}>
        <img className="" src={gif} alt="hero" />
      </div>
      <div className="lg:w-2/3 bg-white text-black text-left pl-20">
        <h1 className="text-4xl font-bold mb-2">Find Your Pacil Match</h1>
        <p className="text-xl mb-4">Connect with people around you and find your perfect pacilians match.</p>
        <div>
          <Link to="/login">
            <button className="bg-neutral-100 text-blue-500 font-bold py-2 px-4 rounded hover:bg-gray-100 mr-2">Login</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default GuestView