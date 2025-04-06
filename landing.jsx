import React from 'react';
import { Link } from 'react-router-dom'; // Link to navigate to token creation page

const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white p-6">
      <h1 className="text-4xl font-bold text-purple-300 mb-4">Welcome to SolSendors</h1>
      <p className="text-gray-300 mb-6 max-w-xl mx-auto">
        Launch tokens on Solana with ease. Set your token name, supply, tax, rev share, and more.
      </p>
      <Link to="/create-token">
        <button className="bg-purple-600 px-6 py-3 rounded-md text-white font-bold hover:bg-purple-700">
          Create Token
        </button>
      </Link>
    </div>
  );
};

export default LandingPage;
