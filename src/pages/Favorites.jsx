import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Grid,
  Box
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import BusinessCard from '../components/cards/BusinessCard';

const Favorites = () => {
  const [favoriteCards, setFavoriteCards] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const allCards = JSON.parse(localStorage.getItem('myCards') || '[]');
    const favorites = allCards.filter(card => card.isFavorite);
    setFavoriteCards(favorites);
  }, []);

  const handleRemoveFromFavorites = async (id) => {
    try {
      const allCards = JSON.parse(localStorage.getItem('myCards') || '[]');
      const updatedCards = allCards.map(card => 
        card.id === id ? { ...card, isFavorite: false } : card
      );
      localStorage.setItem('myCards', JSON.stringify(updatedCards));
      setFavoriteCards(favoriteCards.filter(card => card.id !== id));
    } catch (err) {
      console.error('Failed to remove from favorites');
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit-card/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      const allCards = JSON.parse(localStorage.getItem('myCards') || '[]');
      const updatedCards = allCards.filter(card => card.id !== id);
      localStorage.setItem('myCards', JSON.stringify(updatedCards));
      setFavoriteCards(favoriteCards.filter(card => card.id !== id));
    } catch (err) {
      console.error('Failed to delete card');
    }
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Favorite Cards
        </Typography>

        <Grid container spacing={3}>
          {favoriteCards.map((card) => (
            <Grid item xs={12} sm={6} md={4} key={card.id}>
              <BusinessCard
                card={card}
                onFavorite={() => handleRemoveFromFavorites(card.id)}
                onEdit={() => handleEdit(card.id)}
                onDelete={() => handleDelete(card.id)}
                isOwner={true}
              />
            </Grid>
          ))}
        </Grid>

        {favoriteCards.length === 0 && (
          <Typography variant="h6" align="center" sx={{ mt: 4 }}>
            You haven't added any cards to favorites yet.
          </Typography>
        )}
      </Box>
    </Container>
  );
};

export default Favorites;