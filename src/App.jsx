import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import About from './pages/About';
import Favorites from './pages/Favorites';
import MyCards from './pages/MyCards';
import EditProfile from './pages/EditProfile';
import CreateCard from './components/cards/CreateCard';
import EditCard from './components/cards/EditCard';

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('theme');
    return savedMode === 'dark';
  });

  useEffect(() => {
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    },
    typography: {
      fontFamily: [
        'Roboto',
        'Arial',
        'sans-serif',
      ].join(','),
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <div className={`app ${darkMode ? 'dark-theme' : 'light-theme'}`}>
          <Header darkMode={darkMode} setDarkMode={setDarkMode} />
          <main style={{ minHeight: '80vh', padding: '20px 0' }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />              
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/my-cards" element={<MyCards />} />
              <Route path="/create-card" element={<CreateCard />} />
              <Route path="/edit-card/:id" element={<EditCard />} />
              <Route path="/edit-profile" element={<EditProfile />} />
              <Route path="*" element={
                <div style={{ textAlign: 'center', padding: '50px' }}>
                  <h2>404 - Page Not Found</h2>
                </div>
              } />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;