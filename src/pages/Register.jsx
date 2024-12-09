import React, { useState } from 'react';
import {
  Container, Typography, TextField, Button, Grid, FormControlLabel, Checkbox, Box, Alert
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', middleName: '', phone: '', email: '', password: '', imageUrl: '', imageAlt: '', state: '', country: '', city: '', street: '', houseNumber: '', zip: '', isBusiness: false
  });

  const [fieldErrors, setFieldErrors] = useState({});
  const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d.*\d.*\d.*\d)(?=.*[!@#$%^&*\-_])[A-Za-z\d!@#$%^&*\-_]{8,}$/;
  const phoneRegex = /^((\+972|972)|0)( |-)?([1-468-9]( |-)?\d{7}|(5|7)[0-9]( |-)?\d{7})$/;
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  const validateField = (name, value) => {
    switch (name) {
      case 'firstName':
      case 'lastName':
        return value.length >= 2 ? '' : 'Must be at least 2 characters';
      case 'phone':
        return phoneRegex.test(value) ? '' : 'Invalid phone number';
      case 'email':
        return emailRegex.test(value) ? '' : 'Invalid email address';
      case 'password':
        return passwordRegex.test(value) 
          ? '' 
          : 'Password must contain: uppercase, lowercase, 4 numbers, and special character (!@#$%^&*-_)';
      case 'country':
      case 'city':
      case 'street':
      case 'houseNumber':
        return value.trim() ? '' : 'This field is required';
      default:
        return '';
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    
    setFormData(prev => ({
      ...prev,
      [name]: newValue
    }));

    if (type !== 'checkbox') {
      const error = validateField(name, value);
      setFieldErrors(prev => ({
        ...prev,
        [name]: error
      }));
    }
  };

  const validateForm = () => {
    const errors = {};
    Object.keys(formData).forEach(key => {
      if (['middleName', 'imageUrl', 'imageAlt', 'state', 'zip', 'web'].includes(key)) return;
      const error = validateField(key, formData[key]);
      if (error) errors[key] = error;
    });

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!validateForm()) {
      setError('Please fix all validation errors before submitting');
      return;
    }
    try {
      const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');

      if (existingUsers.some(user => user.email === formData.email)) {
        setError('Email already registered');
        return;
      }
      const newUser = {
        id: Date.now(),
        ...formData
      };
      existingUsers.push(newUser);
      localStorage.setItem('users', JSON.stringify(existingUsers));
      navigate('/login');
    } catch (err) {
      setError(err.message || 'Registration failed');
    }
  };
  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Register
        </Typography>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <TextField
                required
                fullWidth
                name="firstName"
                label="First Name"
                value={formData.firstName}
                onChange={handleInputChange}
                error={!!fieldErrors.firstName}
                helperText={fieldErrors.firstName}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                name="middleName"
                label="Middle Name"
                value={formData.middleName}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                required
                fullWidth
                name="lastName"
                label="Last Name"
                value={formData.lastName}
                onChange={handleInputChange}
                error={!!fieldErrors.lastName}
                helperText={fieldErrors.lastName}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="email"
                type="email"
                label="Email"
                value={formData.email}
                onChange={handleInputChange}
                error={!!fieldErrors.email}
                helperText={fieldErrors.email}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                type="password"
                label="Password"
                value={formData.password}
                onChange={handleInputChange}
                error={!!fieldErrors.password}
                helperText={fieldErrors.password || 'Must contain uppercase, lowercase, 4 numbers, special character'}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="phone"
                label="Phone"
                value={formData.phone}
                onChange={handleInputChange}
                error={!!fieldErrors.phone}
                helperText={fieldErrors.phone}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                name="country"
                label="Country"
                value={formData.country}
                onChange={handleInputChange}
                error={!!fieldErrors.country}
                helperText={fieldErrors.country}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                name="state"
                label="State"
                value={formData.state}
                onChange={handleInputChange}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                name="city"
                label="City"
                value={formData.city}
                onChange={handleInputChange}
                error={!!fieldErrors.city}
                helperText={fieldErrors.city}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                name="street"
                label="Street"
                value={formData.street}
                onChange={handleInputChange}
                error={!!fieldErrors.street}
                helperText={fieldErrors.street}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                name="houseNumber"
                label="House Number"
                value={formData.houseNumber}
                onChange={handleInputChange}
                error={!!fieldErrors.houseNumber}
                helperText={fieldErrors.houseNumber}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                name="zip"
                label="ZIP Code"
                value={formData.zip}
                onChange={handleInputChange}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                name="imageUrl"
                label="Image URL"
                value={formData.imageUrl}
                onChange={handleInputChange}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                name="imageAlt"
                label="Image Alt Text"
                value={formData.imageAlt}
                onChange={handleInputChange}
              />
            </Grid>

            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    name="isBusiness"
                    checked={formData.isBusiness}
                    onChange={handleInputChange}
                  />
                }
                label="Register as Business"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Register
          </Button>
        </Box>
      </Box>
    </Container>
  );
};
export default Register;