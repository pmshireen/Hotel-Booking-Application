import React from 'react';
import { Grid, Paper, Typography} from '@mui/material';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import axios from 'axios';
import {useState,useEffect} from 'react';

const Overviewsection = () => {
  const [overview,setoverview]=useState();
  const [numReviews,setnumReviews]=useState();
  const [rating,setrating]=useState();
  const [overallReview,setoverallReview]=useState();
  const [locationFeatures,setlocationFeatures]=useState([]);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const params = new URLSearchParams(window.location.search);
      const hotelId = params.get('q'); 
      const url = `http://localhost:3200/hotels/${hotelId}`;
        const response=await axios.get(url)
      const data=response.data;
      console.log(data)
      if(data){
        setoverview(data.overview);
        setnumReviews(data.numReviews);
        const ratings=data.rating;
        const rate=ratings%1===0?ratings.toFixed(0):ratings.toFixed(1);
        setrating(rate);
        setoverallReview(data.overallReview);
        setlocationFeatures(data.locationFeatures);
      }

    } catch (error) {
      console.error('Error fetching data:', error.message);
    }
  };
  return (
    <div>
      
    <Grid container  style={{ height: '50vh',width:'90vw',marginTop:'70px'}}>
     <Grid item xs={12}  style={{ height: '20px',width:'1232px',overflow:'hidden' , fontFamily: "Montserrat, sans-serif", fontSize: "1.25rem",fontWeight: 700,lineHeight: "1.57875rem",}}  >Overview</Grid>
     <Grid item xs={12}  style={{ height: '140px',width:'1232px',overflow:'auto',marginTop:'15px', fontFamily: "Montserrat, sans-serif",  fontSize: "1rem",fontWeight: 500,lineHeight: "1.21875rem",}}  >{overview}</Grid>   
   
     
    <Grid container  style={{height:'145px',width:'1232px' }} >
           
              <Paper style={{ height: '145px',width:'166px',overflow: 'hidden', backgroundColor:'#8DD3BB' ,border: '0.5px  #000', borderRadius: '12px' }}>
                 <Paper elevation={0} style={{ height: '113px',width:'96px',marginLeft:'16px',backgroundColor:'#8DD3BB',marginTop:'16px',marginBottom:'16px' }}>
                    <Typography variant='element3' >{rating}</Typography><br/><br/>
                    <Typography variant='element4'  >{overallReview}</Typography><br/>
                    <Typography variant='element5'>{numReviews} Reviews</Typography>
                 </Paper>
              </Paper>
      {locationFeatures.map((feature, index) => (
        <Grid item xs={12} sm={6} md={4} lg={2} key={index}>
           <div>
              <Paper style={{ height: '145px',width:'160px',overflow: 'hidden',marginLeft:'40px',border: '2px solid #8DD3BB',borderRadius: '12px'}} >
                <AutoAwesomeIcon style={{ fontSize:40 ,marginLeft:'10px' ,marginTop:'10px'}}/><br/><br/><br/>
                <Grid sx={{  fontSize: "1rem",fontWeight: 500,lineHeight: "1.21875rem", marginLeft: '1.25rem',alignItems:'center'}}>{feature}</Grid>
               </Paper>
          </div>
          
        </Grid>
      ))}
    </Grid>
    </Grid>
    
    </div>
  );
};

export default Overviewsection;
