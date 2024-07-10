import {Alert, Button,IconButton } from "@mui/material";
import React from "react";
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import { useState,useEffect } from "react";
import { Snackbar } from "@mui/material";


function FavIcon({hotelIds}){
   

    const [loggedIn, setLoggedIn] = useState(false);
    const [isFilled, setIsFilled] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [userName, setUserName] = useState('')

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
                const valueToCheck = data.some((item) => item._id === hotelIds);
                setIsFilled(valueToCheck); // Set the isFilled state based on the check
            } else {
                console.log("Request failed with status:", response.status);
            }
        } catch (error) {
            console.error("An error occurred:", error.message);
        }
    };
    
    

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


    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };
    
    const handleIconClick =() =>{

            if (!loggedIn) {
                // Display a snackbar or a message indicating the need to log in
                setSnackbarOpen(true); 
                console.log("Login please to add a favorite icon");
                return;
            }
            const newFav =  !isFilled;   
            setIsFilled(newFav);
            const url = `http://localhost:3200/auth/users/favourites/${hotelIds}`;
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

        }  


    return(
       
        <>
         
        <IconButton  onClick = {handleIconClick} variant = "outlined" sx ={{maxHeight: '33px',width: 25,ml:4}} >
            <Button variant="outlined">
                {isFilled ? <FavoriteOutlinedIcon style={{ color: '#FF8682' ,fontSize: 24}}/> : 
                 <FavoriteBorderOutlinedIcon  />
                }

            </Button>
        </IconButton>
        <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
            <Alert elevation={6} variant="filled" severity="error" onClose={handleSnackbarClose}>
              {
                'Please login to add favourite'}
            </Alert>
          </Snackbar>
    
       </>
    );
}
export default FavIcon;