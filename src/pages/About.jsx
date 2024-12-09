import React from 'react';
import { Container, Typography, Paper, Box } from '@mui/material';

const About = () => {
  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Paper sx={{ p: 4 }}>
          <Typography variant="h4" gutterBottom>
            About BCard
          </Typography>
          
          <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
            Overview
          </Typography>
          <Typography paragraph>
            BCard is a comprehensive platform for managing and sharing business cards digitally.
            Our platform allows businesses to create, edit, and share their professional information
            easily and efficiently.
          </Typography>

          <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
            Features
          </Typography>
          <Typography paragraph>
            • Create and manage digital business cards
            • Save favorite business cards
            • Search functionality
            • Business location mapping
            • Dark/Light mode themes
          </Typography>

          <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
            How to Use
          </Typography>
          <Typography paragraph>
            1. Register for an account (choose business account if you want to create cards)
            2. Log in to your account
            3. Create your business cards or browse existing ones
            4. Save your favorite cards for quick access
            5. Use the search function to find specific businesses
          </Typography>
        </Paper>
      </Box>
    </Container>
  );
};

export default About;
