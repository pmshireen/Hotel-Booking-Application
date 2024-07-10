import React, { useState, useEffect } from 'react';
import Price from './Container/Price';
import Rate from './Container/Rate.jsx';
import Box from '@mui/material/Box';
import Ament from './Container/Ament.jsx';
import Divider from '@mui/material/Divider';


export default function Filter({handleSelectRating,handleChangePrice,handleCheckboxChange,extraAment, 
  selectedPrice,selectedRating,amenties,handleCheckboxChanges}) {

  return (
    <div>
      <Box style={{ display: 'flex' }}>
        <Box sx={{
          width: 343,
          height: 785.5,
          marginTop: '105px',
          marginLeft: '104px',
          bgcolor: 'background.paper'
        }}>
          <Price
            value={selectedPrice}
            changePrice={handleChangePrice} />
          <Divider variant="middle" />
          <Rate
            value={selectedRating}
            selectRating={handleSelectRating} />

          <Divider variant="middle" />
          <Ament 
          amenties ={amenties}
          extraAment ={extraAment}
           handleCheck ={handleCheckboxChange}
            handleExtraCheck ={handleCheckboxChanges}
            />
        </Box>
      </Box>
    </div>
  );
}