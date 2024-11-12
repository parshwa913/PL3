import React from 'react';
import { Grid } from '@mui/material';
import ProductItem from './ProductItem';

const ProductList = ({ products }) => {
  return (
    <Grid container spacing={4} justifyContent="center">
      {products.map(product => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
          <ProductItem product={product} />
        </Grid>
      ))}
    </Grid>
  );
};

export default ProductList;
