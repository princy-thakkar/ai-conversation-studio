# 🚀 AI Conversation Studio

AI Conversation Studio is a full-stack AI chatbot application that allows users to chat with an AI assistant, manage conversations, and track activity using a secure authentication system.

---

## 🏆 Team Details

### Team Name
CodeCrafters

### Team Members
- Princy Thakkar
- Shraddha Patel

### College Name
Charotar University of Science and Technology

## ✨ Features

- 🤖 AI chatbot powered by OpenAI API  
- 👤 User authentication (JWT-based login/register)  
- 💬 Persistent chat history per user  
- 📊 Admin dashboard for user/activity tracking  
- 🔐 Secure backend APIs with Express & MongoDB  

---

## ⚙️ Technology Stack Used

### 🖥️ Frontend
- React (Vite)
- Tailwind CSS
- React Router DOM
- Axios

### 🧠 Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- OpenAI API

### 🔐 Authentication & Security
- JWT (if used)
- bcryptjs
- dotenv
- CORS
- Helmet

---

## 🚀 Build & Run Instructions

### 📌 Step 1: Clone Repository
git clone https://github.com/princy-thakkar/ai-conversation-studio.git

cd ai-conversation-studio


### 📌 Step 2: Setup Frontend
npm install

npm run dev

### 📌 Step 3: Setup Backend
cd backend

npm install

npm run dev


### 🔐 Environment Variables

Create .env in backend:

MONGODB_URI=your_mongodb_url
JWT_SECRET=your_secret
OPENAI_API_KEY=your_key
PORT=5000

## 📁 Project Structure

```text
AI Conversation Studio/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   ├── app.js
│   ├── index.js
│   ├── server.js
│   └── package.json
│
├── src/
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── App.jsx
│   └── main.jsx
│
├── public/
├── package.json
├── vite.config.ts
├── tailwind.config.js
└── README.md
```


### 📌 Note

This project is developed for hackathon/academic submission purposes and demonstrates full-stack development skills.


### 👨‍💻 Author

Princy Thakkar
GitHub: @princy-thakkar


---
