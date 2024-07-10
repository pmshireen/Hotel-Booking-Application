import React from "react";
import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

function ViewButton({ hotelIds,In,out }) {
    // console.log("item", hotelIds);
    const navigate = useNavigate();
  
    const handleIconClick = () => {     
      
        // const queryString = `?q=${encodeURIComponent(hotelIds)}`;
        const queryString = `?q=${encodeURIComponent(hotelIds)}&checkIn=${encodeURIComponent(In)}&checkOut=${encodeURIComponent(out)}`;
        const url = `http://localhost:3200/auth/users/recent/${hotelIds}`;
        const fetchOptions = {
          method: 'PUT',
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
          navigate(`/hotel-details${queryString}`);  
        
      };

  return (
    <Button
      size="large"
      onClick={handleIconClick}
      variant="outlined"
      disabledRipple
      sx={{
        width: '420px',
        height: '38px',
        backgroundColor: '#8DD3BB',
        marginRight: '28px',
        marginLeft: '50px',
        marginTop: -0.3,
        '&:hover' :{
          backgroundColor :'#8DD3BB'
        }
      }}
    >
      <Typography
        color={'#112211'}
        sx={{
          fontFamily: 'Montserrat',
          fontSize: '16px',
          lineHeight: "normal",
          fontWeight: 500,
          fontStyle: "normal"
        }}
      >
        View Place
      </Typography>
    </Button>
  );
}

export default ViewButton;

