import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import React,{useRef} from 'react';
import Slider from '@mui/material/Slider';
import { IconButton, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useDropdown } from './Usedropdown';
import expand from '../../../assets/icons/drop-icons/expand.svg';
import { ThemeProvider } from '@emotion/react';
import theme from '../../../utils/theme/theme.jsx';

export default function Price({ value,changePrice}){
  const { isExpanded, toggleDropdown } = useDropdown();
  const PrettoSlider = styled(Slider)(({theme}) =>(({     
         color:  theme.palette.text.primary,
         marginLeft:'4px',
        '& .MuiSlider-thumb': {
            height: 20,
            width: 20,
            backgroundColor: theme.palette.primary.main,
            border: '2px solid theme.palette.primary.main',
        '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
            boxShadow: 'inherit',},
        '&:before': {
              display: 'none',
          },
        
  },  })))


  const iconStyle = {
    cursor: 'pointer',
    // Add hover effect styles
    backgroundColor: isExpanded ?  'transparent' :  '#f0f0f0',}
    return(
      <ThemeProvider theme={theme}>
            <Box sx={{ my: 3, mx: 2 }}>
                <Grid container alignItems="center"  >
                    <Grid item xs={12}  >
                        <Typography gutterBottom variant="fill" component="div"   >Filters</Typography>
                    </Grid>
                    <Grid item xs={10} sx={{marginTop : 3}}>
                        <Typography  gutterBottom variant="h13" component="div" > Price </Typography>
                    </Grid>
                    <Grid item sx={{marginTop : 3,}} >
                       <IconButton> <img src ={expand}  alt=" " onClick={toggleDropdown}  style ={iconStyle}/> </IconButton>
                    </Grid>
                 </Grid>
              <Typography variant="body2" sx={{width:270, marginLeft:0.5, marginTop:1.3 }}>
              {isExpanded && (
              <div>
                <PrettoSlider
                size='small'
                value={value}
                onChange={changePrice}
                defaultValue={899}  min={899} max={10000}  
               />
               
                <div  style ={{display: 'flex'}}>
                    <Typography gutterBottom variant='value'  sx={{marginLeft:-0.9, marginTop:1, marginBottom:1.5}} >Rs.{value[0]} </Typography>
                    <Typography   variant='value'  sx={{marginLeft:23.3,marginTop:1, marginBottom:1.5}}>Rs.{value[1]} </Typography>
                </div>
              </div> )}
              </Typography>
            </Box>
        </ThemeProvider>
); }