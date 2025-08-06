import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, BarChart3, LogOut, User, TrendingUp, Settings, Bell, Search, Menu, X } from 'lucide-react';
// Fallback icons in case lucide-react fails
// import { Home, BarChart3, LogOut, User, TrendingUp, Settings, Bell, Search, Menu, X } from '../SimpleIcons';

export default function Navigation({ internName, onLogout }) {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const navItems = [
    { path: '/', label: 'Dashboard', icon: Home },
    { path: '/leaderboard', label: 'Leaderboard', icon: BarChart3 },
    { path: '/analytics', label: 'Analytics', icon: TrendingUp },
    { path: '/settings', label: 'Settings', icon: Settings },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white/80 backdrop-blur-xl border-b border-white/20 sticky top-0 z-50 shadow-lg"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo and Brand */}
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="flex items-center space-x-4"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-purple-600 via-pink-600 to-red-600 rounded-2xl flex items-center justify-center shadow-lg">
                <User className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Intern Portal Pro
                </span>
                <p className="text-xs text-gray-500 -mt-1">Enterprise Edition</p>
              </div>
            </motion.div>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;

                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`relative px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                      isActive
                        ? 'text-purple-700 bg-purple-50 shadow-md'
                        : 'text-gray-600 hover:text-purple-600 hover:bg-purple-50/50'
                    }`}
                  >
                    <motion.div
                      className="flex items-center space-x-2"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </motion.div>
                    {isActive && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 bg-purple-50 rounded-xl border border-purple-200"
                        initial={false}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Right side actions */}
            <motion.div
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="flex items-center space-x-3"
            >
              {/* Search */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 text-gray-500 hover:text-purple-600 hover:bg-purple-50 rounded-xl transition-colors"
                title="Search"
              >
                <Search className="w-4 h-4" />
              </motion.button>

              {/* Notifications */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2 text-gray-500 hover:text-purple-600 hover:bg-purple-50 rounded-xl transition-colors relative"
                title="Notifications"
              >
                <Bell className="w-4 h-4" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
              </motion.button>

              {/* User Info */}
              <div className="hidden sm:flex items-center space-x-3">
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-900">{internName}</p>
                  <p className="text-xs text-gray-500">Premium Member</p>
                </div>
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                  <span className="text-xs font-bold text-white">{internName[0]}</span>
                </div>
              </div>

              {/* Logout */}
              <motion.button
                onClick={onLogout}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                title="Sign Out"
              >
                <LogOut className="w-4 h-4" />
              </motion.button>

              {/* Mobile menu button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 text-gray-500 hover:text-purple-600 hover:bg-purple-50 rounded-xl transition-colors"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </motion.div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white/95 backdrop-blur-xl border-t border-gray-200"
            >
              <div className="px-4 py-4 space-y-2">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.path;

                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                        isActive
                          ? 'text-purple-700 bg-purple-50'
                          : 'text-gray-600 hover:text-purple-600 hover:bg-purple-50'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Notifications Dropdown */}
      <AnimatePresence>
        {showNotifications && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-16 right-4 z-50 w-80 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden"
          >
            <div className="p-4 border-b border-gray-100">
              <h3 className="font-semibold text-gray-900">Notifications</h3>
            </div>
            <div className="p-4">
              <div className="space-y-3">
                <div className="flex items-start space-x-3 p-3 bg-purple-50 rounded-xl">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Welcome to Intern Portal Pro!</p>
                    <p className="text-xs text-gray-500">You've successfully logged in.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-xl">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">New Achievement Unlocked</p>
                    <p className="text-xs text-gray-500">You've earned the "First Steps" badge.</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
} 