import React, { useState, useEffect } from "react";
import MainCard from "./Container/MainCard";
import { Container, Box, Button } from "@mui/material";
import BasicButtons from './Container/BasicButtons'

function Hotels({ data,In,out}) 
{
    const [showAllHotels, setShowAllHotels] = useState(false);
    const [showBut, setShowBut] = useState(true);
    const[display, setDisplay] = useState(true);
    const [selectedOption, setSelectedOption] = useState('Recommended');

   const getHotelsToShow = () => {
        if (showAllHotels) {
            return data; // Return all hotels when showAllHotels is true
        } else {
            return data.slice(0, 4); // Return the first 4 hotels
        }
         }
    useEffect(() => {
        if (!Array.isArray(data)) {
            setShowBut(false);
        }
        if (data.length > 4) {
            setDisplay(true); // Set display to true when data length is greater than 4
        } else {
            setDisplay(false); // Set display to false when data length is 4 or less
        }
    }, [data]);

    const handleShowMoreLessClick = () => {
        setShowAllHotels(!showAllHotels);
    };
    useEffect(() => {
        console.log("selectedOption:", selectedOption);
    }, [selectedOption]);
    
    // const containerHeight = showAllHotels ? data.length * 350 : 350;

    return (
        <Box>
            <Container sx={{ width: '970px', height:'1400', marginTop: '-810px', marginRight: '100px' }}>
            {showBut && (
                <Box sx={{height:'30px'}}>
                    
                <BasicButtons items={data} buttonStatus ={showAllHotels} setSelectedOption= {setSelectedOption} selectedOption ={selectedOption} />
                </Box > )}
                <MainCard hotelData={getHotelsToShow()}  selectedOption ={selectedOption}showAllHotels={showAllHotels} />
                {showBut && display && (
                    <Box sx={{ marginTop: 3 }}>
                        <Button
                            onClick={handleShowMoreLessClick}
                            disableRipple
                            disableElevation
                            sx={{
                                width: 895,
                                marginLeft: 1,
                                height: '48px',
                                backgroundColor: "#112211",
                                '&:hover': {
                                    backgroundColor: '#112211'
                                }
                            }}
                        >
                        {showAllHotels ? "Show less results" : "Show more results"}
                        </Button>
                    </Box>
                )}
            </Container>
        </Box>
    );
                        }

export default Hotels;
