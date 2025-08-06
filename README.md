# 🎯 Intern Fundraising Portal – Full Stack Internship Task

This is my submission for the **Full Stack Developer Internship – Round 1** task.

## 📦 Project Structure

intern-portal/
├── backend/ # Express.js server with mock API
│ └── index.js
├── frontend/ # React.js + Tailwind CSS
│ ├── public/
│ │ └── images/ (profile photos for leaderboard)
│ └── src/
│ ├── App.js
│ ├── Dashboard.js
│ ├── Leaderboard.js
│ └── Login.js
└── README.md

## 🔧 Tech Stack Used

- **Frontend**: React.js + Tailwind CSS + Framer Motion
- **Backend**: Node.js + Express.js (REST API)
- **Images**: Hosted locally inside `/public/images/`
- **Version Control**: Git + GitHub

## ✨ Features Implemented

### ✅ Dummy Login Page (Static)
- Stylish animated login page (no authentication)

### ✅ Intern Dashboard
- Intern name (Ashutosh Pradhan)
- Referral code: `ashutosh2025`
- Total donations raised from backend API
- Rewards/unlockables shown statically

### ✅ Leaderboard (Bonus Task)
- Top 5 interns displayed with ranks, names, donations
- Profile images (local and fallback CDN)
- Animated entries using Framer Motion

## 🔌 API Endpoints

| Method | Endpoint           | Description                             |
|--------|--------------------|-----------------------------------------|
| GET    | `/api/profile`     | Intern info: name, code, amount, badge  |
| GET    | `/api/leaderboard` | Top interns with images and amounts     |

## 🚀 Deployment Plan (if selected)

- Frontend: Netlify or Vercel
- Backend: Render or Railway

## 🧑‍💻 Author

- **Name**: Ashutosh Pradhan
- **Email**: ashutoshsunil65@gmail.com
- **GitHub**: [@Ashutosh-pradhan007](https://github.com/Ashutosh-pradhan007)

## 🕒 Estimated Final Time

I can fully polish and host the project in **2 days** if selected.

---

✅ **GitHub Repository**:  
🔗 https://github.com/Ashutosh-pradhan007/inter-portal
