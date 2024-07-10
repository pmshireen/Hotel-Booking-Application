import React from 'react';
import {Container} from '@mui/material'
import Detail from './TitleCard';
import Booking from './Booking'
import Terms from './Terms'
import Top from '../hotel-details/images-display/Top'

const Main = () => {
  

  return (
    <>
      
      <Container id="pageContent" style={{marginTop:'7rem', width:'100%'}}>
      <Top />
      <Detail/>
      <Booking  />
      <Terms />
      </Container>
      
    </>
  );
};

export default Main;

