import {Box,CardMedia} from "@mui/material";
import React from "react";

function Media({imageUrl}){
    return(
        <Box sx={{ display:'flex',flexDirection: 'column'}}>
            <Box sx = {{width: 300 ,height: 400}}>
                <img src = {imageUrl} alt = "Hotel" style = {{width: "100%" ,height: "100%", objectFit: "cover"}} /> 
            </Box>
        </Box>
    );
}
export default Media;