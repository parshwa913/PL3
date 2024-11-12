import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { WishlistContext } from '../context/WishlistContext';
import { products } from '../data/products';
import { Card, CardContent, CardMedia, Typography, Button, Box } from '@mui/material';

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);
  const { addToWishlist } = useContext(WishlistContext);
  const product = products.find((p) => p.id === parseInt(id));

  if (!product) {
    return <Typography variant="h6">Product not found</Typography>;
  }

  const handleAddToCart = () => {
    addToCart(product);
  };

  const handleAddToWishlist = () => {
    addToWishlist(product);
  };

  return (
    <Card sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
      <CardMedia
        component="img"
        sx={{
          width: '500px',
          height: '500px',
          objectFit: 'cover',
          objectPosition: 'center',
        }}
        image={product.image}
        alt={product.name}
      />
      <CardContent>
        <Typography variant="h5" align="center">{product.name}</Typography>
        <Typography variant="body1" align="center">Price: ${product.price}</Typography>
        <Typography variant="body2" align="center">{product.description}</Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
          <Button variant="contained" onClick={handleAddToCart} sx={{ marginRight: '10px' }}>
            Add to Cart
          </Button>
          <Button variant="outlined" onClick={handleAddToWishlist}>
            Add to Wishlist
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProductDetail;
