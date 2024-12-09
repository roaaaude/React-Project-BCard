# BCard - Business Card Management Application

## 📋 Overview
BCard is a modern web application for managing digital business cards, built with React and Material-UI. The platform enables users to create, manage, and share digital business cards efficiently, with features like card favoriting and dark/light theme switching.

## 🚀 Main Features
- **User Authentication**
  - Login and Registration system
  - Different access levels (Business/Regular users)
  - Protected routes based on user type

- **Business Card Management**
  - Create new business cards (Business users)
  - Edit existing cards
  - Delete cards
  - Favorite card system
  - Responsive card layout

- **Search & Filter**
  - Real-time search functionality
  - Filter cards by various parameters

- **User Interface**
  - Clean, modern Material-UI design
  - Dark/Light theme toggle
  - Responsive layout for all devices
  - Interactive card animations

## 💻 Technology Stack
- **Frontend Framework:** React 18
- **UI Library:** Material-UI (MUI)
- **Routing:** React Router Dom
- **State Management:** React Hooks & Context
- **HTTP Client:** Axios
- **Storage:** Local Storage
- **Icons:** Material Icons
- **Form Handling:** React Hook Form

## ⚙️ Installation

1. Clone the repository
```bash
git clone ....
```

2. Navigate to project directory
```bash
cd bcard
```

3. Install dependencies
```bash
npm install
```

4. Run the application
```bash
npm start
```

## 🔑 Usage Guide

### User Types
1. **Regular User**
   - View all business cards
   - Add cards to favorites
   - Basic search functionality

2. **Business User**
   - All Regular user capabilities
   - Create business cards
   - Edit own cards
   - Delete own cards

### Key Features Usage
- **Authentication:**
  - Register with email and password
  - Choose between Business/Regular account type
  - Login with registered credentials

- **Card Management:**
  - Create card: Click "Create Card" button (Business users)
  - Edit card: Click edit icon on owned cards
  - Delete card: Click delete icon on owned cards
  - Favorite card: Click heart icon on any card

- **Theme Toggle:**
  - Click the theme icon in header to switch between dark/light modes

## 📁 Project Structure
```
src/
├── components/
│   ├── cards/
│   │   ├── BusinessCard.jsx
│   │   ├── CardList.jsx
│   │   ├── CreateCard.jsx
│   │   └── EditCard.jsx
│   ├── layout/
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   └── ThemeToggle.jsx
│   └── common/
│       └── SearchBar.jsx
├── pages/
│   ├── Home.jsx
│   ├── About.jsx
│   ├── Login.jsx
│   ├── Register.jsx
│   ├── Favorites.jsx
│   └── MyCards.jsx
├── services/
│   ├── auth.js
│   └── api.js
├── hooks/
│   └── useAuth.js
└── styles/
    └── main.scss
```


## Screenshots

[text](README.md) ![text](<screenshots/Screenshot 2024-12-09 at 9.50.31.png>) ![text](<screenshots/Screenshot 2024-12-09 at 9.50.23.png>) ![text](<screenshots/Screenshot 2024-12-09 at 9.50.16.png>) ![text](<screenshots/Screenshot 2024-12-09 at 9.49.16.png>) ![text](<screenshots/Screenshot 2024-12-09 at 9.49.10.png>) ![text](<screenshots/Screenshot 2024-12-09 at 9.48.47.png>)