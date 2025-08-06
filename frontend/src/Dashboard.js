import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, Gift, Target, Award, Activity, Users, DollarSign, Calendar, Clock, Star, Zap, TrendingDown } from 'lucide-react';
// Fallback icons in case lucide-react fails
// import { TrendingUp, Gift, Target, Award, Activity, Users, DollarSign, Calendar, Clock, Star, Zap, TrendingDown } from './components/SimpleIcons';
import ProgressBar from './components/ProgressBar';
import NotificationCard from './components/NotificationCard';
import ActivityFeed from './components/ActivityFeed';
import GoalCard from './components/GoalCard';

export default function Dashboard({ internName }) {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  const [goals, setGoals] = useState([
    {
      id: 1,
      title: "Monthly Goal",
      description: "Raise ₹50,000 this month",
      current: 35000,
      target: 50000,
      deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
    },
    {
      id: 2,
      title: "Weekly Target",
      description: "Raise ₹10,000 this week",
      current: 7500,
      target: 10000,
      deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    }
  ]);
  const [activities, setActivities] = useState([
    {
      id: 1,
      type: "donation",
      title: "New Donation",
      description: "You received a donation of ₹5,000",
      amount: 5000,
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000)
    },
    {
      id: 2,
      type: "achievement",
      title: "Milestone Reached",
      description: "Congratulations! You've raised ₹25,000",
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000)
    },
    {
      id: 3,
      type: "referral",
      title: "New Referral",
      description: "Someone used your referral code",
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
    }
  ]);

  useEffect(() => {
    setLoading(true);
    axios.get('http://localhost:4000/api/profile')
      .then(res => {
        setProfile(res.data);
        setLoading(false);
        
        // Simulate notifications
        setTimeout(() => {
          setNotifications([
            {
              id: 1,
              type: "success",
              title: "Welcome to Intern Portal Pro!",
              message: "You're now using the premium version with advanced features.",
              duration: 5000
            }
          ]);
          setShowNotification(true);
        }, 1000);
      })
      .catch(err => {
        console.error(err);
        setError('Failed to load profile data');
        setLoading(false);
      });
  }, []);

  const handleGoalUpdate = (updatedGoal) => {
    setGoals(goals.map(goal => 
      goal.id === updatedGoal.id ? updatedGoal : goal
    ));
  };

  const handleGoalComplete = (goalId) => {
    setGoals(goals.filter(goal => goal.id !== goalId));
    setActivities(prev => [
      {
        id: Date.now(),
        type: "achievement",
        title: "Goal Completed!",
        description: "You've successfully completed a goal!",
        timestamp: new Date()
      },
      ...prev
    ]);
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
          <p className="text-gray-600 text-lg font-medium">Loading your dashboard...</p>
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

  const stats = [
    {
      label: 'Total Raised',
      value: '₹25,000',
      change: '+12.5%',
      changeType: 'positive',
      icon: DollarSign,
      color: 'from-green-500 to-green-600'
    },
    {
      label: 'This Month',
      value: '₹8,500',
      change: '+8.2%',
      changeType: 'positive',
      icon: TrendingUp,
      color: 'from-blue-500 to-blue-600'
    },
    {
      label: 'Donors',
      value: '45',
      change: '+5',
      changeType: 'positive',
      icon: Users,
      color: 'from-purple-500 to-purple-600'
    },
    {
      label: 'Avg. Donation',
      value: '₹556',
      change: '+15.3%',
      changeType: 'positive',
      icon: Target,
      color: 'from-orange-500 to-orange-600'
    }
  ];

  const quickActions = [
    {
      title: 'Share Campaign',
      description: 'Spread the word about your cause',
      icon: Users,
      color: 'from-purple-500 to-purple-600',
      action: () => console.log('Share campaign')
    },
    {
      title: 'View Analytics',
      description: 'Check your performance metrics',
      icon: TrendingUp,
      color: 'from-blue-500 to-blue-600',
      action: () => window.location.href = '/analytics'
    },
    {
      title: 'Set Goals',
      description: 'Create new fundraising targets',
      icon: Target,
      color: 'from-green-500 to-green-600',
      action: () => console.log('Set goals')
    },
    {
      title: 'Rewards',
      description: 'Check your earned badges',
      icon: Gift,
      color: 'from-pink-500 to-pink-600',
      action: () => console.log('Rewards')
    }
  ];

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
          className="w-24 h-24 bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl"
        >
          <Star className="w-12 h-12 text-white" />
        </motion.div>
        <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 bg-clip-text text-transparent mb-4">
          Welcome back, {internName}! 👋
        </h1>
        <p className="text-gray-600 text-xl">Here's what's happening with your campaign today</p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <AnimatePresence>
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ x: index % 2 === 0 ? -50 : 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02, y: -5 }}
                className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 hover:shadow-2xl transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center shadow-lg`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className={`flex items-center gap-1 text-sm font-semibold ${
                    stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stat.changeType === 'positive' ? (
                      <TrendingUp className="w-4 h-4" />
                    ) : (
                      <TrendingDown className="w-4 h-4" />
                    )}
                    {stat.change}
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Goals Section */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2"
        >
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center">
                <Target className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900">Your Goals</h3>
                <p className="text-gray-600 text-sm">Track your progress and achievements</p>
              </div>
            </div>

            <div className="space-y-6">
              {goals.map((goal) => (
                <GoalCard
                  key={goal.id}
                  goal={goal}
                  onUpdate={handleGoalUpdate}
                  onComplete={handleGoalComplete}
                />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Activity Feed */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <ActivityFeed activities={activities} />
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center">
            <Zap className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900">Quick Actions</h3>
            <p className="text-gray-600 text-sm">Get things done faster</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <motion.button
                key={index}
                onClick={action.action}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl hover:shadow-lg transition-all duration-300 text-left group"
              >
                <div className={`w-10 h-10 bg-gradient-to-br ${action.color} rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-1">{action.title}</h4>
                <p className="text-sm text-gray-600">{action.description}</p>
              </motion.button>
            );
          })}
        </div>
      </motion.div>

      {/* Notifications */}
      <AnimatePresence>
        {showNotification && notifications.map((notification) => (
          <NotificationCard
            key={notification.id}
            {...notification}
            onClose={() => setShowNotification(false)}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}








