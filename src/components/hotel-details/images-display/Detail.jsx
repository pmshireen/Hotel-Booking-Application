import React from 'react'
import { useState,useEffect} from 'react';
import {Snackbar,Alert,Grid, Typography } from '@mui/material'

import StarOutlinedIcon from '@mui/icons-material/StarOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShareIcon from '@mui/icons-material/Share';
import { IconButton } from '@mui/material';
import location from '../../../assets/icons/location-icon/location.svg'
import { Close } from '@mui/icons-material';
import { Dialog, DialogContent, DialogTitle, DialogActions, InputAdornment, TextField } from '@mui/material';
import { EmailIcon, FacebookIcon, WhatsappIcon, TelegramIcon, TwitterIcon, LinkedinIcon } from "react-share";

const Detail = ({data}) => {
  
  const [name,setName]=useState(null)
  const [userName,setUserName] =  useState('');
  

  const [hotelTypeStars, setHotelTypeStars] = useState([]);
  const [hotelType,setHotelType]=useState(null)
  const [loc,setLoc]=useState(null);
  const [id,setId]=useState(null);
  const [hotelRating, setHotelRating] = useState(null);
  const [number,setNumber]=useState(null)
  const [rate,setRate]=useState(null)
  const [review, setReview] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
    const [isFilled, setIsFilled] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  useEffect(() => {
    if (data) {
      
        const name=data.hotelName;
        setName(name)
        const id=data._id;
        setId(id)
         
        console.log(id)
        const hotelRating = data.hotelType;
        setHotelType(hotelRating)
        setHotelTypeStars(renderStars(hotelRating));
        const loc=data.location.address;
        setLoc(loc)
        const rate=data.rating;
        const show= rate % 1 === 0 ? rate.toFixed(0) : rate.toFixed(1);
        setHotelRating(show)
        const revno=data.numReviews;
        setNumber(revno)
        const rpn=data.ratePerNight;
        setRate(rpn)
        const allreview=data.overallReview;
        setReview(allreview)
       
    
        
      }
    }, [data, id]);

    useEffect(()=>{
      if(loggedIn){
      favouriteHotels();
      }
  },[loggedIn]);

  useEffect(() => {
    const checkLoggedInStatus = async () => {
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
                    if (responseData.info) {
                        // console.log("User data:", responseData.info);
                        // setProfilepic(responseData.info.profilePicture);
                        setUserName(responseData.info.userName);
                    } else {
                        console.log("No user data available.");
                    }
                } else {
                    setLoggedIn(false);
                    console.log("User is not logged in.");
                }
            } else {
                console.log("Request failed with status:", response.status);
            }
        } catch (error) {
            console.error("An error occurred:", error.message);
        }
    };

    checkLoggedInStatus();
}, []);

const favouriteHotels = async () => {
  const url = "http://localhost:3200/auth/users/favourites";
  try {
      const response = await fetch(url, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
      });

      if (response.ok) {
          const data = await response.json();
          const valueToCheck = data.some((item) => item._id === id);
          setIsFilled(valueToCheck); // Set the isFilled state based on the check
      } else {
          console.log("Request failed with status:", response.status);
      }
  } catch (error) {
      console.error("An error occurred:", error.message);
  }
};

const handleSnackbarClose = () => {
  setSnackbarOpen(false);
};


      
  


  const commonIconButtonStyle = {
    height: '32px',
    color: '#112211',
    padding: '5px',
    border: '1px solid #8DD3BB',
    borderRadius: '0',
    marginRight: '12px',
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < rating; i++) {
      stars.push(
        <StarOutlinedIcon key={i} fontSize="small" style={{ color:'#FF8682' }} />
      );
    }
    return stars;
  };
  
  const handleFavoriteClick = () => {
    if (!loggedIn) {
      // Display a snackbar or a message indicating the need to log in
      setSnackbarOpen(true); 
      console.log("Login please to add a favorite icon");
      return;
  }
  const newFav =  !isFilled;
 
  setIsFilled(newFav);
  const url = `http://localhost:3200/auth/users/favourites/${id}`;
  // console.log(url)
  const method = newFav ? 'POST' : 'DELETE';
  const fetchOptions = {
      method: method,
      headers: {"Content-Type":"application/json"},
      credentials: "include",
    };
    fetch(url, fetchOptions)
      .then(response => {
          if (!response.ok) {
          throw new Error('Network response was not ok');
          }
          return response.json(); 
      })
      .then(data => {
          console.log('PUT request succeeded with response:', data);
      })
      .catch(error => {
          console.error('There was a problem with the PUT request:', error);
      });

  };
  const handleShareClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const [open, setOpen] = useState(false);
  const [sharingMessage, setSharingMessage] = useState('');

  const currentURL = window.location.href;

  const handleShare = async (platform) => {
    const sharingURL = currentURL;
    const sharingText = sharingMessage;
    let message = sharingText ? `${sharingText}\n\n` : '';

    if (navigator.share) {

      try {
        await navigator.share({
          title: sharingText,
          text: ' ',
          url: sharingURL,
        }); setSharingMessage('');
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      message += platform === 'mail' ? sharingURL : `${sharingText} ${sharingURL}`;


      switch (platform) {
        case 'mail':
          const subject = 'Check out this link';
          const body = sharingText ? `${sharingText}\n\n${sharingURL}` : sharingURL;
          window.open(
            `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`)
          break;
        case 'whatsapp':
          const encodedMessage = encodeURIComponent(sharingText ? `${sharingText}: ${sharingURL}` : sharingURL);
          window.open(`https://api.whatsapp.com/send?text=${encodedMessage}`, '_blank');
          break;
        case 'telegram':
          window.open(
            `https://t.me/share/url?url=${encodeURIComponent(sharingURL)}&text=${encodeURIComponent(
              sharingText
            )}`
          );
          break;
        case 'linkedin':
          window.open(
            `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
              sharingURL
            )}&title=${encodeURIComponent(sharingText)}`
          );
          break;
        case 'twitter':
          window.open(
            `https://twitter.com/intent/tweet?url=${encodeURIComponent(
              sharingURL
            )}&text=${encodeURIComponent(sharingText)}`
          );
          break;
        case 'facebook':
          window.open(`https://www.facebook.com/sharer.php?u=${encodeURIComponent(sharingURL)}`);
          break;
        default:
          break;
      }
    }
  };


  return (
    <div >
      <Grid container  style={{height:'15vh',width:'90vw',marginTop:'2vh'}}>
        <Grid item xs={10} container direction="column">
          <Grid item sx={{height:'5vh'}}>
             <Typography variant="h1" sx={{fontSize:'24px'}}>{name}&nbsp;
                  <Typography variant="pico" component="span" style={{display:'inline-flex',alignItems:'center'}}>
                      {hotelTypeStars} 
                      {hotelType} Star Hotel
                  </Typography>
              </Typography>
           </Grid>
            <div >
            <Grid item style={{height:'5vh',padding:'1vh 0'}}>
              <Typography variant='pico'> 
              <img src={location} alt="location"/>{loc}
              </Typography>
            </Grid>
            <Grid item container alignItems="center" sx={{height:'5vh',padding:'1vh 0'}}>
               <Typography variant='body1' sx={{fontWeight:'500',marginLeft:'0.2vw'}}>{hotelRating}</Typography>&nbsp;
               <Typography variant="body1" sx={{fontWeight:'700'}}>{review}</Typography>&nbsp;
               <Typography variant="pico">{number} reviews</Typography>
            </Grid>
            </div>
            </Grid>
            <Grid item xs={2} container direction="column" sx={{height:'15vh',marginLeft:'-2px',width:'10vw'}}>
              <Grid item sx={{color:'#FF8682',alignItems:'center',height:'7.5vh',marginTop:'0.5vh'}}>
                    <Typography variant="h4" align="right">Rs {rate}
                        <Typography variant="body1" style={{display:'inline'}}>/night
                        </Typography>
                    </Typography>
                </Grid>

          <Grid item style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
            <Grid item >
              <IconButton sx={commonIconButtonStyle} onClick={handleFavoriteClick}>
                {isFilled  ? <FavoriteIcon /> : <FavoriteBorderIcon />}</IconButton>
            </Grid>
            <Grid item>
              <IconButton sx={commonIconButtonStyle} onClick={handleShareClick}><ShareIcon /></IconButton>
              <div>
                <Dialog open={open} onClose={handleClose} maxWidth="sm">
                  <DialogTitle>Share</DialogTitle>
                  <DialogContent  >
                    <TextField
                      value={sharingMessage}
                      onChange={(e) => setSharingMessage(e.target.value)}
                      style={{ fontSize: 14 }}
                      fullWidth
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton onClick={handleClose}>
                              <Close />
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      InputLabelProps={{
                        style: {
                          shrink: true,
                        },
                      }}
                    />

                  </DialogContent>
                  <DialogActions style={{ display: 'flex', justifyContent: 'center' }}>
                    <EmailIcon onClick={() => handleShare('mail')} style={{ width: 40, height: 40, cursor: 'pointer' }} />
                    <WhatsappIcon onClick={() => handleShare('whatsapp')} style={{ width: 40, height: 40, cursor: 'pointer' }} />
                    <TelegramIcon onClick={() => handleShare('telegram')} style={{ width: 40, height: 40, cursor: 'pointer' }} />
                    <LinkedinIcon onClick={() => handleShare('linkedin')} style={{ width: 40, height: 40, cursor: 'pointer' }} />
                    <TwitterIcon onClick={() => handleShare('twitter')} style={{ width: 40, height: 40, cursor: 'pointer' }} />
                    <FacebookIcon onClick={() => handleShare('facebook')} style={{ width: 40, height: 40, cursor: 'pointer' }} />
                  </DialogActions>
                </Dialog>
              </div>
            </Grid>
            
          </Grid>
        </Grid>
      </Grid>
      <Snackbar
            open={snackbarOpen}
            autoHideDuration={4000}
            onClose={handleSnackbarClose}
            message="Please log in to add a favorite icon"
        />
    </div>
  )
}

export default Detail
