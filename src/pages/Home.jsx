import React, { useState, useEffect } from 'react';
import {
  Container, Typography, Grid, Box, Button, CircularProgress, Paper
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import BusinessCard from '../components/cards/BusinessCard';
import SearchBar from '../components/common/SearchBar';
const Home = () => {
  const [cards, setCards] = useState([]);
  const [filteredCards, setFilteredCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem('token');
  const userEmail = localStorage.getItem('userEmail');
  useEffect(() => {
    const searchResults = JSON.parse(localStorage.getItem('searchResults'));
    
    if (searchResults) {
      setCards(searchResults);
      setFilteredCards(searchResults);
      localStorage.removeItem('searchResults');
    } else {
      const sampleCards = [
        {
          id: 'sample1',
          title: "Tech Solutions Ltd",
          subtitle: "IT Services & Consulting",
          description: "Professional IT services and solutions for businesses",
          phone: "050-0000000",
          email: "info@techsolutions.com",
          address: "123 Tech St., Tel Aviv",
          location: { lat: 32.0853, lng: 34.7818 },
          isOwner: false
        },
        {
          id: 'sample2',
          title: "Design Studio Plus",
          subtitle: "Creative Design Services",
          description: "Professional graphic design and branding solutions",
          phone: "050-1111111",
          email: "design@designstudio.com",
          address: "456 Design Ave., Tel Aviv",
          location: { lat: 32.0853, lng: 34.7818 },
          isOwner: false
        },
        {
          id: 'sample3',
          title: "Marketing Masters",
          subtitle: "Digital Marketing Agency",
          description: "Full-service digital marketing and social media management",
          phone: "050-2222222",
          email: "hello@marketingmasters.com",
          address: "789 Marketing Blvd., Tel Aviv",
          location: { lat: 32.0853, lng: 34.7818 },
          isOwner: false
        }
      ];
      const userCards = JSON.parse(localStorage.getItem('myCards') || '[]');
      const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
      const allCards = [
        ...sampleCards,
        ...userCards.map(card => ({
          ...card,
          isOwner: card.email === userEmail,
          isFavorite: favorites.includes(card.id)
        }))
      ];
      setCards(allCards);
      setFilteredCards(allCards);
    }
    setLoading(false);
  }, [userEmail]);
  const handleSearch = (searchTerm) => {
    if (!searchTerm) {
      setFilteredCards(cards);
      return;
    }
    const filtered = cards.filter(card => 
      card.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      card.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      card.address.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCards(filtered);
  };
  const handleEdit = (id) => {
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }
    navigate(`/edit-card/${id}`);
  };
  const handleDelete = async (id) => {
    if (!isLoggedIn) return;
    try {
      const updatedCards = cards.filter(card => card.id !== id);
      setCards(updatedCards);
      setFilteredCards(updatedCards);
      const myCards = JSON.parse(localStorage.getItem('myCards') || '[]');
      const updatedMyCards = myCards.filter(card => card.id !== id);
      localStorage.setItem('myCards', JSON.stringify(updatedMyCards));
    } catch (err) {
      console.error('Failed to delete card');
    }
  };
  const handleFavorite = (id) => {
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }
    const updatedCards = cards.map(card => {
      if (card.id === id) {
        return { ...card, isFavorite: !card.isFavorite };
      }
      return card;
    });
    setCards(updatedCards);
    setFilteredCards(updatedCards.filter(card => 
      filteredCards.some(fc => fc.id === card.id)
    ));
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    const updatedFavorites = favorites.includes(id)
      ? favorites.filter(fId => fId !== id)
      : [...favorites, id];
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    const myCards = JSON.parse(localStorage.getItem('myCards') || '[]');
    const updatedMyCards = myCards.map(card => {
      if (card.id === id) {
        return { ...card, isFavorite: !card.isFavorite };
      }
      return card;
    });
    localStorage.setItem('myCards', JSON.stringify(updatedMyCards));
  };
  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }
  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 8, mb: 6, textAlign: 'center' }}>
        <Typography variant="h2" component="h1" gutterBottom>
          Welcome to BCard
        </Typography>
        <Typography variant="h5" component="h2" color="text.secondary" paragraph>
          Your Digital Business Card Platform
        </Typography>
        
        {!isLoggedIn && (
          <Box sx={{ mt: 4 }}>
            <Button
              component={Link}
              to="/register"
              variant="contained"
              size="large"
              sx={{ mr: 2 }}
            >
              Join Now
            </Button>
            <Button
              component={Link}
              to="/login"
              variant="outlined"
              size="large"
            >
              Sign In
            </Button>
          </Box>
        )}
      </Box>
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom align="center">
          Search Business Cards
        </Typography>
        <Box sx={{ maxWidth: 600, mx: 'auto' }}>
          <SearchBar onSearch={handleSearch} />
        </Box>
      </Paper>
      <Box sx={{ mb: 6 }}>
        <Typography variant="h4" gutterBottom align="center">
          Featured Business Cards
        </Typography>
        <Grid container spacing={3}>
          {filteredCards.map((card) => (
            <Grid item xs={12} sm={6} md={4} key={card.id}>
              <BusinessCard
                card={card}
                onFavorite={() => handleFavorite(card.id)}
                onEdit={() => handleEdit(card.id)}
                onDelete={() => handleDelete(card.id)}
              />
            </Grid>
          ))}
        </Grid>
        {filteredCards.length === 0 && (
          <Typography variant="h6" align="center" sx={{ mt: 4 }}>
            No cards found matching your search.
          </Typography>
        )}
      </Box>
    </Container>
  );
};
export default Home;