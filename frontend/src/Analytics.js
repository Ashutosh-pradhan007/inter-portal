import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  BarChart3, 
  PieChart, 
  Calendar, 
  DollarSign, 
  Users, 
  Target,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import ProgressBar from './components/ProgressBar';
import { AnimatePresence } from 'framer-motion';

export default function Analytics() {
  const [timeRange, setTimeRange] = useState('month');
  const [analyticsData, setAnalyticsData] = useState({
    totalRaised: 125000,
    monthlyGrowth: 15.5,
    weeklyGrowth: -2.3,
    totalDonors: 45,
    averageDonation: 2778,
    completionRate: 78,
    topSources: [
      { name: 'Direct Donations', value: 45, color: 'bg-blue-500' },
      { name: 'Referrals', value: 30, color: 'bg-green-500' },
      { name: 'Social Media', value: 15, color: 'bg-purple-500' },
      { name: 'Events', value: 10, color: 'bg-orange-500' }
    ],
    monthlyData: [
      { month: 'Jan', amount: 15000 },
      { month: 'Feb', amount: 22000 },
      { month: 'Mar', amount: 18000 },
      { month: 'Apr', amount: 25000 },
      { month: 'May', amount: 30000 },
      { month: 'Jun', amount: 35000 }
    ]
  });

  const metrics = [
    {
      label: 'Total Raised',
      value: `₹${analyticsData.totalRaised.toLocaleString()}`,
      change: analyticsData.monthlyGrowth,
      icon: DollarSign,
      color: 'from-green-500 to-green-600'
    },
    {
      label: 'Total Donors',
      value: analyticsData.totalDonors,
      change: 12.5,
      icon: Users,
      color: 'from-blue-500 to-blue-600'
    },
    {
      label: 'Avg. Donation',
      value: `₹${analyticsData.averageDonation.toLocaleString()}`,
      change: 8.2,
      icon: Target,
      color: 'from-purple-500 to-purple-600'
    },
    {
      label: 'Completion Rate',
      value: `${analyticsData.completionRate}%`,
      change: 5.1,
      icon: BarChart3,
      color: 'from-orange-500 to-orange-600'
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
          className="w-20 h-20 bg-gradient-to-br from-accent-500 to-accent-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg"
        >
          <BarChart3 className="w-10 h-10 text-white" />
        </motion.div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-accent-600 to-accent-800 bg-clip-text text-transparent mb-2">
          Analytics Dashboard
        </h1>
        <p className="text-gray-600 text-lg">Track your performance and insights</p>
      </motion.div>

      {/* Time Range Selector */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="flex justify-center mb-8"
      >
        <div className="bg-white rounded-xl shadow-soft border border-gray-100 p-1">
          {['week', 'month', 'quarter', 'year'].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                timeRange === range
                  ? 'bg-primary-600 text-white'
                  : 'text-gray-600 hover:text-primary-600'
              }`}
            >
              {range.charAt(0).toUpperCase() + range.slice(1)}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <AnimatePresence>
          {metrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <motion.div
                key={index}
                initial={{ x: index % 2 === 0 ? -50 : 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02, y: -5 }}
                className="bg-white rounded-2xl shadow-soft border border-gray-100 p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 bg-gradient-to-br ${metric.color} rounded-xl flex items-center justify-center shadow-lg`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className={`flex items-center gap-1 text-sm font-medium ${
                    metric.change >= 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {metric.change >= 0 ? (
                      <ArrowUpRight className="w-4 h-4" />
                    ) : (
                      <ArrowDownRight className="w-4 h-4" />
                    )}
                    {Math.abs(metric.change)}%
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">{metric.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Monthly Progress */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl shadow-soft border border-gray-100 p-6"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900">Monthly Progress</h3>
              <p className="text-gray-600 text-sm">Your donation growth over time</p>
            </div>
          </div>

          <div className="space-y-4">
            {analyticsData.monthlyData.map((data, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="w-16 text-sm font-medium text-gray-600">{data.month}</div>
                <div className="flex-1">
                  <ProgressBar
                    current={data.amount}
                    target={50000}
                    label=""
                    color="primary"
                    showPercentage={false}
                    size="sm"
                  />
                </div>
                <div className="w-20 text-right text-sm font-semibold text-gray-900">
                  ₹{data.amount.toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Donation Sources */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-2xl shadow-soft border border-gray-100 p-6"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-accent-500 to-accent-600 rounded-xl flex items-center justify-center">
              <PieChart className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900">Donation Sources</h3>
              <p className="text-gray-600 text-sm">Where your donations come from</p>
            </div>
          </div>

          <div className="space-y-4">
            {analyticsData.topSources.map((source, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="flex items-center gap-4"
              >
                <div className={`w-4 h-4 rounded-full ${source.color}`}></div>
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-gray-900">{source.name}</span>
                    <span className="text-sm font-semibold text-gray-600">{source.value}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <motion.div
                      className={`h-2 rounded-full ${source.color.replace('bg-', 'bg-')}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${source.value}%` }}
                      transition={{ delay: 0.7 + index * 0.1, duration: 1 }}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Performance Insights */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="bg-gradient-to-r from-primary-50 to-primary-100 rounded-2xl p-6 border border-primary-200"
      >
        <h3 className="text-lg font-semibold text-primary-800 mb-4">Performance Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl p-4 shadow-soft">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-green-600" />
              </div>
              <span className="text-sm font-medium text-gray-900">Growth Rate</span>
            </div>
            <p className="text-2xl font-bold text-green-600">+15.5%</p>
            <p className="text-xs text-gray-600 mt-1">vs last month</p>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-soft">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="w-4 h-4 text-blue-600" />
              </div>
              <span className="text-sm font-medium text-gray-900">New Donors</span>
            </div>
            <p className="text-2xl font-bold text-blue-600">+8</p>
            <p className="text-xs text-gray-600 mt-1">this month</p>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-soft">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                <Target className="w-4 h-4 text-purple-600" />
              </div>
              <span className="text-sm font-medium text-gray-900">Goal Progress</span>
            </div>
            <p className="text-2xl font-bold text-purple-600">78%</p>
            <p className="text-xs text-gray-600 mt-1">of monthly target</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
} 