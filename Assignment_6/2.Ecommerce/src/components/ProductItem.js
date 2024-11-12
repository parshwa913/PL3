import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ProductItem = ({ product, addToCart }) => {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <Card>
      <CardMedia
        component="img"
        sx={{
          height: '200px',
          width: '100%',
          objectFit: 'contain',
          objectPosition: 'center',
        }}
        image={product.image}
        alt={product.name}
      />
      <CardContent>
        <Typography variant="h6" align="center">{product.name}</Typography>
        <Typography variant="body2" align="center">Price: ₹{parseFloat(product.price).toFixed(2)}</Typography>
        
        <Box display="flex" justifyContent="center" mt={2}>
          <Button variant="contained" onClick={handleViewDetails}>
            View Details
          </Button>
          <Button variant="outlined" onClick={() => addToCart(product)} sx={{ marginLeft: '10px' }}>
            Add to Cart
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProductItem;
