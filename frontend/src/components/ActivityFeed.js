import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, Gift, Trophy, Users, DollarSign, Clock } from 'lucide-react';

export default function ActivityFeed({ activities = [] }) {
  const getActivityIcon = (type) => {
    const icons = {
      donation: DollarSign,
      achievement: Trophy,
      referral: Users,
      milestone: TrendingUp,
      reward: Gift
    };
    return icons[type] || Clock;
  };

  const getActivityColor = (type) => {
    const colors = {
      donation: "text-green-600 bg-green-100",
      achievement: "text-yellow-600 bg-yellow-100",
      referral: "text-blue-600 bg-blue-100",
      milestone: "text-purple-600 bg-purple-100",
      reward: "text-orange-600 bg-orange-100"
    };
    return colors[type] || "text-gray-600 bg-gray-100";
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInMinutes = Math.floor((now - time) / (1000 * 60));
    
    if (diffInMinutes < 1) return "Just now";
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  return (
    <div className="bg-white rounded-2xl shadow-soft border border-gray-100 p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center">
          <Clock className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-gray-900">Recent Activity</h3>
          <p className="text-gray-600 text-sm">Your latest achievements and activities</p>
        </div>
      </div>

      <div className="space-y-4">
        <AnimatePresence>
          {activities.map((activity, index) => {
            const Icon = getActivityIcon(activity.type);
            
            return (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${getActivityColor(activity.type)}`}>
                  <Icon className="w-4 h-4" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 mb-1">
                    {activity.title}
                  </p>
                  <p className="text-sm text-gray-600 mb-2">
                    {activity.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">
                      {formatTimeAgo(activity.timestamp)}
                    </span>
                    {activity.amount && (
                      <span className="text-xs font-semibold text-green-600">
                        +₹{activity.amount.toLocaleString()}
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {activities.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-8"
          >
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="w-8 h-8 text-gray-400" />
            </div>
            <h4 className="text-lg font-semibold text-gray-900 mb-2">No activities yet</h4>
            <p className="text-gray-600">Start making donations to see your activity here!</p>
          </motion.div>
        )}
      </div>
    </div>
  );
} 