import { Box, Grid ,CardContent,Button, Typography} from "@mui/material";
import CoffeeIcon from '@mui/icons-material/Coffee';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Rating from '@mui/material/Rating';
import {React} from "react";
import Divider from '@mui/material/Divider';

function Content({items}){  
    const hotelTypes = items.hotelType;
    const hotelStarRating = parseFloat(items.rating.toFixed(1));

    return(                  
        <Box sx = {{height: 220}}>
            <CardContent>
                <Grid item sx={{ flex: '1 0 auto',marginLeft: 53.5,marginTop: -1.5}} > 
                    <Grid item sx = {{marginLeft: '23px'}}>
                    <Typography variant = "price" component="span">
                        Starting from
                    </Typography></Grid>                                  
                    <Grid item sx ={{marginLeft: '23px'}}>
                    <Typography variant = "nightprice">
                        Rs{items.ratePerNight} 
                    </Typography>
                    <Typography variant = "night" sx={{ marginLeft: '3px', marginTop: '2px' }}>
                            /night
                        </Typography>
                    </Grid>
                    <Grid sx = {{marginLeft: '67px', marginTop: '-2.8px',paddingLeft: '1px'}}>
                        <Typography
                            sx={{ fontFamily: 'Montserrat, sans-serif', fontSize: '13px'}}>
                            excl. tax
                        </Typography> 
                    </Grid>                          
                </Grid>    

                <Grid item sx = {{textAlign : 'left',marginTop:-6.5,marginBottom:3.5}}>
                    <Typography variant = "heading">{items.hotelName}</Typography>
                </Grid>
                <Grid container direction="row" alignItems="center">   
                <Grid item sx={{ textAlign: 'left', display: 'flex', alignItems: 'center',marginBottom:1.5 }}>
                            <Grid item sx = {{marginTop: 1}}>
                            <LocationOnIcon /></Grid>
                            <div style={{ marginLeft: 2, display: "flex", flexDirection: "column" }}>
                                <Typography variant="address">
                                    {items.location.address}
                                </Typography>
                            </div>
                        </Grid> 
                             <Grid container direction = "row">  
                                <Grid item sx = {{marginBottom: 1.8}}>
                                    <Rating sx ={{color: "#FF8682"}}
                                        name="simple-controlled"
                                        value = {hotelTypes}
                                        readOnly 
                                         />
                                </Grid>    
                                <Grid item sx = {{flexDirection : 'row',marginTop: 0.3}}>
                                    <Typography variant = "price"> <b>{items.hotelType} </b>Star Hotel</Typography>         
                                </Grid>
                                <Grid item sx = {{textAlign :  'left',marginLeft: 10,fontSize: 14}}>
                                    <CoffeeIcon size = "small"/>
                                    <Grid sx = {{marginLeft: 4,marginTop: -3.5}}>
                                          <Typography variant = "amenities">
                                            <Typography variant = "ament">{items.amenities.length}</Typography>+Aminities
                                          </Typography>
                                    </Grid> 
                                </Grid>  
                            </Grid>  
                            <Button variant="outlined" sx = {{marginTop: -1,height:'40px',color: "#112211"}}>{hotelStarRating}</Button>
                            <Grid item sx={{ marginTop: -1, pl: 1 }}>
                                <Typography variant="review">
                                    {items.overallReview} {items.numReviews}{""} 
                                    <span style={{ marginRight: '5px' }}>
                                        <Typography variant = "address"> reviews</Typography>
                                    </span> 
                                </Typography>
                            </Grid>
       
                                
                <Divider variant="middle" /> 
                </Grid>
            </CardContent>
        </Box>
    );
}
export default Content;