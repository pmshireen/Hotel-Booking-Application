import React from 'react';
import theme from '../../utils/theme/theme.jsx';
import { ThemeProvider } from '@emotion/react';

import { Button, Card, CardContent, Typography, Grid,CardMedia,CardActionArea,Box} from '@mui/material';
import {useState} from 'react'
import { useNavigate } from 'react-router';

const Cards = () => {
  const navigate=useNavigate();
  const [displayedImages, setDisplayedImages] = useState(4);
  const [containerHeight, setContainerHeight] = useState('90vh');
  


  const imageList = [
    {
      id: 1,
      imageUrl: "https://media.istockphoto.com/id/499644827/photo/indian-temple.jpg?s=612x612&w=0&k=20&c=mSRsr-98K_qcg6dBkmFGothhswnPAp5i21G34Q6kDZw=",
      title: 'Madurai',
    
      description: 'Magnificient Temples',
    },
    {
      id: 2,
      imageUrl: "https://www.holidify.com/images/bgImages/TUTICORIN.jpg" ,
      title: 'Tuticorin',
     
      description: 'Beautiful Seashore',
    },
    {
      id: 3,
      imageUrl: "https://media.istockphoto.com/id/518174579/photo/night-traffic-in-bangalore.jpg?s=612x612&w=0&k=20&c=zgAH6jkXNuFGao2PpqSGyMsYmqfs4DpwIM6ccB7ivjE="
      ,
      
      title: 'Bangalore',
      
      description: 'Amazing streets',
    },
    {
      id: 4,
      imageUrl: "https://as2.ftcdn.net/v2/jpg/00/47/49/01/1000_F_47490128_JLClMTbZyVdxl3OW2m8H4vJHW7hDZ8Jj.jpg" ,
      title: 'Hyderabad',
     
      description: 'Hyderabad Adventure',
    },
    {
      id: 5,
      imageUrl: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1632&q=80" ,
      title: 'Trivandrum',
      
      description: 'Piece of Paradise',
    },
    {
      id: 6,
      imageUrl: "https://media.istockphoto.com/id/470913348/photo/lighthouse-mamallapuram.jpg?s=612x612&w=0&k=20&c=KnPAZiRI4-iCnQhpNash9J7n1qliud-HN-OkaUkbXOw=" ,
      title: 'Pondicherry',
      
      description: 'Enchanting Journey',
    },
    {
       id: 7,
      imageUrl: "https://media.istockphoto.com/id/1094387460/photo/night-beach-party-in-goa.jpg?s=612x612&w=0&k=20&c=90oHFh3klXfMASU5t0za7OyFde5FMLA9i_kB3mi37sM=" ,
      title: 'Goa',
      description: 'Happiness in waves'
     
    },
    {
      id: 8,
      imageUrl: "https://c1.wallpaperflare.com/preview/904/465/140/1913-architecture-building-chennai.jpg" ,
      title: 'Chennai',
      description: 'Gateway South'
     

    }

  ];

  const handleSeeAll = () => {
    setDisplayedImages(imageList.length); 
    setContainerHeight('auto');
    
  };


const handleBook=(title)=>{
  const rooms=1;
 
   const today=new Date();
   
   const todayFormatted = today.toISOString().substring(0, 10);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowFormatted = tomorrow.toISOString().substring(0, 10);
  const queryString = `?q=${encodeURIComponent(title)}&checkIn=${encodeURIComponent(todayFormatted)}&checkOut=${encodeURIComponent(tomorrowFormatted)}&rooms=${encodeURIComponent(rooms)}`;
  navigate(`/hotel-listing${queryString}`);


}



  return (
    <ThemeProvider theme={theme}>
      
    <Grid container sx={{height: containerHeight,width:'75vw' }} >
    <Box 
    sx={{ display: "flex",flexDirection:'column'}}>
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="h4n" component="h6" sx={{marginLeft:1}}>
            Fall Into Travel!
          </Typography>
          <Button variant='outlined' sx={{color:'black'}} disabledElevation onClick={handleSeeAll}> See all </Button> 
        </Box><Box sx={{width:900}}  >
    <Typography 
    variant="body1" 
    component="h6" 
    sx={{ marginTop: 1.2 ,marginLeft:1}}>
    Going somewhere to celebrate the season? Whether you're going home or somewhere to roam! We have got the travel tools to get you to your destination 
    </Typography></Box>
    <Grid container direction="row" spacing={1} sx={{marginTop:1}}>
      
      {imageList.slice(0,displayedImages).map((image) => (
        <Grid item key={image.id} sx={{width:'25%',marginTop:3}}>
            <Card
            sx={{
              height:'400px',
              backgroundImage:  `url(${image.imageUrl})`,
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              position: 'relative',
              objectFit:'cover',
              overflow:'hidden',
              borderRadius:'14px',
              marginLeft:0.8,
              width:'270px'}}>


         
            <CardContent >
            < Grid container spacing={7} sx={{marginTop:'87%',color:'white'}} >
            <Grid item xs={8} >
              <Typography gutterBottom variant="h6" component="div" sx={{ whiteSpace: 'nowrap',marginLeft:0.5 }}>
                {image.title}
              </Typography>
              <Typography gutterBottom variant="caption" component="div" sx={{ whiteSpace: 'nowrap',marginLeft:0.5 }}>
                {image.description}
              </Typography>
            </Grid>
            
            </Grid>
          

              <Button
                variant="contained" 
                 diabledElevation disableRipple
                 onClick={()=>handleBook(image.title)}
                style={{
                  position: 'absolute',
                  bottom: '20px',alignItems:'center',
                 
                   marginLeft:"0.5%",
                 
                  width:'240px',
                  color:'black',
                  
                  backgroundColor:theme.palette.primary.main
                }}
              >
               < Typography variant="btntext" >Book a hotel</Typography> 
              </Button>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid></Box></Grid></ThemeProvider>
  );
};

export default Cards
