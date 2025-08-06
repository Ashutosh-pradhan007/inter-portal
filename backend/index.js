// backend/index.js

const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

// Health check route
app.get('/', (req, res) => {
  res.send('Backend is alive');
});

// Profile endpoint
app.get('/api/profile', (req, res) => {
  res.json({
    internName: 'Ashutosh Pradhan',
    referralCode: 'ashutosh2025',
    donationsRaised: 0,
    rewards: ['Bronze Badge']
  });
});

// Leaderboard endpoint
app.get('/api/leaderboard', (req, res) => {
  const leaderboard = [
    {
      name: 'Ashutosh Pradhan',
      raised: 5000,
      image: 'https://i.postimg.cc/rsytMjFF/Whats-App-Image-2025-08-05-at-18-55-36-0fe9f313.jpg'
    },
    {
      name: 'Sudipta Behera',
      raised: 3000,
      image: 'https://i.postimg.cc/V6mJWgtB/Whats-App-Image-2025-08-05-at-18-57-38-fcb9ddbd.jpg'
    },
    {
      name: 'Priya Singh',
      raised: 4200,
      image: 'https://placehold.co/80x80?text=PS'
    },
    {
      name: 'Rahul Sharma',
      raised: 3500,
      image: '/images/rahul.svg'
    },
    {
      name: 'Neha Gupta',
      raised: 2800,
      image: '/images/neha.svg'
    }
  ];

  // Sort descending by amount raised
  leaderboard.sort((a, b) => b.raised - a.raised);
  res.json(leaderboard);
});

// Start Server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Backend ready at http://localhost:${PORT}`);
});
