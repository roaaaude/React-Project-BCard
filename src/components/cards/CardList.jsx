import React from 'react';
import { Grid } from '@mui/material';
import BusinessCard from './BusinessCard';

const CardList = ({ cards = [], onEdit, onDelete, onFavorite }) => {
  return (
    <Grid container spacing={3}>
      {cards.map((card) => (
        <Grid item xs={12} sm={6} md={4} key={card.id}>
          <BusinessCard
            card={card}
            onEdit={onEdit}
            onDelete={onDelete}
            onFavorite={onFavorite}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default CardList;

