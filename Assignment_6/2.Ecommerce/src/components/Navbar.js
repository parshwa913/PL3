import React, { useContext } from 'react';
import { AppBar, Toolbar, Typography, Button, Badge } from '@mui/material';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

const Navbar = () => {
  const { cart } = useContext(CartContext);

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div>
      <AppBar position="fixed" style={{ top: 0, zIndex: 1 }}> 
        <Toolbar>
          <Typography 
            variant="h6" 
            component={Link} 
            to="/" 
            style={{ flexGrow: 1, textDecoration: 'none', color: 'inherit' }}
          >
            The Silver Oak
          </Typography>
          <Button color="inherit" component={Link} to="/">
            Home
          </Button>
          <Button color="inherit" component={Link} to="/cart">
            <Badge badgeContent={totalItems} color="secondary">
              Cart
            </Badge>
          </Button>
        </Toolbar>
      </AppBar>
      {}
      <div style={{ height: '64px' }} /> 
    </div>
  );
};

export default Navbar;