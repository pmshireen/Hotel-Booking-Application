import { CardContent, CardMedia, Typography, Grid, Box } from '@mui/material'
import React from 'react'

import { useState, useEffect } from 'react'
const RecentSearch = () => {

  const[imgdata,setData]=useState([]);
  const [loggedIn,setLoggedIn]=useState(false)

  const  imgList=[{

        id:1,
        Hotel:"Taj Club House",
        location:"Chennai",
        imgUrl:" https://content3.jdmagicbox.com/comp/chennai/v3/044p1230715671n6w3v3/catalogue/taj-club-house-mount-road-chennai-5-star-hotels-3qitv8p.jpg",

        },
       {
        id:2,
        Hotel: "Abad Green Forest",
        location:"Thekkady",
        imgUrl:"https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1c/fd/c1/aa/abad-green-forest-resort.jpg?w=700&h=-1&s=1",
        },
       {
        id:3,
        Hotel:"Hotel President",
        location:"Madurai",
        imgUrl:"https://r2imghtlak.mmtcdn.com/r2-mmt-htl-image/flyfish/raw/NH7321443869726/QS1042/QS1042-Q1/IMG_20191222_215135.jpg"
       },
       {
        id:4,
        Hotel:"Hilton Garden Inn",
        location:"Trivandrum",
        imgUrl:"https://cf.bstatic.com/xdata/images/hotel/max1280x900/433811893.jpg?k=a4f1a888c9a3f3284ceccc494a328be962150e4d007de9da1d8a6f0f11f13b8b&o=&hp=1"
       }
  



]


const askLoggedInStatus = async () => {
  try {
      const response = await fetch(
          "http://localhost:3200/auth/users/user/islogined",
          {
              method: "GET",
              headers: { "Content-Type": "application/json" },
              credentials: "include",
          }
      );

      if (response.ok) {
          const responseData = await response.json();

          if (responseData.success) {
              setLoggedIn(true);

              console.log("User is logged in.");
             
          } else {
              setLoggedIn(false);
              console.log("User is not logged in.");
          }
      } 
  } catch (error) {
      console.error("An error occurred:", error.message);
  }
};





  const fetchData = async () =>{
    try{
    const url="http://localhost:3200/auth/users/recent";
    const response = await fetch(url,{
      
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
    
    });
    const data = await response.json();
    console.log("recent data",data);
    setData(data);
   }
   catch(error){
      console.log("Error:",error);
   }
  };




  
useEffect(() => {
  askLoggedInStatus();
  
}, []);

useEffect(() => {
  if (loggedIn) {
    fetchData();
  }
}, [loggedIn]);



  return (

    <Grid container sx={{ height: '22vh', width: '75vw', marginTop: 3 }}>
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Typography variant="h4n" component="h6" marginLeft={1}>
        {imgdata.length > 0 ? 'Your Recent Searches' : 'Popular Hotels'}
      </Typography>

      <Grid container spacing={1} direction="row" sx={{ marginTop: 2, width: '76vw', height: '20vh', marginLeft: 0.5 }}>
        {imgdata.length > 0 ? (
          imgdata.slice(0, 4).map((recent, index) => (
            <Grid item key={index} xs={3} sx={{ width: '25%' }}>
              <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <Box
                  sx={{
                    width: 90,
                    height: 90,
                    border: '1px solid #ccc',
                    borderRadius: 3,
                    overflow: 'hidden',
                    flexShrink: 0,
                  }}
                >
                  <img src={recent.images[0]} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt={recent.hotelName} />
                </Box>
                <Box display="flex" flexDirection="column" justifyContent="center" height="100%" sx={{ marginLeft: 1.2 }}>
                  <Typography variant="subtitle" sx={{fontFamily: 'Montserrat, sans-serif', fontWeight: 600,maxWidth:'160px',whiteSpace:'normal'}}>
                    {recent.hotelName}
                  </Typography>
                  <Typography variant="body2">{recent.location['cityName']}</Typography>
                </Box>
              </Box>
            </Grid>
          ))
        ) : (
          imgList.map((popular, index) => (
            <Grid item key={index} xs={3} sx={{ width: '25%' }}>
              <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <Box
                  sx={{
                    width: 90,
                    height: 90,
                    border: '1px solid #ccc',
                    borderRadius: 3,
                    overflow: 'hidden',
                    flexShrink: 0,
                  }}
                >
                  <img src={popular.imgUrl} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt={popular.Hotel} />
                </Box>
                <Box display="flex" flexDirection="column" justifyContent="center" height="100%" sx={{ marginLeft: 1.2 ,overflow:'hidden',wordWrap:'break-word'}}>
                  <Typography variant="body1" sx={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 500, maxWidth:'150px',whiteSpace:'normal'}}>
                    {popular.Hotel}
                  </Typography>
                  <Typography variant="body2">{popular.location}</Typography>
                </Box>
              </Box>
            </Grid>
          ))
        )}
      </Grid>
    </Box>
  </Grid>
);
};

export default RecentSearch