import React from 'react';
import { motion } from 'framer-motion';

export default function ProgressBar({ 
  current, 
  target, 
  label, 
  color = "primary",
  showPercentage = true,
  size = "md" 
}) {
  const percentage = Math.min((current / target) * 100, 100);
  
  const sizeClasses = {
    sm: "h-2",
    md: "h-3",
    lg: "h-4"
  };

  const colorClasses = {
    primary: "bg-primary-500",
    success: "bg-success-500",
    accent: "bg-accent-500",
    warning: "bg-yellow-500",
    danger: "bg-red-500"
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-gray-700">{label}</span>
        {showPercentage && (
          <span className="text-sm font-semibold text-gray-600">
            {Math.round(percentage)}%
          </span>
        )}
      </div>
      
      <div className={`w-full bg-gray-200 rounded-full ${sizeClasses[size]} overflow-hidden`}>
        <motion.div
          className={`${colorClasses[color]} h-full rounded-full relative`}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          {/* Shimmer effect */}
          <motion.div
            className="absolute inset-0 bg-white opacity-20"
            animate={{
              x: ["-100%", "100%"]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </motion.div>
      </div>
      
      <div className="flex justify-between text-xs text-gray-500 mt-1">
        <span>{current.toLocaleString()}</span>
        <span>{target.toLocaleString()}</span>
      </div>
    </div>
  );
} 