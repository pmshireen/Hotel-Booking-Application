import { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Avatar } from '@mui/material';
import findstays from '../../assets/icons/navbar-icons/find-stays.svg'
import logo from '../../assets/icons/navbar-icons/logo-2.svg'
import heart from '../../assets/icons/navbar-icons/heart.svg'
import UserDropdown from '../Header/user-dropdown';
import { styled } from '@mui/material/styles';
import theme from '../../utils/theme/theme'
import { Link, useNavigate } from 'react-router-dom';

const FancyButton = styled(Button)({
    background: 'black',
    border: 0,
    borderRadius: 10,
    boxShadow: '0 3px 5px 2px rgba(0,0,0,0.25)',
    color: 'white',
    height: 48,
    padding: '0 3.5vh',
    marginLeft: '8px',
    '&:hover': {
        background: 'white',
        color: 'black',
    },
});
const HoverableBox = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    gap: '4%',
    cursor: 'default',
    '&:hover': {
        cursor: 'pointer',
    },
});
const Navbar = () => {
    const navigate = useNavigate();
    const [showIndicator, setShowIndicator] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false); // Track user login state
    const [anchorEl, setAnchorEl] = useState(null);
    // Function to handle click on the user name and show the dropdown
    const handleUserNameClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    // Function to handle closing the dropdown
    const handleDropdownClose = () => {
        setAnchorEl(null);
    };
    const handleFav = () => {
        navigate("/favourites");
    }
    const handleLogoClick = () => {
        setShowIndicator(!showIndicator);
        navigate("/");
    };
    const logoText = "Find Stays";
    const processName = (name) => {
        if (name.includes(' ')) {
            return name.split(' ')[0];
        } else if (name.length > 8) {
            return name.substring(0, 7) + '...';
        } else {
            return name;
        }
    };
    useEffect(() => {
        const handleScroll = () => {
            const isTop = window.scrollY < 100; // Adjust the value as needed
            setShowIndicator(isTop);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        const askLoggedInStatus = async () => {
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
                            console.log("User data:", responseData.info);
                            setProfilepic(responseData.info.profilePicture);
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

        askLoggedInStatus();
    }, []);
    const loggedOut = () => {
        fetch(
            "http://localhost:3200/auth/logout",
            {
                method: "GET",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
            }
        );
        navigate("/")
    }
    const [Profilepic, setProfilepic] = useState('https://s3-alpha-sig.figma.com/img/de42/3158/13dc5b2e20dc60002c5ebc10bec549e3?Expires=1691971200&Signature=ZHzAq5Bk5EtbGxurRfqS~zdOjE-gM~MqPhIhiy4~0oZeKBZuXxWQ5wO7oSi~GlRdCULMNOa3~PbJVxvkGF4uWBht40SUWPLZBpZGSdDV-BPFdE-Dm-isnLYdlFQDoRT~3w-ZAlKnAwkI6P93dDJiQhap2ud5nDX5utE5xFfx9Rn03Pub8acxrz7Tvc0kUjTdMzQujBNeSQ6xIMQzfd~bNipy04UMDozckMvKQg4GWJUWWXOYL6WSPubSADq0jvNXSEh5uYDCeXacb0cYslL1LtgbLPScjtJ2Cjyql~0hHZS2YBG4d6fly77Fit~d7k~zouNqX-G4CvfhN4PFkA8h-Q__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4')
    const [userName, setUserName] = useState('')
    const [hasProfilePicture, setHasProfilePicture] = useState(true); // Set it to `false` if the user doesn't have a profile picture
    // const linkStyle = {
    //     color: 'white',
    //     textDecoration: 'none',

    // }
    // const hoverLinkStyle = {
    //     color: 'black'
    // };
    return (
        <AppBar position="fixed" style={{ zIndex: showIndicator ? 1 : 1000, backgroundColor: 'white', padding: '10px 6%' }}>
            <Toolbar>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    {/* SVG Icon */}
                    <img src={findstays} alt="" />

                    {/* Logo */}
                    <Typography
                        variant="body1"
                        component="div"
                        onClick={handleLogoClick}
                        style={{ cursor: 'pointer', marginLeft: '6px' }}
                    >
                        {logoText}
                    </Typography>

                    {/* Indicator */}
                    {showIndicator && (
                        <div
                            style={{
                                height: 7,
                                width: '9%',
                                backgroundColor: '#8DD3BB',
                                position: 'absolute',
                                bottom: -10,
                                left: 28,
                                transition: 'left 0.2s',
                            }}
                        />
                    )}
                </div>
                <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', justifyContent: 'center' }} >
                    <img src={logo} alt="" />
                </Box>
                <div style={{ marginLeft: 'auto' }}>
                    {loggedIn ? (

                        <Box sx={{ display: 'flex', alignItems: 'center', gap: '7%' }}>
                            <HoverableBox onClick={handleFav} sx={{ display: 'flex', alignItems: 'center', gap: '4%' }} >
                                <img src={heart} />
                                <Typography>Favourites</Typography>
                            </HoverableBox>
                            <span>|</span>
                            <Box sx={{ display: 'flex', alignItems: 'center', margin: '2%' }}>
                                {hasProfilePicture ? (
                                    <Avatar src={Profilepic} alt="User Avatar" sx={{
                                        width: 35,
                                        height: 35,
                                    }} />
                                ) : (
                                    <Avatar src="//" alt="J" sx={{ width: 40, height: 40 }} />)}
                                <Typography variant="body1" sx={{ marginLeft: '8px', cursor: 'pointer' }} onClick={handleUserNameClick}>
                                    {userName}
                                </Typography>
                            </Box>
                            {/* <Button onClick={() => setLoggedIn(false)} sx={{ color: theme.palette.text.primary, marginLeft: '16px' }}>
                                Logout
                            </Button> */}
                        </Box>
                    ) : (
                        // Show "Signin" and "Login" buttons when not logged in
                        <>
                            {/* <Button>
                                Checks
                            </Button> */}
                            <Link to='/signup' >
                                <Button onClick={() => setLoggedIn(true)} sx={{ color: theme.palette.text.primary }}>
                                    Signin
                                </Button></Link>
                            <Link to='/login' ><FancyButton>Login</FancyButton></Link>
                        </>
                    )}
                    <UserDropdown
                        anchorEl={anchorEl}
                        onClose={handleDropdownClose}
                        onLogout={() => {
                            handleDropdownClose(); // Close the dropdown after logout
                            setLoggedIn(false);
                            loggedOut();
                        }}
                    // Add more props as needed for your custom dropdown items
                    />
                </div>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
