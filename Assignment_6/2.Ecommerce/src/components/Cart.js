import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { Typography, Button, Grid, TextField } from '@mui/material';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity } = useContext(CartContext);

  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div>
      <Typography variant="h4">Shopping Cart</Typography>
      <Grid container spacing={3} style={{ marginTop: 20 }}>
        {cart.map(item => (
          <Grid item xs={12} sm={6} md={4} key={item.id}>
            <Typography variant="h6">{item.name}</Typography>
            <Typography variant="body2">Price: ${item.price}</Typography>
            <TextField
              type="number"
              label="Quantity"
              value={item.quantity}
              onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
              InputProps={{ inputProps: { min: 1 } }}
              style={{ marginTop: 10 }}
            />
            <Button
              variant="contained"
              color="secondary"
              onClick={() => removeFromCart(item.id)}
              style={{ marginTop: 10 }}
            >
              Remove
            </Button>
          </Grid>
        ))}
      </Grid>
      <Typography variant="h5" style={{ marginTop: 20 }}>Total: ${totalPrice}</Typography>
    </div>
  );
};

export default Cart;
