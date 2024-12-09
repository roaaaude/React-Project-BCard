import React from 'react';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  IconButton,
  Box,
  Link,
  Tooltip
} from '@mui/material';
import {
  Favorite,
  FavoriteBorder,
  Edit,
  Delete,
  Phone,
  Email,
  LocationOn,
  Language,
  Business,
  Description,
  Share
} from '@mui/icons-material';

const BusinessCard = ({ card, onEdit, onDelete, onFavorite }) => {
  const isLoggedIn = localStorage.getItem('token');
  const userType = localStorage.getItem('userType');
  const userEmail = localStorage.getItem('userEmail');
  const isOwner = card.email === userEmail;
  const canEditDelete = userType === 'business' && isOwner;

  const handlePhoneClick = () => {
    window.location.href = `tel:${card.phone}`;
  };

  const handleEmailClick = () => {
    window.location.href = `mailto:${card.email}`;
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: card.title,
          text: card.description,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    }
  };

  return (
    <Card raised sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardContent sx={{ flexGrow: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Business sx={{ mr: 1, color: 'primary.main' }} />
          <Typography variant="h5" component="div">
            {card.title}
          </Typography>
        </Box>

        <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
          <Description sx={{ mr: 1, fontSize: 20 }} />
          {card.subtitle}
        </Typography>

        <Box sx={{ mt: 2 }}>
          <Tooltip title="Call">
            <Typography
              variant="body2"
              sx={{
                display: 'flex',
                alignItems: 'center',
                mb: 1,
                cursor: 'pointer',
                '&:hover': { color: 'primary.main' }
              }}
              onClick={handlePhoneClick}
            >
              <Phone sx={{ mr: 1, fontSize: 20 }} />
              {card.phone}
            </Typography>
          </Tooltip>

          <Tooltip title="Send Email">
            <Typography
              variant="body2"
              sx={{
                display: 'flex',
                alignItems: 'center',
                mb: 1,
                cursor: 'pointer',
                '&:hover': { color: 'primary.main' }
              }}
              onClick={handleEmailClick}
            >
              <Email sx={{ mr: 1, fontSize: 20 }} />
              {card.email}
            </Typography>
          </Tooltip>

          <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <LocationOn sx={{ mr: 1, fontSize: 20 }} />
            {card.address}
          </Typography>

          {card.web && (
            <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center' }}>
              <Language sx={{ mr: 1, fontSize: 20 }} />
              <Link href={card.web} target="_blank" rel="noopener noreferrer" underline="hover">
                Website
              </Link>
            </Typography>
          )}
        </Box>
      </CardContent>

      <CardActions sx={{ justifyContent: 'space-between', px: 2, py: 1 }}>
        <Box>
          {isLoggedIn && (
            <Tooltip title={card.isFavorite ? "Remove from Favorites" : "Add to Favorites"}>
              <IconButton 
                onClick={() => onFavorite?.(card.id)} 
                color={card.isFavorite ? "error" : "default"}
                size="small"
              >
                {card.isFavorite ? <Favorite /> : <FavoriteBorder />}
              </IconButton>
            </Tooltip>
          )}
          
          <Tooltip title="Share">
            <IconButton onClick={handleShare} size="small">
              <Share />
            </IconButton>
          </Tooltip>
        </Box>

        {canEditDelete && (
          <Box>
            <Tooltip title="Edit">
              <IconButton onClick={() => onEdit?.(card.id)} size="small" sx={{ mr: 1 }}>
                <Edit />
              </IconButton>
            </Tooltip>
            
            <Tooltip title="Delete">
              <IconButton onClick={() => onDelete?.(card.id)} size="small">
                <Delete />
              </IconButton>
            </Tooltip>
          </Box>
        )}
      </CardActions>
    </Card>
  );
};

export default BusinessCard;