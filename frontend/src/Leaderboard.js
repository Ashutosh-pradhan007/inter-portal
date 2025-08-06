import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Medal, Crown, TrendingUp, Users, DollarSign, Star, Award, TrendingDown, Calendar, Clock } from 'lucide-react';
// Fallback icons in case lucide-react fails
// import { Trophy, Medal, Crown, TrendingUp, Users, DollarSign, Star, Award, TrendingDown, Calendar, Clock } from './components/SimpleIcons';

export default function Leaderboard() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTimeframe, setSelectedTimeframe] = useState('all');

  useEffect(() => {
    setLoading(true);
    axios.get('http://localhost:4000/api/leaderboard')
      .then(res => {
        const sorted = res.data.sort((a, b) => b.raised - a.raised);
        setList(sorted);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError('Failed to load leaderboard data');
        setLoading(false);
      });
  }, []);

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1:
        return <Crown className="w-8 h-8 text-yellow-500" />;
      case 2:
        return <Medal className="w-8 h-8 text-gray-400" />;
      case 3:
        return <Trophy className="w-8 h-8 text-orange-500" />;
      default:
        return <span className="text-2xl font-bold text-gray-400">#{rank}</span>;
    }
  };

  const getRankBadge = (rank) => {
    switch (rank) {
      case 1:
        return 'bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-white shadow-lg';
      case 2:
        return 'bg-gradient-to-r from-gray-400 via-gray-500 to-gray-600 text-white shadow-lg';
      case 3:
        return 'bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 text-white shadow-lg';
      default:
        return 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-600';
    }
  };

  const getRankGradient = (rank) => {
    switch (rank) {
      case 1:
        return 'from-yellow-50 to-yellow-100 border-yellow-200';
      case 2:
        return 'from-gray-50 to-gray-100 border-gray-200';
      case 3:
        return 'from-orange-50 to-orange-100 border-orange-200';
      default:
        return 'from-white to-gray-50 border-gray-200';
    }
  };

  // Map API names to local image paths
  const localImages = {
    'Ashutosh Pradhan': '/images/ashu.jpg',
    'Sudipta Behera':   '/images/sipu.jpg',
    'Priya Singh':      '/images/modi.jpg',
    'Neha Gupta':       '/images/neha.svg',
    'Rahul Sharma':     '/images/rahul.svg'
  };

  // Override display names for certain entries
  const displayNames = {
    'Priya Singh': 'Modi Ji'
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full mx-auto mb-6"
          />
          <p className="text-gray-600 text-lg font-medium">Loading leaderboard...</p>
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center bg-red-50 p-8 rounded-3xl border border-red-200 max-w-md"
        >
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <TrendingDown className="w-8 h-8 text-red-600" />
          </div>
          <h3 className="text-xl font-semibold text-red-800 mb-2">Oops!</h3>
          <p className="text-red-600">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-6 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors"
          >
            Try Again
          </button>
        </motion.div>
      </div>
    );
  }

  const totalRaised = list.reduce((sum, item) => sum + item.raised, 0);
  const averageRaised = totalRaised / list.length || 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-center mb-12"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="w-24 h-24 bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl"
        >
          <Trophy className="w-12 h-12 text-white" />
        </motion.div>
        <h1 className="text-5xl font-bold bg-gradient-to-r from-yellow-600 via-orange-600 to-red-600 bg-clip-text text-transparent mb-4">
          Global Leaderboard
        </h1>
        <p className="text-gray-600 text-xl">See how you rank among top performers</p>
      </motion.div>

      {/* Timeframe Selector */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="flex justify-center mb-8"
      >
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-2">
          {['all', 'month', 'week'].map((timeframe) => (
            <button
              key={timeframe}
              onClick={() => setSelectedTimeframe(timeframe)}
              className={`px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                selectedTimeframe === timeframe
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                  : 'text-gray-600 hover:text-purple-600 hover:bg-purple-50'
              }`}
            >
              {timeframe.charAt(0).toUpperCase() + timeframe.slice(1)}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Stats Overview */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
      >
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Participants</p>
              <p className="text-2xl font-bold text-gray-900">{list.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Raised</p>
              <p className="text-2xl font-bold text-gray-900">₹{totalRaised.toLocaleString()}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Average</p>
              <p className="text-2xl font-bold text-gray-900">₹{averageRaised.toLocaleString()}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-2xl flex items-center justify-center">
              <Star className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Top Performer</p>
              <p className="text-2xl font-bold text-gray-900">{list[0]?.name || 'N/A'}</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Leaderboard */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden"
      >
        <div className="p-8 border-b border-gray-100 bg-gradient-to-r from-purple-50 to-pink-50">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold text-gray-900">Top Performers</h3>
              <p className="text-gray-600">Ranked by total donations raised</p>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Clock className="w-4 h-4" />
              <span>Updated {new Date().toLocaleDateString()}</span>
            </div>
          </div>
        </div>
        
        <div className="divide-y divide-gray-100">
          <AnimatePresence>
            {list.map((item, index) => {
              const rank = index + 1;
              const nameToShow = displayNames[item.name] || item.name;
              
              return (
                <motion.div
                  key={index}
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.01, backgroundColor: '#f8fafc' }}
                  className={`flex items-center gap-6 p-6 hover:bg-gray-50 transition-all duration-300 bg-gradient-to-r ${getRankGradient(rank)}`}
                >
                  {/* Rank */}
                  <div className="flex-shrink-0">
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${getRankBadge(rank)}`}>
                      {getRankIcon(rank)}
                    </div>
                  </div>

                  {/* Avatar */}
                  <div className="flex-shrink-0">
                    <div className="relative">
                      <img
                        src={localImages[item.name] || item.image}
                        alt={nameToShow}
                        className="w-16 h-16 rounded-2xl border-4 border-white shadow-lg object-cover"
                        onError={e => {
                          e.target.onerror = null;
                          e.target.src = `https://placehold.co/64x64?text=${nameToShow[0]}`;
                        }}
                      />
                      {rank <= 3 && (
                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                          <Award className="w-3 h-3 text-white" />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <p className="text-xl font-bold text-gray-900 truncate">{nameToShow}</p>
                      {rank <= 3 && (
                        <span className="px-2 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold rounded-full">
                          TOP {rank}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span>Rank #{rank}</span>
                      <span>•</span>
                      <span>₹{item.raised.toLocaleString()} raised</span>
                    </div>
                  </div>

                  {/* Amount */}
                  <div className="flex-shrink-0 text-right">
                    <p className="text-3xl font-bold text-gray-900">₹{item.raised.toLocaleString()}</p>
                    <p className="text-sm text-gray-500">total raised</p>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {list.length === 0 && (
          <div className="p-12 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Trophy className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No entries yet</h3>
            <p className="text-gray-600">Be the first to make a donation!</p>
          </div>
        )}
      </motion.div>
    </div>
  );
}









