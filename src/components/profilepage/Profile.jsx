import React, { useState, useRef, useEffect } from 'react';
import { Typography, Paper, Grid, Box,TextField} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Edit from '../../assets/icons/profilepage-icons/Edit.svg';
import pen from '../../assets/icons/profilepage-icons/Pen.svg';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import axios from 'axios';

const Profilepage = () => {
  const [userName, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [profileImage, setProfileImage] = useState('https://s3-alpha-sig.figma.com/img/de42/3158/13dc5b2e20dc60002c5ebc10bec549e3?Expires=1691971200&Signature=ZHzAq5Bk5EtbGxurRfqS~zdOjE-gM~MqPhIhiy4~0oZeKBZuXxWQ5wO7oSi~GlRdCULMNOa3~PbJVxvkGF4uWBht40SUWPLZBpZGSdDV-BPFdE-Dm-isnLYdlFQDoRT~3w-ZAlKnAwkI6P93dDJiQhap2ud5nDX5utE5xFfx9Rn03Pub8acxrz7Tvc0kUjTdMzQujBNeSQ6xIMQzfd~bNipy04UMDozckMvKQg4GWJUWWXOYL6WSPubSADq0jvNXSEh5uYDCeXacb0cYslL1LtgbLPScjtJ2Cjyql~0hHZS2YBG4d6fly77Fit~d7k~zouNqX-G4CvfhN4PFkA8h-Q__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4');
  const [coverImage, setCoverImage] = useState('https://s3-alpha-sig.figma.com/img/b911/29fb/09d33d4d260d902f404ce31c509b1086?Expires=1691971200&Signature=oflC3FQiqTFJY~uuNnn-jyV8MqjNmaswYJjPWa1cJP8Dt1ScDafiZEESO~euFE39lu0gFZzqiaiUCta3iUsdpiw7-Bq7BZMASndbmb-OnYeNwqS1dlFywOHIY35h1ss3NQwxTZSppEkfo5qjgl4ZesHad-2m1kL8z-sibaAqnB-XcswnV3jwYLTOEjBsILE6h3m7iw-pT3zcuW7bCzbLsvy8qhB9-vLx4l-JWfd7gCBSj3wcfacVqmWyF0hSCe7sKZc0R8meZDr8vi5sttiDR8o1xuKKo4EfRJb5ybX1j9VrtB5yZgNH7sx4P~kzZlXbeFeLedwTvvm77g0aK2aahQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4'); // To keep track of which image is being updated

  const [isNameEditing, setIsNameEditing] = useState(false);
  const [isEmailEditing, setIsEmailEditing] = useState(false);
  const [isPasswordEditing, setIsPasswordEditing] = useState(false);
  const [isPhoneNumberEditing, setIsPhoneNumberEditing] = useState(false);
  const [isAddressEditing, setIsAddressEditing] = useState(false);
  const [isDateOfBirthEditing, setIsDateOfBirthEditing] = useState(false);

  const [originalName,setOriginalName] = useState(userName); //for cancel function
  const [originalEmail,setOriginalEmail] = useState(email);
  const [originalPassword,setOriginalPassword] = useState(password);
  const [originalPhoneNumber,setOriginalPhoneNumber] = useState(phoneNumber);
  const [originalAddress, setOriginalAddress] = useState(address);
  const [originalDateOfBirth, setOriginalDateOfBirth] = useState(dateOfBirth);
  const [selectedImageType, setSelectedImageType] = useState(null); // To keep track of which image is being updated

  useEffect(() => {
    axios
      .get('http://localhost:3200/auth/users/user/profile', { withCredentials: true, })

      .then((response) => {
        const userData = response.data;

        // Update state with the retrieved user data
        setName(userData.userName);
        setEmail(userData.email);
        setPhoneNumber(userData.phoneNumber);
        setPassword(userData.password);
        setAddress(userData.address);
        setDateOfBirth(userData.dateOfBirth);
        setOriginalName(userData.userName);
        setOriginalEmail(userData.email);
        setOriginalPhoneNumber(userData.phoneNumber);
        setOriginalPassword(userData.password);
        setOriginalAddress(userData.address);
        setOriginalDateOfBirth(userData.dateOfBirth);
      })
      .catch((error) => {
        console.error('API error:', error);
      });
  }, []);

  const handleCancel = () => {
    setName(originalName);
    setEmail(originalEmail);
    setPassword(originalPassword);
    setPhoneNumber(originalPhoneNumber);
    setAddress(originalAddress);
    setDateOfBirth(originalDateOfBirth);
    setIsNameEditing(false);
    setIsEmailEditing(false);
    setIsPasswordEditing(false);
    setIsPhoneNumberEditing(false);
    setIsAddressEditing(false);
    setIsDateOfBirthEditing(false);
  };
  const handleSave = async (event) => {
    event.preventDefault();
    const userNameFormData = new FormData();
    userNameFormData.append('userName', userName);
    console.log(userName);

    const emailFormData = new FormData();
    emailFormData.append('email', email);
    console.log(email);

    const passwordFormData = new FormData();
    passwordFormData.append('password', password);
    console.log(password);

    const phoneNumberFormData = new FormData();
    phoneNumberFormData.append('phoneNumber', phoneNumber);
    console.log(phoneNumber);

    const addressFormData = new FormData();
    addressFormData.append('address', address);
    console.log(address);

    const dateOfBirthFormData = new FormData();
    dateOfBirthFormData.append('dateOfBirth', dateOfBirth);
    if (isNameEditing && userName.length >= 1) {
      setName(userName);
      setIsNameEditing(false);
    }
    if (isPasswordEditing && /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(password)) {
      setPassword(password);
      setIsPasswordEditing(false);
    }
    if (isEmailEditing && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmail(email);
      setIsEmailEditing(false);
    }
    if (isPhoneNumberEditing && phoneNumber != null) {
      setPhoneNumber(phoneNumber);
      setIsPhoneNumberEditing(false);
    }
    if (isAddressEditing && address != null) {
      setAddress(address);
      setIsAddressEditing(false);
    }
    if (isDateOfBirthEditing && isValidDate(dateOfBirth)) {
      setDateOfBirth(dateOfBirth);
      setIsDateOfBirthEditing(false);
    }
    
    const apiUrl = 'http://localhost:3200/auth/users/user/profile/update';

    const requestData = {
      userName: userName,
      email: email,
      password: password,
      phoneNumber: phoneNumber,
      address: address,
      dateOfBirth: dateOfBirth,
    };
    console.log(requestData);

    await axios.post(apiUrl, requestData, {withCredentials: true})
    .then((response)=>{
      console.log('Api response: ', response.data);
    }).catch((error) => {
      console.error('API error for email:', error);
    });

    // axios.post(apiUrl, userNameFormData, { withCredentials: true })
    //   .then((response) => {
    //     console.log('API response for userName:', response.data);
    //   })
    //   .catch((error) => {
    //     console.error('API error for userName:', error);
    //   });

    // axios.post('apiUrl', emailFormData, { withCredentials: true })
    //   .then((response) => {
    //     console.log('API response for email:', response.data);
    //   })
    //   .catch((error) => {
    //     console.error('API error for email:', error);
    //   });
    // axios.post('apiUrl', passwordFormData, { withCredentials: true })
    //   .then((response) => {
    //     console.log('API response for password:', response.data);
    //   })
    //   .catch((error) => {
    //     console.error('API error for password:', error);
    //   });

    // axios.post('apiUrl', phoneNumberFormData, { withCredentials: true })
    //   .then((response) => {
    //     console.log('API response for phoneNumber:', response.data);
    //   })
    //   .catch((error) => {
    //     console.error('API error for phoneNumber:', error);
    //   });
    // axios.post('apiUrl', addressFormData, { withCredentials: true })
    //   .then((response) => {
    //     console.log('API response for address:', response.data);
    //   })
    //   .catch((error) => {
    //     console.error('API error for address:', error);
    //   });

    // axios.post('apiUrl', dateOfBirthFormData, { withCredentials: true })
    //   .then((response) => {
    //     console.log('API response for dateOfBirth:', response.data);
    //   })
    //   .catch((error) => {
    //     console.error('API error for dateOfBirth:', error);
    //   });
  };
  const isValidDate = (dateString) => {
    const currentDate = new Date();
    const enteredDate = new Date(dateString);
    return enteredDate <= currentDate;
  };
  const fileInputRef = useRef(null);
  const coverImageInputRef = useRef(null);
  const isJpgFile = (file) => {
    return file.type === 'image/jpeg';
  };

  const handleImageChange = (e, imageType) => {
    setSelectedImageType(imageType); // Set the selectedImageType based on the argument
    const file = e.target.files[0];
    if (file && isJpgFile(file)) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (imageType === 'profile') {
          setProfileImage(reader.result); // Update the profileImage state with the new image data
        } else if (imageType === 'cover') {
          setCoverImage(reader.result); // Update the coverImage state with the new image data
        }
      };
      reader.readAsDataURL(file);
    } else {
      // Handle invalid file type (not a JPG)
      alert('Please select a JPG image file.');
    }
  };
  const handleImageReset = () => {
    fileInputRef.current.value = null;
    fileInputRef.current.click();
  };
  const handleCoverImageReset = () => {
    coverImageInputRef.current.value = null;
    coverImageInputRef.current.click();
  };

  return (
    <div>
      <form onSubmit={handleSave}>
        <Box padding="70px" >
          <Box paddingTop="70px" sx={{
            width: '1300px',
            height: '350px',
            position: 'relative'
          }} >
            <div style={{
              cursor: 'pointer',
              position: 'relative',
              height: '40vh',
              marginLeft: '5%'
            }} >
              <img
                src={coverImage}
                alt="cover"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }} />
              <input ref={coverImageInputRef} id="cover-image-input" type="file" style={{ display: 'none' }} onChange={(e) => handleImageChange(e, 'cover')} />

              <div style={{
                position: 'absolute',
                bottom: '-97px', //inside the cover image
                left: '50%',
                transform: 'translateX(-50%)', //profile align center
                width: '180px',
                height: '180px',
              }}>
                {/* //person image */}
                <img
                  src={profileImage}
                  alt="profile"
                  style={{
                    width: '90%',
                    height: '90%',
                    position: 'absolute',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    zIndex: 1,
                    borderRadius: '50%',
                    overflow: 'hidden',
                    objectFit: 'cover'
                  }}
                />
                <div style={{
                  position: 'absolute',
                  bottom: '9px',
                  left: '70%',
                  transform: 'translateX(-50%)',
                  cursor: 'pointer',
                  zIndex: 1,
                }}
                  onClick={() => handleImageReset()} >
                  <Button onClick={() => fileInputRef.current?.click()} sx={{ marginBottom: '-0.2%' }}>
                    <div style={{
                      display: 'inline-block',
                      borderRadius: '50%',
                      backgroundColor: '#FF8682',
                      padding: '2.5px',    //pen in middle of the round
                      height: '30px',
                      width: '30px',
                      marginLeft: "15px",
                      marginBottom: '0px'
                    }}>
                      <img src={pen} alt="Pen" /></div></Button>
                </div>
              </div>
              <input ref={fileInputRef} id="profile-image" type="file" style={{ display: 'none' }} onChange={(e) => handleImageChange(e, 'profile')} />

              <Button variant="contained" onClick={() => handleCoverImageReset()}
                style={{ position: 'absolute', bottom: '30px', right: '30px', zIndex: 1, color: 'black' }}>
                <CloudUploadIcon />Upload new cover
              </Button>
            </div>
            <Box sx={{ marginTop: '80px', marginLeft: "4.5%" }}>
              <div style={{ textAlign: 'center', paddingTop: '20px' }}>
                <Typography variant="p4">{userName}</Typography><br />
                <Typography variant="p2">{email}</Typography>
              </div>
            </Box>
          </Box>

          <Box paddingTop="200px" sx={{ height: '592px', width: '1232px', marginLeft: '70px', marginRight: '120px', marginBottom: '300px' }}>
            <Typography variant="p3" >
              Account
            </Typography> <br />
            <Paper elevation={4} sx={{ padding: 4, width: '1232px', marginTop: 2 }}>
              <Grid container direction="column" spacing={4}>
                <Grid item container justifyContent="space-between" alignItems="center">
                  <Grid item>
                    <Typography variant="p2" >Name:</Typography><br />
                    {isNameEditing ? (
                      <TextField  id="userName" lable="userName" name="userName" value={userName} onChange={(e) => setName(e.target.value)} />
                    ) : (
                      <Typography variant="p1">{userName}</Typography>
                    )}
                  </Grid>
                  <Grid item>
                    <Button variant='outlined' onClick={() => setIsNameEditing(true)}><Typography variant="p2"><img src={Edit} />Change</Typography></Button>
                  </Grid>
                </Grid>
                <Grid item container justifyContent="space-between" alignItems="center">
                  <Grid item>
                    <Typography variant="p2">Email:</Typography><br />
                    {isEmailEditing ? (
                      <TextField id="email" lable="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    ) : (
                      <Typography variant="p1">{email}</Typography>
                    )}
                  </Grid>
                  <Grid item >
                    <Button variant='outlined' onClick={() => setIsEmailEditing(true)}><Typography variant="p2"><img src={Edit} />Change</Typography></Button>
                  </Grid>
                </Grid>
                <Grid item container justifyContent="space-between" alignItems="center">
                  <Grid item>
                    <Typography variant="p2">Password:</Typography><br />
                    {isPasswordEditing ? (
                      <TextField id="password" lable="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    ) : (
                      <Typography variant="p1">{password}</Typography>
                    )}
                  </Grid>
                  <Grid item>
                    <Button variant='outlined' onClick={() => setIsPasswordEditing(true)}><Typography variant="p2"><img src={Edit} />Change</Typography></Button>
                  </Grid>
                </Grid>
                <Grid item container justifyContent="space-between" alignItems="center">
                  <Grid item>
                    <Typography variant="p2">Phone Number:</Typography><br />
                    {isPhoneNumberEditing ? (
                      <TextField id="phoneNumber" lable="phoneNumber" name="phoneNumber" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                    ) : (
                      <Typography variant="p1">{phoneNumber}</Typography>
                    )}
                  </Grid>
                  <Grid item>
                    <Button variant='outlined' onClick={() => setIsPhoneNumberEditing(true)}><Typography variant="p2"><img src={Edit} />Change</Typography></Button>
                  </Grid>
                </Grid>
                <Grid item container justifyContent="space-between" alignItems="center">
                  <Grid item>
                    <Typography variant="p2">Address:</Typography><br />
                    {isAddressEditing ? (
                      <TextField id="address" lable="address"name="address" value={address} onChange={(e) => setAddress(e.target.value)} />
                    ) : (
                      <Typography variant="p1">{address}</Typography>
                    )}
                  </Grid>
                  <Grid item>
                    <Button variant='outlined' onClick={() => setIsAddressEditing(true)} ><Typography variant="p2"><img src={Edit} />Change</Typography></Button>
                  </Grid>
                </Grid>
                <Grid item container justifyContent="space-between" alignItems="center">
                  <Grid item>
                    <Typography variant="p2">Date of Birth:</Typography><br />
                    {isDateOfBirthEditing ? (
                      <TextField id="dateOfBirth" lable="dateOfBirth" name="dateOfBirth" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} />
                    ) : (
                      <Typography variant="p1">{dateOfBirth}</Typography>
                    )}
                  </Grid>
                  <Grid item>
                    <Button variant='outlined' onClick={() => setIsDateOfBirthEditing(true)}><Typography variant="p2"><img src={Edit} />Change</Typography></Button>
                  </Grid>
                </Grid>
              </Grid>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
                {isNameEditing || isEmailEditing || isPasswordEditing || isPhoneNumberEditing || isAddressEditing || isDateOfBirthEditing ? (
                  <Grid item>
                    <Button variant='outlined' color='error' onClick={handleCancel}><Typography variant="p2">Cancel</Typography></Button>
                    <Button type="submit" variant='outlined' onClick={handleSave}><Typography variant="p2">Save Profile</Typography></Button></Grid>
                ) : null}
              </Box>
            </Paper>
          </Box>
        </Box>
      </form>
    </div>
  );
};

export default Profilepage;
