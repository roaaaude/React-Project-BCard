import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
} from '@mui/material';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import SearchBar from '../common/SearchBar';
import ThemeToggle from './ThemeToggle';

const Header = ({ darkMode, setDarkMode }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isLoggedIn = localStorage.getItem('token');
  const userType = localStorage.getItem('userType');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userType');
    localStorage.removeItem('userData');
    navigate('/login');
  };

  const handleSearch = (searchTerm) => {
    const sampleCards = [
      {
        id: 'sample1',
        title: "Tech Solutions Ltd",
        subtitle: "IT Services & Consulting",
        description: "Professional IT services and solutions for businesses",
        phone: "050-0000000",
        email: "info@techsolutions.com",
        address: "123 Tech St., Tel Aviv",
      },
      {
        id: 'sample2',
        title: "Design Studio Plus",
        subtitle: "Creative Design Services",
        description: "Professional graphic design and branding solutions",
        phone: "050-1111111",
        email: "design@designstudio.com",
        address: "456 Design Ave., Tel Aviv",
      },
      {
        id: 'sample3',
        title: "Marketing Masters",
        subtitle: "Digital Marketing Agency",
        description: "Full-service digital marketing and social media management",
        phone: "050-2222222",
        email: "hello@marketingmasters.com",
        address: "789 Marketing Blvd., Tel Aviv",
      }
    ];
    
    const userCards = JSON.parse(localStorage.getItem('myCards') || '[]');
    const allCards = [...sampleCards, ...userCards];
    
    if (!searchTerm.trim()) {
      localStorage.setItem('searchResults', JSON.stringify(allCards));
      if (location.pathname !== '/') {
        navigate('/');
      }
      window.location.reload();
      return;
    }

    const filteredCards = allCards.filter(card => 
      card.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      card.subtitle?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      card.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      card.address?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    localStorage.setItem('searchResults', JSON.stringify(filteredCards));
    if (location.pathname !== '/') {
      navigate('/');
    }
    window.location.reload();
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{ textDecoration: 'none', color: 'inherit' }}
        >
          BCard
        </Typography>

        <Box sx={{ flexGrow: 1, mx: 2 }}>
          <SearchBar onSearch={handleSearch} />
        </Box>

        <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} />

        {!isLoggedIn ? (
          <>
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
            <Button color="inherit" component={Link} to="/register">
              Register
            </Button>
          </>
        ) : (
          <>
            <Button color="inherit" component={Link} to="/favorites">
              Favorites
            </Button>
            {userType === 'business' && (
              <>
                <Button color="inherit" component={Link} to="/my-cards">
                  My Cards
                </Button>
                <Button color="inherit" component={Link} to="/create-card">
                  Create Card
                </Button>
              </>
            )}
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;