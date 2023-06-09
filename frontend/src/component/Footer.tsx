import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';

function Copyright() {
  return (
    <Typography variant="body2" color="#FFFFFF" sx={{flexGrow : 1
    ,textAlign : "center"}} >
   
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
       Light Up Sign
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function StickyFooter() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      <CssBaseline />
      <Box
        component="footer"
        sx={{
          py: 2,
          px: 1,
          mt: 'auto',mb: 2,
          backgroundColor: '#5E35B1',
        width: '100%', m:3

       
        }}
      >
          <Copyright />
      </Box>
    </Box>
  );
}