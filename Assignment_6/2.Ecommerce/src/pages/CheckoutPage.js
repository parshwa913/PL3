import React, { useState, useContext } from 'react';
import { Typography, TextField, Button, Box, Grid } from '@mui/material';
import { CartContext } from '../context/CartContext';

const CheckoutPage = () => {
  const { cart } = useContext(CartContext); 
  const [details, setDetails] = useState({
    name: '',
    address: '',
    email: '',
    phone: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetails({ ...details, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Order details:', details);
    console.log('Cart items:', cart);
  };

  const calculateTotal = () => {
    if (!cart || cart.length === 0) {
      return '0.00';
    }
    return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>Checkout</Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Name"
              name="name"
              value={details.name}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Address"
              name="address"
              value={details.address}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              value={details.email}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Phone"
              name="phone"
              value={details.phone}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Box mt={2}>
              <Typography variant="h6">Total Amount</Typography>
              <Typography variant="h6">₹{calculateTotal()}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" type="submit" fullWidth>
              Place Order
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default CheckoutPage;