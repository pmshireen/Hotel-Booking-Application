import React from 'react'
import {useState,useEffect} from 'react'
import { Typography } from '@mui/material'
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';

const Top = ({data}) => {
  const [city,setCity]=useState()
  const [name,setName]=useState()

  useEffect(() => {
    if (data) {
      const city=data.location.cityName;
        setCity(city)
       
        const hotel=data.hotelName;
        setName(hotel)
      
    
        
    }
  }, [data]);
  return (
    <div style={{width:'90vw',marginTop:'15vh',display: 'flex', }}>
        <Typography variant="pico" sx={{color:'#FF8682'}}>India</Typography>
            <ChevronRightOutlinedIcon fontSize='small' />
            <Typography variant="pico" sx={{color:'#FF8682'}} >{city}</Typography>
              <ChevronRightOutlinedIcon fontSize='small' />
            <Typography variant="pico" sx={{color:'#121'}}>{name}
            </Typography>
       </div>
  )
}

export default Top