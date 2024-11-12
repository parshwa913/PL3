import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { Typography, Button, Grid, Card, CardContent, CardActions } from '@mui/material';
import { Link } from 'react-router-dom';

const CartPage = () => {
  const { cart, removeFromCart } = useContext(CartContext);

  const totalPrice = cart.reduce((acc, product) => acc + product.price * product.quantity, 0);

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Your Shopping Cart
      </Typography>
      {cart.length === 0 ? (
        <Typography variant="h6" color="textSecondary">
          Your cart is empty. <Link to="/">Continue shopping</Link>
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {cart.map((product) => (
            <Grid item xs={12} md={6} key={product.id}>
              <Card>
                <CardContent>
                  <Typography variant="h6">{product.name}</Typography>
                  <Typography>Quantity: {product.quantity}</Typography>
                  <Typography>Price: ${product.price.toFixed(2)}</Typography>
                  <Typography>
                    Subtotal: ${(product.price * product.quantity).toFixed(2)}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => removeFromCart(product.id)}
                  >
                    Remove from Cart
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
      {cart.length > 0 && (
        <div style={{ marginTop: '20px' }}>
          <Typography variant="h5">Total: ${totalPrice.toFixed(2)}</Typography>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/checkout"
            style={{ marginTop: '10px' }}
          >
            Proceed to Checkout
          </Button>
        </div>
      )}
    </div>
  );
};

export default CartPage;
