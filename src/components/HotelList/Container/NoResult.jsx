import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

const Container = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '80vh',
  
  backgroundColor: theme.palette.background.default,
}));

const Illustration = styled('img')({
  width: '80%',
  maxWidth: 400,
  marginBottom: '16px',
});

const DataNotFound = () => {
  const navigate = useNavigate();
  return (
    <Container>
      <Illustration
        src="https://static.vecteezy.com/system/resources/thumbnails/006/208/684/small/search-no-result-concept-illustration-flat-design-eps10-modern-graphic-element-for-landing-page-empty-state-ui-infographic-icon-vector.jpg"
        alt="Data Not Found"
      />
      <Typography variant="h4" align="center" gutterBottom>
        Oops! Data Not Found
      </Typography>
      <Typography variant="body1" align="center">
        The requested data could not be found. Please try again later.
      </Typography>
      <Button sx ={{marginTop: 2,'&:hover': {backgroundColor: '#8DD3BB'}}} variant="contained" color="primary" size="large" onClick={() =>{navigate(`/`)}} >
        Go Back To Search
      </Button>
    </Container>
  );
};

export default DataNotFound;
