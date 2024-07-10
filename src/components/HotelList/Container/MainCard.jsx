import {Card,Grid, Box,Container} from "@mui/material";
import React from "react";
import Media from "./Media";
import Content from "./Content";
import FavAndView from "./FavAndView";
import Divider from '@mui/material/Divider';
import DataNotFound from './NoResult';


function MainCard({hotelData, showAllHotels,In,out,selectedOption}){
    // const [sortBy, setSortBy] = useState('Recommended');

    console.log(selectedOption)
    // Sorting function for Price
    const sortByPrice = (a, b) => {
        return b.price - a.price;
    };
    // Sorting function for Rating
    const sortByRating = (a, b) => {
        return b.rating - a.rating;
    };
    if (!Array.isArray(hotelData)) {
        return <DataNotFound />;
      }
      let sortedHotelData = [...hotelData];

      if (selectedOption !== 'Recommended') {
        sortedHotelData = [...hotelData].sort(
            selectedOption === 'Price' ? sortByPrice : selectedOption === 'Rating' ? sortByRating : undefined
        );
    }
    return(
 
<>
{showAllHotels && sortedHotelData  ? 
    <Container  sx={{overflowY: "auto", overflowX :'hidden', height :1400 }}> 
    {sortedHotelData
    .map((hotel)=>(
    <Card  key ={hotel._id} sx={{display: 'flex', margin: 1, height: 299,elevation : 4, width: 890,marginBottom: '50px', borderRadius:'12px',marginTop: '55px', marginLeft:'-20px'}} >
        <Media imageUrl = {hotel.images[0]} />
        <Grid container rowSpacing={2}>
            <Grid item xs ={12}>
            <Content items = {hotel}/> </Grid>
            <Divider variant = "middle"/>
            <FavAndView  hotelId = {hotel._id} In={In} out={out}/>
        </Grid>
    </Card>  
    ))}

 </Container> :
<>
  <Container sx ={{height: 1400}}> 
    {sortedHotelData
    //  .sort(sortBy === 'Price' ? sortByPrice : sortBy === 'Rating' ? sortByRating : undefined)
    .map((hotel)=>(

        <Card  key = {hotel._id} sx={{display: 'flex', margin: 1, height: 299,elevation : 4, width: 890,marginBottom: '50px', borderRadius:'12px',marginTop: '55px', marginLeft:'-20px'}} >
            <Media imageUrl = {hotel.images[0]} />
            <Grid container rowSpacing={2}>
                <Grid item xs ={12}>
                <Content items = {hotel}/> </Grid>
                <Divider variant = "middle"/>
                <FavAndView hotelId ={hotel._id} In={In} out={out} />
            </Grid>
        </Card>  
  

    ))}
    </Container>
    </>
    }
    </>
       

    );
}
export default MainCard;