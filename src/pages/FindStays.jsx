import React from 'react'
import Footer from '../components/Footer/Footer'
import Navbar from '../components/Header/Navbar'
import Hero from '../components/Header/Hero'
import { Box, Button } from '@mui/material'
import { Link } from 'react-router-dom';
import MainPage from '../components/Search/MainPage'


const FindStays = () => {
    return (
        <div>
            <Hero />
            <MainPage />
            <Box sx={{ width: '20vh', height: '15vh' }}>
            </Box>
        </div>
    )
}

export default FindStays
// Hello
