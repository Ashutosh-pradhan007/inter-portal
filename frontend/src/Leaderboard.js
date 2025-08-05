// frontend/src/Leaderboard.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

export default function Leaderboard() {
  const [list, setList] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:4000/api/leaderboard')
      .then(res => setList(res.data.sort((a, b) => b.raised - a.raised)))
      .catch(console.error);
  }, []);

  const getRankLabel = (i) => {
    const rank = i + 1;
    if (rank === 1) return '🥇 1st';
    if (rank === 2) return '🥈 2nd';
    if (rank === 3) return '🥉 3rd';
    return `${rank}th`;
  };

  // Map names to public image paths
  const localImages = {
    'Ashutosh Pradhan': '/images/ashu.jpg',
    'Sudipta Behera': '/images/sipu.jpg',
    'Modi': '/images/modi.jpg'
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-pink-100 py-16 px-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto bg-white bg-opacity-95 p-8 rounded-3xl shadow-2xl border border-gray-200"
      >
        <h2 className="text-4xl font-bold text-center text-purple-700 mb-8">
          Global Leaderboard
        </h2>
        <ol className="space-y-6">
          {list.map((item, index) => (
            <motion.li
              key={index}
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.15 }}
              className={`flex items-center gap-5 p-4 rounded-2xl shadow-md hover:shadow-lg transition bg-white ${
                index === 0
                  ? 'border-l-8 border-yellow-400'
                  : index === 1
                  ? 'border-l-8 border-gray-400'
                  : index === 2
                  ? 'border-l-8 border-orange-400'
                  : ''
              }`}
            >
              <div className="relative flex-shrink-0">
                <span className="absolute -top-3 -left-3 text-2xl">{getRankLabel(index)}</span>
                <img
                  src={localImages[item.name] || item.image}
                  alt={item.name}
                  className="w-16 h-16 rounded-full border-2 border-gray-300 object-cover"
                  onError={e => {
                    e.target.onerror = null;
                    e.target.src = `https://placehold.co/64x64?text=${item.name[0]}`;
                  }}
                />
              </div>
              <div className="flex-1">
                <p className="text-xl font-semibold text-gray-800">{item.name}</p>
                <p className="text-gray-600">₹{item.raised.toLocaleString()} raised</p>
              </div>
            </motion.li>
          ))}
        </ol>
      </motion.div>
    </div>
  );
}








