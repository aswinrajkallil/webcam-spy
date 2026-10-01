# 📸 Webcam Spy

A full-stack web application built with **React.js, Node.js, Express.js, and MongoDB** that demonstrates browser camera access, photo capture, authentication, and photo management.

> ⚠️ Camera access requires explicit permission from the user. This project is intended for learning and demonstration purposes.

---

## 🚀 Features

- 🔐 User authentication
- 📷 Browser webcam access
- 📸 Capture photos directly from the webcam
- 🖼️ Photo gallery
- 👤 User-specific photo management
- 🔑 JWT-based authentication
- 🔒 Protected API routes
- 🗄️ MongoDB database integration
- ⚡ React + Vite frontend
- 🌐 REST API with Express.js
- 📱 Responsive user interface

---

## 🛠️ Tech Stack

### Frontend

- React.js
- Vite
- React Router
- JavaScript
- CSS
- Browser MediaDevices API

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt.js
- REST API

### Development Tools

- Git
- GitHub
- VS Code
- MongoDB

---

## 📁 Project Structure

```text
webcam-spy/
│
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── config/
│   ├── server.js
│   ├── package.json
│   └── .env
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── PhotoCapture.jsx
│   │   │   ├── PhotoGallery.jsx
│   │   │   └── ...
│   │   │
│   │   ├── pages/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── .env
│
├── .gitignore
└── README.md