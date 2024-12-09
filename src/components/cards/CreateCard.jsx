import React, { useState } from 'react';
import {
  Container,Typography,TextField,Button,Grid,Box,Alert
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
const CreateCard = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    title: '', subtitle: '', description: '', phone: '', email: '', web: '', imageUrl: '', imageAlt: '', state: '', country: '', city: '', street: '', houseNumber: '', zip: ''
  });
  const validateForm = () => {
    if (!formData.title) return 'Title is required';
    if (!formData.subtitle) return 'Subtitle is required';
    if (!formData.description) return 'Description is required';
    if (!formData.phone) return 'Phone is required';
    if (!formData.email) return 'Email is required';
    if (!formData.country) return 'Country is required';
    if (!formData.city) return 'City is required';
    if (!formData.street) return 'Street is required';
    if (!formData.houseNumber) return 'House number is required';
    return null;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }
    try {
      const userEmail = localStorage.getItem('userEmail');
      const newCard = {
        ...formData,
        id: Date.now(),
        email: userEmail,
        isOwner: true,
        address: `${formData.street} ${formData.houseNumber}, ${formData.city}`,
        isFavorite: false
      };
      const existingCards = JSON.parse(localStorage.getItem('myCards') || '[]');
      existingCards.push(newCard);
      localStorage.setItem('myCards', JSON.stringify(existingCards));
      navigate('/my-cards');
    } catch (err) {
      setError('Failed to create card');
    }
  };
  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Create Business Card
        </Typography>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Title"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                error={!formData.title && formData.title !== ''}
                helperText={(!formData.title && formData.title !== '') ? 'Title is required' : ''}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Subtitle"
                value={formData.subtitle}
                onChange={(e) => setFormData({...formData, subtitle: e.target.value})}
                error={!formData.subtitle && formData.subtitle !== ''}
                helperText={(!formData.subtitle && formData.subtitle !== '') ? 'Subtitle is required' : ''}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                multiline
                rows={3}
                label="Description"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                error={!formData.description && formData.description !== ''}
                helperText={(!formData.description && formData.description !== '') ? 'Description is required' : ''}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Phone"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                error={!formData.phone && formData.phone !== ''}
                helperText={(!formData.phone && formData.phone !== '') ? 'Phone is required' : ''}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                type="email"
                label="Email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                error={!formData.email && formData.email !== ''}
                helperText={(!formData.email && formData.email !== '') ? 'Email is required' : ''}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Website"
                value={formData.web}
                onChange={(e) => setFormData({...formData, web: e.target.value})}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Country"
                value={formData.country}
                onChange={(e) => setFormData({...formData, country: e.target.value})}
                error={!formData.country && formData.country !== ''}
                helperText={(!formData.country && formData.country !== '') ? 'Country is required' : ''}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="State"
                value={formData.state}
                onChange={(e) => setFormData({...formData, state: e.target.value})}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="City"
                value={formData.city}
                onChange={(e) => setFormData({...formData, city: e.target.value})}
                error={!formData.city && formData.city !== ''}
                helperText={(!formData.city && formData.city !== '') ? 'City is required' : ''}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Street"
                value={formData.street}
                onChange={(e) => setFormData({...formData, street: e.target.value})}
                error={!formData.street && formData.street !== ''}
                helperText={(!formData.street && formData.street !== '') ? 'Street is required' : ''}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="House Number"
                value={formData.houseNumber}
                onChange={(e) => setFormData({...formData, houseNumber: e.target.value})}
                error={!formData.houseNumber && formData.houseNumber !== ''}
                helperText={(!formData.houseNumber && formData.houseNumber !== '') ? 'House number is required' : ''}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="ZIP Code"
                value={formData.zip}
                onChange={(e) => setFormData({...formData, zip: e.target.value})}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Create Card
          </Button>
        </Box>
      </Box>
    </Container>
  );
};
export default CreateCard;