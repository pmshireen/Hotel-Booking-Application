import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import expand from '../../../assets/icons/drop-icons/expand.svg';
import { useDropdown } from './Usedropdown'; 
import { ThemeProvider } from '@emotion/react';
import theme from '../../../utils/theme/theme.jsx';
import { IconButton } from '@mui/material';


export default function Rate({selectRating}){
  const { isExpanded, toggleDropdown } = useDropdown();
  const ratingValues = [ 2, 3, 4];
      const ButtonStyle = styled(Box) (({theme})=> ({
            width: 40,
            height:40,
            borderRadius: 5,
            border: '2px solid' ,
            borderColor :theme.palette.primary.main  ,
            padding:'0.5rem ',
            textAlign: "center",
            margin :'0.3rem 0.9rem 1.25rem  0.0rem',
            color:theme.palette.text.primary
      }));
      const iconStyle = {
            cursor: 'pointer',
            // Add hover effect styles
            backgroundColor: isExpanded ?  'transparent' :  '#f0f0f0',}
        
      const handleBoxMouseEnter = (e) => {
        e.target.style.backgroundColor = '#d9d9d9';
        e.target.style.cursor = 'pointer';
      };

      const handleBoxMouseLeave = (e) => {
        e.target.style.backgroundColor = 'white';
      };
return(
            <ThemeProvider theme={theme}>
                  <Box sx={{ my: 3, mx: 2}}>
                              <Grid container alignItems="center" sx={{marginBottom:2.3}} >
                                          <Grid item xs={10} sx={{marginTop:1}}>
                                                  <Typography gutterBottom variant="h13" >Rating  </Typography>
                                          </Grid>
                                    <Grid item sx={{marginTop:1}} >
                                                  <IconButton>    <img src ={expand}  alt=" " onClick={toggleDropdown} style ={iconStyle} /> </IconButton></Grid> 
                                    </Grid>
                        <Typography color="text.secondary" variant="body2">
                              {isExpanded && (
                                    <div style={{ display: "flex" }}>
                              {ratingValues.map((value) => (
                                    <ButtonStyle
                                          key={value}
                                          data-value={value}
                                          onClick={() => selectRating(value)}
                                          onMouseEnter={handleBoxMouseEnter}
                                          onMouseLeave={handleBoxMouseLeave}  >
                                          <Typography variant="value">{`${value }+`}</Typography>
                                    </ButtonStyle>
                              ))}
                  </div> )}
                        </Typography>
                  </Box>
            </ThemeProvider>
);
}