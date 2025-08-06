import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Target, Calendar, TrendingUp, Edit3, CheckCircle } from 'lucide-react';
import ProgressBar from './ProgressBar';

export default function GoalCard({ goal, onUpdate, onComplete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editAmount, setEditAmount] = useState(goal.target);

  const handleSave = () => {
    onUpdate({ ...goal, target: editAmount });
    setIsEditing(false);
  };

  const handleComplete = () => {
    onComplete(goal.id);
  };

  const isCompleted = goal.current >= goal.target;
  const progress = Math.min((goal.current / goal.target) * 100, 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-white rounded-2xl shadow-soft border border-gray-100 p-6 ${
        isCompleted ? 'ring-2 ring-green-200 bg-green-50' : ''
      }`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
            isCompleted 
              ? 'bg-green-500' 
              : 'bg-gradient-to-br from-primary-500 to-primary-600'
          }`}>
            {isCompleted ? (
              <CheckCircle className="w-5 h-5 text-white" />
            ) : (
              <Target className="w-5 h-5 text-white" />
            )}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{goal.title}</h3>
            <p className="text-sm text-gray-600">{goal.description}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="p-2 text-gray-500 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
          >
            <Edit3 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {isEditing ? (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Target Amount (₹)
            </label>
            <input
              type="number"
              value={editAmount}
              onChange={(e) => setEditAmount(Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <ProgressBar
            current={goal.current}
            target={goal.target}
            label="Progress"
            color={isCompleted ? "success" : "primary"}
            size="md"
          />
          
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">Current</p>
              <p className="text-lg font-bold text-gray-900">₹{goal.current.toLocaleString()}</p>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">Target</p>
              <p className="text-lg font-bold text-gray-900">₹{goal.target.toLocaleString()}</p>
            </div>
          </div>

          {goal.deadline && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Calendar className="w-4 h-4" />
              <span>Deadline: {new Date(goal.deadline).toLocaleDateString()}</span>
            </div>
          )}

          {isCompleted && (
            <motion.button
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              onClick={handleComplete}
              className="w-full py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
            >
              <CheckCircle className="w-4 h-4" />
              Mark as Completed
            </motion.button>
          )}
        </div>
      )}
    </motion.div>
  );
} 