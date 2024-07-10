import React from 'react'
import {useState,useEffect} from 'react'
import Top from './Top'
import Detail from './Detail'
import Hotelimage from './Hotelimage'
import {Box} from '@mui/material'
import axios from 'axios'

const Detailsmain = () => {
    const [hotelData, setHotelData] = useState(null);
    const [hotelid, setHotelid] = useState(null);



    const fetchHotelData = async () => {
        try {
      const params = new URLSearchParams(window.location.search);
      const hotelId = params.get('q'); 

      
      const url = `http://localhost:3200/hotels/${hotelId}`;
        const response=await axios.get(url)
          
          const data=response.data;
          
          setHotelData(data);
          const id=data._id;
          setHotelid(id)
          console.log(data)
          
         }catch (error) {
          console.error('Error fetching data:', error);
        }
      };
    
      useEffect(() => {
        fetchHotelData();
      }, []);
  return (
    <div>
    <Box sx={{display: "flex", flexDirection: 'column', marginLeft: '0.3%' }}>
    <Top data={hotelData} />
     </Box>
    
    <Detail  data={hotelData}/>
    <Hotelimage data={hotelData} id={hotelid}/>
    </div>
    )
}

export default Detailsmain