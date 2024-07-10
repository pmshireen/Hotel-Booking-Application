import React from 'react'
import theme from '../../utils/theme/theme.jsx';
import { Box, Paper, TextField, InputAdornment, Grid, FormControl, Typography, Button, IconButton} from '@mui/material';
import DirectionsCarSharpIcon from '@mui/icons-material/DirectionsCarSharp';
import PersonIcon from '@mui/icons-material/Person';
import ApartmentIcon from '@mui/icons-material/Apartment';
import AddIcon from '@mui/icons-material/Add';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RoomIcon from '@mui/icons-material/Room';
import { useState } from 'react';
import { styled } from '@mui/material/styles'
import { ThemeProvider } from '@emotion/react';
import search from '../../assets/icons/search-icons/search.svg';
import car from '../../assets/icons/search-icons/car.svg';
import location from '../../assets/icons/search-icons/location.svg';
import { Link , useNavigate} from 'react-router-dom';

const StyledTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "#1C1B1F"
  },
  "& .MuiFormLabel-root": {
    fontSize: '19px', fontFamily: "Montserrat, sans-serif", color: '#1C1B1F'

  },

  width: "220px",
  "& .MuiOutlinedInput-root": {
    "&.Mui-focused fieldset": {
      borderColor: "gray"
    }
  }
});


const StyledButton = styled(Button)({
  backgroundColor: theme.palette.primary.main,
  "&:hover": {
    background: theme.palette.primary.main
  }
  ,
  boxShadow: "none",

  color: 'black'
});





const Searchafter = ({dest,checkin,checkout,rooms,handleSearch,setDest,setIn,setOut,setRoom}) => {

   const navigate = useNavigate();
  
  
  
   const handleClick=()=>{ 
    const queryString =`?q=${encodeURIComponent(dest)}&checkIn=${encodeURIComponent(checkin)}&checkOut=${encodeURIComponent(checkout)}&rooms=${encodeURIComponent(rooms)}`;
    navigate(`/hotel-listing${queryString}`);
    handleSearch();
  }
   
   

 
  















  

  


  



  return (
    <ThemeProvider theme={theme}>

      <Paper elevation={2} sx={{ width: "80vw", height: '16vh', borderRadius: '16px',marginTop:'8%' ,marginLeft:'8%'}} >
      
        <FormControl >
          < Grid container direction="row" spacing={2} sx={{ marginTop: '10px', marginLeft: 2,marginTop:'1%' }} >
            <Grid item>
              <StyledTextField
                variant='outlined'
                label="Enter Destination" id="destination"
                sx={{ width: '360px' }}
                value={dest}
                onChange={(e)=>setDest(e.target.value)}
                autoComplete='off'
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <img src={location} />
                    </InputAdornment>
                  ),
                }} ></StyledTextField></Grid>

            <Grid item>
              <StyledTextField type="date" label="Check In" variant='outlined'
                id="checkin"
                InputLabelProps={{ shrink: true }}
                value={checkin}
                onChange={(e)=>setIn(e.target.value)}
              ></StyledTextField></Grid>

            <Grid item><StyledTextField type="date" label="Check Out" id="checkout"
              variant='outlined'
              value={checkout}
              onChange={(e)=>setOut(e.target.value)}
              InputLabelProps={{ shrink: true }}></StyledTextField></Grid>


            <Grid item ><StyledTextField label="Rooms" sx={{ width: '250px' }} id="rooms"
              value={rooms}
              onChange={(e)=>setRoom(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <img src={car} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton >
                      <AddCircleIcon onClick={(e)=>setRoom(rooms+1)} /></IconButton>
                  </InputAdornment>
                )
              
              }}

            >
            </StyledTextField>
            </Grid>
            <Grid item >

              <Box sx={{height:'55px',width:'55px',backgroundColor:'#8DD3BB',display:'flex',justifyContent:'center',alignItems:'center',borderRadius:'3px'}}>
                  <IconButton  onClick={handleClick} >
                   <img src={search} ></img>
                  </IconButton>
              
              </Box>

          
            </Grid>
            
          </Grid>
        </FormControl>
        
      </Paper>
    </ThemeProvider>
  )
}

export default Searchafter