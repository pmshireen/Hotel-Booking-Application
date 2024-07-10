import React from 'react'
import {useState,useEffect} from 'react'
import StarOutlinedIcon from '@mui/icons-material/StarOutlined';
import location from '../../../assets/icons/location-icon/location.svg'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { Box,Grid,Typography,IconButton} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


const Extraimages = () => {
    
    const [name,setName]=useState(null)
    const [hotelTypeStars, setHotelTypeStars] = useState([]);
    const [hotelType,setHotelType]=useState(null)
    const [loc,setLoc]=useState(null);
    const [rate,setRate]=useState(null)
    const [lefttop, setLefttop] = useState(null);
    const [righttop, setRighttop] = useState([]);
    const [leftbot, setLeftbot] = useState([]);
    const [rightbot, setRightbot] = useState(null);
    const navigate = useNavigate();
    
    
    
  
    const fetchData = async () => {
      try {
      const params = new URLSearchParams(window.location.search);
      const hotelId = params.get('q'); 

      
      const url = `http://localhost:3200/hotels/${hotelId}`;
        const response=await axios.get(url)
          
        const data=response.data;
       
        const name=data.hotelName;
        setName(name)
        const hotelRating = data.hotelType;
        setHotelType(hotelRating)
        setHotelTypeStars(renderStars(hotelRating));
        const loc=data.location.address;
        setLoc(loc)  
        const rpn=data.ratePerNight;
        setRate(rpn)
        const images = data.images;
        setLefttop(images[0]);
        setRighttop(images.slice(1, 5));
        setLeftbot(images.slice(5, 9));
        setRightbot(images[9]);
        
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    useEffect(() => {
      fetchData();
    }, []);
  
  
    const renderStars = (rating) => {
      const stars = [];
      for (let i = 0; i < rating; i++) {
        stars.push(
          <StarOutlinedIcon key={i} fontSize="small" style={{ color:'#FF8682' }} />
        );
      }
      return stars;
    };    
    

            return (
                <div>
                  
                  <Box sx={{ display: "flex", flexDirection: 'column',alignItems: 'center',marginTop:'12vh'}}>
                  <IconButton onClick={() => navigate(-1)}
                sx={{ position: 'fixed', top: '17vh', left: '2vw', borderRadius: '50%',
                padding: '10px',
                cursor: 'pointer',boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)','&:hover': {backgroundColor: 'white',
                  transform: 'scale(1.1)'},}} >
                <ArrowBackIcon />
            </IconButton>
            <Grid container style={{height:'12vh',width:'85vw',marginTop:'5vh',marginBottom:'5vh'}}>
                      <Grid item xs={10} container direction="column">
                          <Grid item sx={{height:'6vh'}}>
                               <Typography variant="h1" sx={{ fontSize: '24px' }}>{name}&nbsp;
                               <Typography variant="pico" component="span" style={{ display: 'inline-flex', alignItems: 'center' }}>
                                  {hotelTypeStars}
                                    {hotelType} Star Hotel
                                </Typography>
                               </Typography>
                                 </Grid>
                                 
                            <Grid item style={{height:'6vh',padding:'5px 0'}}>
              <Typography variant='pico' >
                <img src={location} alt="location" />{loc}
              </Typography>
            </Grid>
            
            </Grid>
            <Grid item xs={2} container direction="column" sx={{marginLeft: '-3px' }}>
          <Grid item sx={{ color: '#FF8682', marginTop:'2.5vh'}}>
            <Typography variant="h4" align="right" >Rs {rate}
              <Typography variant="body1" style={{ display: 'inline', marginTop: '4vh' }}>/night
              </Typography>
            </Typography>
          </Grid>
          </Grid>
            </Grid>
            {/* images */}
            <Grid container spacing={0.5} sx={{height:'100vh',width:'85vw',marginBottom:'1vh'}}>
       <Grid item xs={6} sx={{height: '100%', overflow: 'hidden'}}>
         <img src={lefttop}  style={{ width: '100%', height: '100%',margin: 0, padding: 0 ,marginLeft:'-3px',marginRight: '-4px'}} />
       </Grid>
       <Grid item xs={6}>
         <Grid container spacing={0.5} sx={{height:'100vh'}}>
             {righttop.map((image, index) => (
             <Grid key={index} item xs={6} sx={{width: '50%', height: '50%' }}>
                <img src={image} alt={`Image ${index + 1}`} style={{ width: '100%', height: '100%' }} />
               
            </Grid>
                 ))}
           </Grid>
      </Grid>
  </Grid>
  <Grid container spacing={0.5} sx={{height:'100vh',width:'85vw',alignItems: 'stretch',justifyContent: 'flex-start',marginBottom:'20vh'}}>
       
       <Grid item xs={6}>
         <Grid container spacing={0.5} sx={{height: '100vh', display: 'flex', flexWrap: 'wrap',alignItems: 'stretch'}}>
             {leftbot.map((image, index) => (
             <Grid key={index} item xs={6} sx={{width: '50%', height: '50%', position: 'relative' }}>
                <img src={image} alt={`Image ${index + 1}`} style={{ width: '100%', height: '100%',flexShrink: 0,margin: 0, padding: 0 ,marginLeft:'-3px',marginRight: '-4px' }} />
               
            </Grid>
                 ))}
           </Grid>
      </Grid>
      <Grid item xs={6} sx={{height: '100%', overflow: 'hidden'}}>
         <img src={rightbot}  style={{ width: '100%', height: '100%'}} />
       </Grid>
  </Grid>
          
              </Box>
            </div>
  )
}

export default Extraimages;