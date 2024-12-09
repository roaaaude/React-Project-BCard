import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Grid,
  Button,
  Box
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import BusinessCard from '../components/cards/BusinessCard';

const MyCards = () => {
  const navigate = useNavigate();
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const savedCards = JSON.parse(localStorage.getItem('myCards') || '[]');
    setCards(savedCards);
  }, []);

  const handleDelete = async (id) => {
    try {
      const updatedCards = cards.filter(card => card.id !== id);
      localStorage.setItem('myCards', JSON.stringify(updatedCards));
      setCards(updatedCards);
    } catch (err) {
      console.error('Failed to delete card');
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit-card/${id}`);
  };

  const handleFavorite = (id) => {
    const updatedCards = cards.map(card => {
      if (card.id === id) {
        return { ...card, isFavorite: !card.isFavorite };
      }
      return card;
    });
    localStorage.setItem('myCards', JSON.stringify(updatedCards));
    setCards(updatedCards);
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Typography variant="h4">
            My Business Cards
          </Typography>
          <Button
            component={Link}
            to="/create-card"
            variant="contained"
            startIcon={<AddIcon />}
          >
            Create New Card
          </Button>
        </Box>

        <Grid container spacing={3}>
          {cards.map((card) => (
            <Grid item xs={12} sm={6} md={4} key={card.id}>
              <BusinessCard
                card={card}
                onDelete={() => handleDelete(card.id)}
                onEdit={() => handleEdit(card.id)}
                onFavorite={() => handleFavorite(card.id)}
                isOwner={true}
              />
            </Grid>
          ))}
        </Grid>

        {cards.length === 0 && (
          <Typography variant="h6" align="center" sx={{ mt: 4 }}>
            You haven't created any business cards yet.
          </Typography>
        )}
      </Box>
    </Container>
  );
};

export default MyCards;