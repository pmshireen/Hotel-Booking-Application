import React, { useState, useEffect} from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from "@mui/material/Button";
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import PopupForm from '../BookingDetails/PopupForm';
import check from '../../assets/icons/Booking-icons/checking.png';
import tick from '../../assets/icons/Booking-icons/tick.png';
import axios from 'axios';
import Confetti from 'react-confetti';
import { useNavigate } from 'react-router-dom';
import Paper from '@mui/material/Paper'

const BookingDetail = () => {
const navigate = useNavigate();
  const [location, setLocation] = useState('');
  const[hotelData,setHotelData]=useState('');
  const [hotelName, setHotelName] = useState('');
  const [hotelImage,setHotelImage]= useState('');
  const [room , setRoom] = useState('');
  const [ratePerNight, setRatePerNight] = useState('');
  const [checkInDate, setCheckInDate]=useState('');
  const [checkOutDate, setCheckOutDate]=useState('');
  const[hotelId,setHotelId]=useState('');
  //  const[roomId,setRoomId]=useState('');
   const [roomRates, setRoomRates] = useState([]);
  const cinDate = new Date(checkInDate);
const coutDate = new Date(checkOutDate);

const timeDiff = coutDate.getTime() - cinDate.getTime();
const numberOfDays = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

const formatDate = (dateString)=>{
  const options = {weekday:'short',month:'short',day:'numeric'};
  return new Date(dateString).toLocaleDateString('en-US',options);
}
useEffect(() => {
  const fetchData = async () => {
    try {
      const params = new URLSearchParams(window.location.search);
      const hotelId = params.get('hid');
      const roomId = params.get('rid');
      const index=params.get('rii');
      // const checkInDate=params.get('checkIn');
      // const checkOutDate=params.get('checkOut');

      // Fetch hotel details
      const hotelUrl = `http://localhost:3200/hotels/${hotelId}`;
      const hotelResponse = await axios.get(hotelUrl);
      const hotelData = hotelResponse.data;
      
      setHotelId(hotelData._id);
      setLocation(hotelData.location.address);
      setHotelName(hotelData.hotelName);
      setHotelImage(hotelData.images[0]);
      setRoom(hotelData.rooms[index].roomType)
      setRatePerNight(hotelData.rooms[index].roomRate);
      // setCheckInDate(checkInDate);
      // setCheckOutDate(checkOutDate);
      console.log('Hotel Response:', hotelResponse.data,"  ","RoomId",index, "CheckinDate",checkInDate,"CheckoutDate",checkOutDate);

      // Fetch room details
      //   const roomUrl = `http://localhost:3200/rooms/${roomId}`;
      //  const roomResponse = await axios.get(roomUrl);
      //  const roomData = roomResponse.data;
      
      // setRoom(roomData.roomType);
      // setCheckin(roomData.checkInDate);
      // setCheckout(roomData.checkOutDate);
      // setRatePerNight(roomData.ratePerNight);
    
//console.log('Room Response:', roomResponse.data);
    } catch (error) {
      console.error('Error in fetching:', error);
    }
  };

  fetchData();
}, []);

const totalAmount = numberOfDays * ratePerNight;

  const items = [
    { name: "Base Fare", price: ratePerNight * numberOfDays },
    { name: "Discount", price: 0 },
    { name: "Taxes", price: 20 },
    { name: "Service Fee", price: 5 }
  ];
 
  const totalPrice = items.reduce((total, item) => total + parseFloat( item.price), 0);
  const [showRadioButton, setShowRadioButton] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const handleContinueClick = () => {
    setShowRadioButton(true);
  };
  const handleRadioChange = (event) => {
    setSelectedOption(event.target.value);
    setIsRadioButtonClicked(true);
  };
  const [showPopup, setShowPopup] = useState(false);
  const handleOpenPopup = () => {
    setShowPopup(true);
  };
  const handleClosePopup = () => {
    setShowPopup(false);
  };
  const [selectedCards, setSelectedCards] = useState([]);  
  const getLast8Digits = (cardNumber) => {
    return " **** " + cardNumber.slice(-4);
  };
  // Callback function to receive the selected credit card details from the popup
  const [saveCardInfo, setSaveCardInfo] = useState(
    JSON.parse(localStorage.getItem('saveCardInfo')) || false
  );
 const handleCardSelection = (cardNumber, expDate) => {
    const formattedCardNumber = getLast8Digits(cardNumber);
    const newCard = { cardNumber: formattedCardNumber, expDate };
    setSelectedCards((prevCards) => [...prevCards, newCard]); // Add the new card to the array
    localStorage.setItem("storedCards", JSON.stringify([...selectedCards, newCard]));
    handleClosePopup();
  };
  useEffect(() => {
    if (saveCardInfo) {
      const storedCards = JSON.parse(localStorage.getItem("storedCards")) || [];
      setSelectedCards(storedCards);
    }
  }, [saveCardInfo]);  
  const [isRadioButtonClicked, setIsRadioButtonClicked] = useState(false);
  const [showNewButton, setShowNewButton] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
const handleButtonClick = async () => {
    setShowNewButton(false);
      setShowPaymentPopup(true);
        setShowConfetti(true);
        setTimeout(() => {
          setShowPaymentPopup(false);
          setShowConfetti(false);
          setTimeout(() => {
             // Hide the "Pay Now" button
            setShowNewButton(true);  // Show the "View Booking" button
          }, 500);
        }, 4000);
        try {
          const response = await fetch(`http://localhost:3200/payment/${hotelId}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({
              hotelId:hotelId

            })
          });          
          const data = await response.json();
           // Parse the response JSON          
          console.log(data);          
        } catch (error) {
          // Handle errors if the request fails
          console.error("Error in payment:", error);
        }
  };
  const [showPaymentPopup, setShowPaymentPopup] = useState(false);


  const handleView=(roomId,index)=>{
    const query=`?hid=${encodeURIComponent(hotelId)}`;
    navigate(`/payment-page${query}`);
    }
  return (
    <div>
      <Box sx={{ height: "100vh" }}>
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="flex-start"
        >
          <Box sx={{ margin: '40px', paddingTop: '15vh', paddingLeft: '4vh', height: 'wrap', width: '110vh', alignItems: 'center', display: 'flex' }}>
            <div style={{ overflow: "hidden", textOverflow: "ellipsis", width: '30rem' }}>
              <Typography variant="a"> <strong>{room}</strong></Typography>
            </div>
            <Typography variant="b" sx={{ color: '#FF8682' }}>₹{ratePerNight}/night</Typography>
          </Box>
          <Paper elevation={9} sx={{
            marginLeft: '50px', padding: '4vh', height: '184px', width: '742px', alignItems: 'center',
            borderRadius: '10px'
          }} >
            <Typography variant="c">
              {hotelName}</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', marginLeft: '135px' }}>
              <LocationOnIcon fontSize='small' />
              <Typography variant="d">
               {location}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', marginLeft: '10px', justifyContent: 'space-between' }}>
              <Typography variant='e'><strong>
               {formatDate (checkInDate)}</strong>
              </Typography>
              <Box
                sx={{
                  width: '180px',
                  height: '50px',
                  overflow: 'hidden',
                  flexShrink: 0,
                  marginTop: 2, // Prevent the image container from shrinking
                  marginRight: 2.5, // Ensure image stays within the box
                }}
              >
                <img
                  src={check} // Replace with the actual URL of your image
                  alt="checking img"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', justifyContent: 'space-between' }} // Make the image cover the entire box
                />
              </Box>
              <Typography variant='f'><strong>
                {formatDate (checkOutDate)}</strong>
              </Typography>
            </Box>
          </Paper>
          <Box sx={{ marginTop: '20px', marginLeft: '30px', padding: '2vh', height: 'wrap', width: '105.2vh', alignItems: 'left' }}>
            {!showRadioButton ? (
              <React.Fragment>
                <Button variant="contained" style={{ zIndex: 1 }} fullWidth onClick={handleContinueClick}>
                  Proceed With Payment
                </Button>
              </React.Fragment>
            ) : (
              <React.Fragment>
<RadioGroup value={selectedOption} onChange={handleRadioChange}>
  {selectedCards.map((card, index) => (
    <Box
      key={index}
      sx={{
        borderRadius: '10px',
        bgcolor: '#8dd3bb',
        marginTop: '5px',
        padding: '2vh',
        width: '101.1vh',
        alignItems: 'left',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
<Typography style={{ marginLeft: '1px' }}>{card.cardNumber} {card.expDate}</Typography>
      <FormControl>
                      <FormControlLabel
                        key={index}
                        value={`${card.cardNumber} ${card.expDate}`}
                        control={<Radio color='secondary' />}                 
                        labelPlacement="start"
                        sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginRight: '15px', marginLeft: '1px' }}
                      />
                  </FormControl>
                  </Box>
                  ))}
                </RadioGroup>
                <Box
                  border="2px dashed #000"
                  borderRadius="10px"
                  borderColor="#8dd3bb"
                  marginTop={'20px'}
                  marginLeft={'4px'}
                  padding={2}
                  width={'100.3vh'}
                  height={160}
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                  alignItems="center"
                  onClick={handleOpenPopup}
                  style={{ cursor: 'pointer' }}
                >
                  <Box display="flex" justifyContent="center" alignItems="center" flex={1}>
                    <AddCircleOutlineIcon style={{ fontSize: 40, color: '#8dd3bb' }} />
                  </Box>
                  <Box textAlign="center">
                    <Typography variant="h6" color="grey" >
                      Add New Card
                    </Typography>
                  </Box>
                </Box>
                <PopupForm open={showPopup} handleClosePopup={handleClosePopup} handleCardSelection={handleCardSelection} />
              </React.Fragment>
            )}
          </Box>
        </Grid>
        <Grid
          item
          direction="column"
          justifyContent="flex-start"
          alignItems="flex-end"
          position={'absolute'}
          style={{ position: 'absolute', bottom: '18.5vh', right: '20px' }}
        >
          <Paper elevation={9} sx={{
            margin: '50px', marginLeft: '30px', padding: '2vh', height: 'wrap', width: '575px', alignItems: 'center',
            borderRadius: '10px', marginBottom: '-55px' // Add margin to increase the gap
          }} >
            <Box display="flex" alignItems="center">
              <Box
                sx={{
                  width: 120,
                  height: 121,
                  border: '1px solid #ccc',
                  borderRadius: 4,
                  overflow: 'hidden',
                  flexShrink: 0, // Prevent the image container from shrinking
                  marginRight: 5 // Ensure image stays within the box
                }}
              >
                <img
                  src={hotelImage}
                  alt="Hotel Image"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }} // Make the image cover the entire box
                />
              </Box>
              <Box flexGrow={1}>
                <div style={{ overflow: "hidden", textOverflow: "ellipsis", width: '100%' }}>
                  <Typography variant='z'><strong>{room}</strong></Typography>
                </div>
              </Box>
            </Box>
            <div
              style={{
                width: '100%',
                height: '1px',
                background: 'grey',
                marginTop: '18px',
              }}
            />
            <Typography variant='y'>Your booking is protected by<strong> Golobe</strong></Typography>
            <div
              style={{
                width: '100%',
                height: '1px',
                background: 'grey',
                marginTop: '3px',
                marginBottom: '10px'
              }}
            />
            <Typography variant="x"><strong>Price Details</strong></Typography>
            {items.map((item, index) => (
              <Grid container key={index}>
                <Grid item xs={6}>
                  <Typography variant='w'>{item.name}</Typography>
                </Grid>
                <Grid item xs={6} textAlign="right">
                  <Typography variant="v">
                    <strong>{`₹${item.price}`}</strong>
                  </Typography>
                </Grid>
              </Grid>
            ))}
            <div
              style={{
                width: '100%',
                height: '1px',
                background: 'grey',
                marginRight: '10px',
                marginBottom: '9px',
                marginTop: '10px',
              }}
            />
            {/* Total Price */}
            <Grid container>
              <Grid item xs={6}>
                <Typography variant="w">Total</Typography>
              </Grid>
              <Grid item xs={6} textAlign="right">
                <Typography variant="v">
                  <strong>{`₹${totalPrice.toFixed(2)}`}</strong>
                </Typography>
              </Grid>
            </Grid>
          </Paper>
          {isRadioButtonClicked && !showConfetti && !showNewButton&& (
  <Button
    variant="contained"
    style={{ zIndex: 1, width: '578px', marginLeft: '28px', marginBottom:'-180px'}}
    onClick={handleButtonClick}
  >
    Pay Now
  </Button>
)}
{!showConfetti && showNewButton && (
  
  
      <Button variant="contained" fullWidth style={{marginBottom:'-178px', marginTop: '15px', marginLeft: '27px', width: '580px'}}onClick={()=>handleView()}>
        View Booking
      </Button>
    
)}
      {showPaymentPopup && (
  <Box
    sx={{
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      padding: '100px',
      backgroundColor: 'rgba(141, 211, 187, 0.5)', // Use rgba for semi-transparent background color
      borderRadius: '10px',
      color: 'black',
      textAlign: 'center',
      zIndex: 1000,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}
  >
    {showConfetti && (
      <Confetti
        width={Box.width}
        height={Box.innerHeight}
        recycle={false}
        numberOfPieces={1000}
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
        }}
        onComplete={() => setShowConfetti(false)}
      />
    )}
    <Box
      sx={{
        width: '40px',
        height: '40px',
        overflow: 'hidden',
        flexShrink: 0,
        marginRight: 5,
        marginLeft: 4,
        marginBottom: 2,
      }}
    >
      <img
        src={tick}
        alt="tick img"
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      />
    </Box>
    <Typography variant="h4" sx={{ opacity: 1 }}>
      <strong>Payment Successful !!!</strong>
    </Typography>
  </Box>
)}

        </Grid>
      </Box>
    </div>
  );
};
export default BookingDetail;