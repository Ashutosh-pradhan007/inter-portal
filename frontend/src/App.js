import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Sparkles, Shield, Zap, Globe } from 'lucide-react';
// Fallback icons in case lucide-react fails
// import { User, Sparkles, Shield, Zap, Globe } from './components/SimpleIcons';
import Dashboard from './Dashboard';
import Leaderboard from './Leaderboard';
import Analytics from './Analytics';
import Settings from './Settings';
import Navigation from './components/Navigation';

export default function App() {
  const [internName, setInternName] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!internName.trim()) return;
    
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);
    setLoggedIn(true);
  };

  if (!loggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center px-4 relative overflow-hidden">
        {/* Premium animated background */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{ 
              rotate: 360,
              scale: [1, 1.1, 1],
            }}
            transition={{ 
              duration: 20, 
              repeat: Infinity, 
              ease: "linear",
              scale: { duration: 8, repeat: Infinity, ease: "easeInOut" }
            }}
            className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-3xl"
          />
          <motion.div
            animate={{ 
              rotate: -360,
              scale: [1, 1.2, 1],
            }}
            transition={{ 
              duration: 25, 
              repeat: Infinity, 
              ease: "linear",
              scale: { duration: 10, repeat: Infinity, ease: "easeInOut" }
            }}
            className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl"
          />
          <motion.div
            animate={{ 
              y: [0, -20, 0],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{ 
              duration: 6, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-br from-emerald-500/30 to-teal-500/30 rounded-full blur-2xl"
          />
        </div>

        {/* Floating particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                y: [0, -100, 0],
                x: [0, Math.random() * 100 - 50, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
              className="absolute w-1 h-1 bg-white/30 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>

        <motion.div
          initial={{ scale: 0.8, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
          className="relative bg-white/10 backdrop-blur-2xl rounded-3xl shadow-2xl max-w-md w-full p-8 border border-white/20"
        >
          {/* Header */}
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-center mb-8"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
              className="w-20 h-20 bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl"
            >
              <Globe className="w-10 h-10 text-white" />
            </motion.div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-2">
              Intern Portal Pro
            </h1>
            <p className="text-gray-300 text-lg font-medium">Enterprise-grade intern management</p>
            <div className="flex items-center justify-center gap-4 mt-4">
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Shield className="w-4 h-4" />
                <span>Secure</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Zap className="w-4 h-4" />
                <span>Fast</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Sparkles className="w-4 h-4" />
                <span>Premium</span>
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="space-y-6"
          >
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-3">
                Enter Your Name
              </label>
              <motion.div
                whileFocus={{ scale: 1.02 }}
                className="relative"
              >
                <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Your full name"
                  value={internName}
                  onChange={e => setInternName(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && internName.trim() && handleLogin()}
                  className="w-full pl-12 pr-4 py-4 bg-white/10 border-2 border-white/20 rounded-2xl focus:outline-none focus:border-purple-400 focus:ring-4 focus:ring-purple-400/20 transition-all duration-300 text-white placeholder-gray-400 backdrop-blur-sm"
                />
              </motion.div>
            </div>

            <motion.button
              onClick={handleLogin}
              disabled={!internName.trim() || isLoading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full py-4 px-6 rounded-2xl font-bold text-white transition-all duration-300 relative overflow-hidden ${
                internName.trim() && !isLoading
                  ? 'bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 hover:from-purple-700 hover:via-pink-700 hover:to-red-700 shadow-2xl hover:shadow-purple-500/25'
                  : 'bg-gray-600 cursor-not-allowed'
              }`}
            >
              {isLoading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full mx-auto"
                />
              ) : (
                <motion.div
                  className="flex items-center justify-center space-x-3"
                  whileHover={{ scale: 1.05 }}
                >
                  <Sparkles className="w-5 h-5" />
                  <span>Access Portal</span>
                </motion.div>
              )}
            </motion.button>
          </motion.div>

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-center mt-8 pt-6 border-t border-white/10"
          >
            <p className="text-xs text-gray-400">
              © 2024 Intern Portal Pro. Enterprise-grade intern management platform.
            </p>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <Navigation
          internName={internName.trim()}
          onLogout={() => setLoggedIn(false)}
        />
        <main className="pt-6">
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Dashboard internName={internName.trim()} />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </AnimatePresence>
        </main>
      </div>
    </BrowserRouter>
  );
}

