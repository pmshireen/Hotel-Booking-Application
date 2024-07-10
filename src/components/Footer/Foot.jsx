import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Grid, Link, Card, Box } from '@mui/material';
import instagram from '../../assets/icons/footer-icons/instagram.svg';
import facebook from '../../assets/icons/footer-icons/facebook.svg';
import twitter from '../../assets/icons/footer-icons/twitter.svg';
import logo from '../../assets/icons/footer-icons/logo.svg';
import img from '../../assets/icons/footer-icons/image.svg';
const Foot = () => {

  const [email, setEmail] = useState('');
  const [validEmail, setvalidEmail] = useState(true);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);

  };

  const handleSubscribe = () => {

    const emailPattern = /^[a-z][a-z0-9]*@[a-z]+\.[a-z]{2,3}$/;
    if (!emailPattern.test(email)) {
      setvalidEmail(false);
      return;
    }
    alert("Thankyou for your Subscription");
    setEmail('');
    setvalidEmail(true);
  };

 
const currentDate = new Date();


const checkInDate = new Date(currentDate);
checkInDate.setDate(currentDate.getDate() + 1);

const checkOutDate = new Date(checkInDate);
checkOutDate.setDate(checkInDate.getDate() + 2);


const formattedCheckIn = formatDate(checkInDate);
const formattedCheckOut = formatDate(checkOutDate);


const tirunelveli = `http://localhost:5173/hotel-listing?q=Tirunelveli&checkIn=${formattedCheckIn}&checkOut=${formattedCheckOut}&rooms=1`;
const chennai = `http://localhost:5173/hotel-listing?q=Chennai&checkIn=${formattedCheckIn}&checkOut=${formattedCheckOut}&rooms=1`;
const cochin = `http://localhost:5173/hotel-listing?q=Cochin&checkIn=${formattedCheckIn}&checkOut=${formattedCheckOut}&rooms=1`;
const bangalore = `http://localhost:5173/hotel-listing?q=Bangalore&checkIn=${formattedCheckIn}&checkOut=${formattedCheckOut}&rooms=1`;



// Function to format date as YYYY-MM-DD
function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}


  return (

    <footer style={{ backgroundColor: '#8DD3BB', color: 'white', padding: '20px 0px', bottom: 0, left: 0, right: 0, height: '370px', maxWidth: '1440' }}>

      < Container maxWidth="md" style={{ marginTop: '-180px', position: 'relative', top: '50%', left: '40%', transform: 'translate(-40%, -35%)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1, maxWidth: '1500px', maxHeight: '500px' }}>
        <Card style={{ maxWidth: '1500px', maxHeight: '200px', padding: '12px', display: 'flex', justifyContent: 'center', alignItems: 'flex-start', flexDirection: 'row', marginBottom: '80px', width: '100%', borderRadius: '16px', backgroundColor: "#CDEAE1" }}>
          <Box display='flex'  style={{width: '120rem'}}>
          <Grid container xs={6} sm={6} direction="row" alignItems="center" justifyContent="center" spacing="{2}" >
            <Grid item xs={6} sm={6} style={{}} >
              <Typography variant='foot'>
                Subscribe Newsletter
              </Typography>

              <TextField
                label="Email"
                variant="filled"
                size="small"
                value={email}
                onChange={handleEmailChange}
                fullWidth
                style={{
                  display: 'flex',
                  flex: '1 0 0',
                  backgroundColor: 'white',
                  marginTop: '10px ',
                  width: '30rem',
                  alignItems: 'flex-start',
                  
                 

                }}
                error={!validEmail}
                helperText={!validEmail ? 'Invalid email format ' : ''}
              />
              
            </Grid>
            </Grid>
            <Grid container></Grid>
            <Grid item  style={{marginTop:'6.5rem',marginRight: '2.8rem',  }}>
              <Button variant="contained" size="large" style={{ backgroundColor: '#112211', color:'#FFFFFF'}} onClick={handleSubscribe} fullWidth>
                Subscribe
              </Button>
            </Grid>
            
          
          </Box>
          <Grid container  display='flex'alignItems='flex-end' justifyContent= 'flex-end' style={{marginBottom: '2rem', height: '20rem'}}>
          <Box  display= 'flex' direction='row' style={{width:'16rem', height: '12rem', marginBottom: '20rem'}}>
           <img src ={img} alt='image'/>
          </Box>
          </Grid>
          
        </Card>
      </Container>


      <Container maxwidth="md" maxHeight="md" style={{ marginTop: '50px' }}>
        <Grid container justifyContent="center">
          <Grid item xs={6} sm={2} direction={'column'} spacing={10}>
            <Typography variant='body1' style={{ marginBottom: '20px', color: 'black' }}><b>Residence</b></Typography>

            <Typography variant='body2'>
              <Link href={tirunelveli} underline="hover" style={{ display: 'block', marginBottom: '17px', color: 'black' }}>Tirunelveli </Link>
            </Typography>
            <Typography variant='body2'>
              <Link href={chennai} underline="hover" style={{ display: 'block', marginBottom: '17px', color: 'black' }}>Chennai </Link>
            </Typography>
            <Typography variant='body2'>
              <Link href={cochin} underline="hover" style={{ display: 'block', marginBottom: '17px', color: 'black' }}>Cochin</Link>
            </Typography>
            <Typography variant='body2' >
              <Link href={bangalore} underline="hover" style={{ display: 'block', marginBottom: '17px', color: 'black' }}>Bangalore</Link>
            </Typography>
          </Grid>
          <Grid item xs={6} sm={2} direction={'column'} spacing={10}>
            <Typography variant='body1' style={{ marginBottom: '20px', color: 'black' }}><b>Activities</b></Typography>
            <Typography variant='body2'>
              <Link href="#" underline="hover" style={{ display: 'block', marginBottom: '17px', color: 'black' }}>Northern Lights</Link>
            </Typography>
            <Typography variant='body2'>
              <Link href="#" underline="hover" style={{ display: 'block', marginBottom: '17px', color: 'black' }}>Sailing</Link>
            </Typography>
            <Typography variant='body2'>
              <Link href="#" underline="hover" style={{ display: 'block', marginBottom: '17px', color: 'black' }}>Multi-activities</Link>
            </Typography>
          </Grid>
          <Grid item xs={6} sm={2} direction={'column'} spacing={10}>
            <Typography variant='body1' style={{ marginBottom: '20px', color: 'black' }}><b>Blogs</b></Typography>
            <Typography variant='body2'>
              <Link href="#" underline="hover" style={{ display: 'block', marginBottom: '17px', color: 'black' }}>Bali Travel Guide</Link>
            </Typography>
            <Typography variant='body2'>
              <Link href="#" underline="hover" style={{ display: 'block', marginBottom: '17px', color: 'black' }}>Srilanka Travel Guide</Link>
            </Typography>
            <Typography variant='body2'>
              <Link href="#" underline="hover" style={{ display: 'block', marginBottom: '17px', color: 'black' }}>Peru Travel Guide</Link>
            </Typography>
          </Grid>

          <Grid item xs={6} sm={4} >
            <Typography variant="body1" gutterBottom style={{ color: 'black' }}>
             <b> Follow Us</b>
            </Typography>
            <Link href="https://www.facebook.com/" color="#000000">
              <img src={facebook} />
            </Link>
            <Link
              href="https://www.instagram.com/"
              color="#000000"
              sx={{ pl: 1, pr: 1 }}
            >
              <img src={instagram} />
            </Link>
            <Link href="https://www.twitter.com/" color="#000000">
              <img src={twitter} />
            </Link>
            <Grid xs={4} sm={4} style={{ marginLeft: '280px' }}>
              <img src={logo} />
            </Grid>
          </Grid>






        </Grid>
      </Container>


    </footer>
  );
};

export default Foot;