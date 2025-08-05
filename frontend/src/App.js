import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Dashboard from './Dashboard';
import Leaderboard from './Leaderboard';

export default function App() {
  const [internName, setInternName] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  if (!loggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center px-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="bg-white bg-opacity-90 backdrop-blur-lg rounded-3xl shadow-2xl max-w-sm w-full p-8"
        >
          <h1 className="text-4xl font-extrabold text-center text-indigo-700 mb-6">
            Intern Portal
          </h1>
          <motion.input
            type="text"
            placeholder="Enter your name"
            value={internName}
            onChange={e => setInternName(e.target.value)}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="w-full p-3 mb-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-indigo-400 transition"
          />
          <motion.button
            onClick={() => setLoggedIn(true)}
            disabled={!internName.trim()}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className={`w-full py-3 rounded-xl text-white font-semibold transition 
              ${internName.trim()
                ? 'bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600'
                : 'bg-gray-400 cursor-not-allowed'}`}
          >
            Sign In
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <nav className="bg-white shadow-md py-3 mb-6">
        <div className="max-w-3xl mx-auto flex justify-center gap-8">
          <Link className="text-gray-600 hover:text-indigo-700 font-medium" to="/">Dashboard</Link>
          <Link className="text-gray-600 hover:text-indigo-700 font-medium" to="/leaderboard">Leaderboard</Link>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Dashboard internName={internName.trim()} />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
      </Routes>
    </BrowserRouter>
  );
}

