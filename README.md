# 🎓 Vidyarya — The Complete Digital Learning Platform

🔗 **Live Website:**  
https://vidyarya.vercel.app  

🗄 **Database Models:**  
https://app.eraser.io/workspace/QlHQmPr6mnyBNttmErSr  

📂 **GitHub Repository:**  
https://github.com/Payal-03/vidyarya  

---

## 🌟 Project Overview

**Vidyarya** is a full-stack digital learning platform designed to make education more **interactive, organized, and accessible** for students, especially in rural areas like **Nabha**.

The platform combines **AI-powered learning tools, collaborative study spaces, coding environments, and productivity features** into one unified system where students can learn, practice, collaborate, and manage their academic tasks efficiently.

The main goal of Vidyarya is to **bridge the digital learning gap** by providing a modern digital learning ecosystem.

---

## 🚀 Key Features

### 🤖 AI-Powered Learning
- AI-generated **PDF summaries**
- **Automatic quiz generation** from uploaded study material
- **Flashcard generation** for quick revision
- AI-powered content processing using **Gemini API**

### 💬 Collaborative Learning
- **Real-time chatrooms** using Socket.IO
- **Code Rooms** with Monaco Editor for collaborative coding practice
- **Discussion forums** for questions and knowledge sharing

### 📅 Productivity Tools
- **To-Do list management**
- **Calendar integration** for academic planning
- Organized workflow for students

### 📚 Learning Resources
- **Lectures section** for video-based learning
- **E-Books library** for study material
- Self-paced digital learning resources

### 🔐 Authentication & Security
- Secure **JWT-based authentication**
- **Login and registration system**
- **Forgot password feature using Email OTP verification**

---

## 🛠 Tech Stack

### Frontend
- React
- Tailwind CSS
- React Router DOM
- Axios
- Monaco Code Editor

### Backend
- Node.js
- Express.js
- Socket.IO

### Database
- MongoDB

### Cloud Storage
- Cloudinary (for storing PDFs, lectures, and e-books)

### AI Integration
- Gemini API
  - Quiz generation
  - Flashcard generation
  - PDF summaries

---

## 🏗 System Architecture

```
Frontend (React)
        ↓
Backend API (Node.js + Express)
        ↓
Database (MongoDB)
        ↓
AI Processing (Gemini API)
```

Real-time features like **chatrooms and collaborative coding** are powered using **Socket.IO**.

---

## 🌐 Live Demo

Try the deployed platform here:

👉 https://vidyarya.vercel.app

---

## 🗄 Database Schema

View the database models and architecture here:

👉 https://app.eraser.io/workspace/QlHQmPr6mnyBNttmErSr

---

## ⚙️ Getting Started

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/Payal-03/vidyarya.git
cd vidyarya
```

---

### 2️⃣ Install Dependencies

#### Backend

```bash
cd server
npm install
```

#### Frontend

```bash
cd client
npm install
```

---

### 3️⃣ Configure Environment Variables

Create a `.env` file in the **server folder** and add:

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_SECRET=your_cloudinary_secret
GEMINI_API_KEY=your_gemini_api_key
EMAIL_USER=your_email
EMAIL_PASS=your_email_password
```

---

### 4️⃣ Run the Application

#### Start Backend

```bash
cd server
npm run dev
```

#### Start Frontend

```bash
cd client
npm run dev
```

---

## 🔮 Future Improvements

- AI-based personalized study recommendations
- Real-time collaborative whiteboard
- Gamification and leaderboard system
- Mobile application
- Student progress analytics

---

## 👩‍💻 Author

**Payal Agarwal**  
Computer Science Student | Full Stack Developer  

GitHub:  
https://github.com/Payal-03

---
