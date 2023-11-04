import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <>
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            INFORMATICs
          </Typography>
          <Stack spacing={2} direction="row">
          <Button color="inherit" variant='outlined' component={Link} to="/">Home</Button>
          <Button color="inherit" variant='outlined' component={Link} to="/upload">Upload</Button>
          </Stack>
        </Toolbar>
      </AppBar>
    </Box>
    </>
  )
}

export default Navbar;