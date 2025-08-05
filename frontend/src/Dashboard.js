import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

export default function Dashboard({ internName }) {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:4000/api/profile')
      .then(res => setProfile(res.data))
      .catch(console.error);
  }, []);

  if (!profile) return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <p className="text-gray-600 text-lg">Loading…</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-tr from-yellow-100 via-pink-50 to-purple-200 flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.7 }}
        className="relative bg-white p-8 rounded-3xl shadow-neumorphic max-w-md w-full overflow-hidden"
      >
        {/* Decorative circles */}
        <div className="absolute -top-16 -right-16 w-40 h-40 bg-pink-300 rounded-full opacity-30 animate-pulse"></div>
        <div className="absolute -bottom-16 -left-16 w-40 h-40 bg-indigo-300 rounded-full opacity-30 animate-pulse"></div>

        <h2 className="relative text-4xl font-bold text-indigo-800 mb-8 text-center">
          Welcome, {internName}!
        </h2>

        <div className="space-y-6">
          {[
            { label: 'Referral Code', value: profile.referralCode, icon: '🔑' },
            { label: 'Donations Raised', value: `₹${profile.donationsRaised.toLocaleString()}`, icon: '💰' },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: i * 0.2 }}
              className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl shadow-inner hover:shadow-md transition"
            >
              <span className="text-2xl">{item.icon}</span>
              <div>
                <p className="text-sm text-gray-500">{item.label}</p>
                <p className="text-lg font-semibold text-gray-800">{item.value}</p>
              </div>
            </motion.div>
          ))}

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="p-4 bg-green-50 rounded-xl shadow-inner flex flex-wrap gap-3"
          >
            <span className="w-full text-sm text-gray-500 mb-2">Rewards Unlocked</span>
            {profile.rewards.map((r, i) => (
              <motion.span
                key={i}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.6 + i * 0.1 }}
                className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow hover:bg-green-100 cursor-default"
              >
                <span>🏅</span> <span className="font-medium">{r}</span>
              </motion.span>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}







