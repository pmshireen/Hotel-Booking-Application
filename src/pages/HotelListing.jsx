import React, { useState, useEffect } from 'react';
import Searchafter from '../components/Search/Searchafter';
import Filter from '../components/HotelList/Filter';
import Hotels from '../components/HotelList/Hotels';
import { Box } from '@mui/material';
import DataNotFound from '../components/HotelList/Container/NoResult';

const HotelListing = () => {
  const queryParameters = new URLSearchParams(window.location.search);
  const destination = queryParameters.get('q');
  const checkInDate = queryParameters.get('checkIn');
  const checkOutDate = queryParameters.get('checkOut');
  
  const numberOfRooms=parseInt(queryParameters.get("rooms"));
  const [dest,setDest]=useState(destination);
  const[In,setIn]=useState(checkInDate);
  const [out,setOut]=useState(checkOutDate);
  const[room,setRoom]=useState(numberOfRooms);
  const [searchresults, setSearchResults] = useState([]);
  const [selectedPrice, setSelectedPrice] = useState([899, 10000]);
  const [selectedRating, setSelectedRating] = useState(null);

  const [amenties, setAmenties] = useState([
    { id: 1, label: 'Airport shuttle', checked: false },
    { id: 2, label: 'Restaurant', checked: false },
    { id: 3, label: 'Family rooms', checked: false },
    { id: 4, label: 'Good breakfast', checked: false }
  ]);
  const [extraAment, setExtraAment] = useState([
    { id: 5, label: 'Free Wi-Fi', checked: false },
    { id: 6, label: 'Room service', checked: false },
    { id: 7, label:' Free-parking ', checked: false },
    { id: 8, label: 'Spa and wellness centre', checked: false },
    { id: 9, label: 'Non-smoking rooms ', checked: false },
    { id: 10, label: 'Facilities for disabled guests', checked: false }
    
  ]);
  
  const handleChangePrice = (e, newValue) => {
    setSelectedPrice(newValue);
    console.log("price",selectedPrice);

  }
  
  const handleSelectRating = (value) => {
    setSelectedRating(value);
  };
  
  const handleCheckboxChange = (id) => (event) => {
    const updatedAmenties = amenties.map((amenty) =>
      amenty.id === id ? { ...amenty, checked: event.target.checked } : amenty
    );
    setAmenties(updatedAmenties);
  };
  const handleCheckboxChanges = (id) => (event) => {
    const updatedAment = extraAment.map((amenty) =>
      amenty.id === id ? { ...amenty, checked: event.target.checked } : amenty
    );
    setExtraAment(updatedAment);

  };
  

  // ... other functions and state
  const handleSearch = async () => {
    console.log("Entered handleSearch")
    try {
      const selectedAmenitiesIds = [...amenties, ...extraAment]
        .filter((amenity) => amenity.checked)
        .map((amenity) => amenity.label);

      const url = `http://localhost:3200/hotels/search?q=${encodeURIComponent(
        dest
      )}&checkIn=${encodeURIComponent(
        In
      )}&checkOut=${encodeURIComponent(
        out
      )}&rooms=${encodeURIComponent(
        room
      )}&amenities=${encodeURIComponent(
        selectedAmenitiesIds.join(',')
      )}&priceRanges=${encodeURIComponent(
        JSON.stringify(selectedPrice)
      )}&rating=${encodeURIComponent(selectedRating)}`;

      console.log(url);
   
        const response = await  fetch(url);
        const data =  await  response.json();
        console.log(data);
        setSearchResults(data);
     
        }
        catch (error) {
              console.error("Error occurred during fetch:", error);
            }
          }


  useEffect(() => {
    window.location.hash = 'upperPart';
    window.scrollTo(0, 0);
    handleSearch();
  }, [
    selectedPrice,
    selectedRating,
    amenties,
    extraAment,
  ]);

  return (
    <div>
      <Searchafter
        dest={dest}
        checkin={In}
        checkout={out} 
        rooms={room}
        setIn={setIn}
        setOut={setOut}
        setDest={setDest}
        setRoom={setRoom}
        handleSearch={handleSearch}

      />
      <Filter
        handleChangePrice={handleChangePrice}
        handleSelectRating={handleSelectRating}
        handleCheckboxChange={handleCheckboxChange}
        selectedPrice={selectedPrice}
        selectedRating={selectedRating}
        amenties={amenties}
        extraAment={extraAment}
        handleCheckboxChanges={handleCheckboxChanges}
      />
      {searchresults.length < 0 ? (
        <DataNotFound />
      ) : (
      <Hotels data={searchresults} In={In} out={out}/>)}
      <Box sx={{ width: '20vh', height: '40vh' }}></Box>
    </div>
  );
};

export default HotelListing;
