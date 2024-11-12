import React, { useContext } from 'react';
import { Badge, IconButton } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { CartContext } from '../context/CartContext';
import { Link } from 'react-router-dom';

const CartIcon = () => {
  const { cart } = useContext(CartContext);
  const itemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <IconButton color="inherit" component={Link} to="/cart">
      <Badge badgeContent={itemCount} color="secondary">
        <ShoppingCartIcon />
      </Badge>
    </IconButton>
  );
};

export default CartIcon;
