import React, { useState } from 'react';
import { Grid, TextField, MenuItem } from '@mui/material';
import products from '../data/products'; 
import ProductItem from '../components/ProductItem';

const HomePage = () => {
  const [sort, setSort] = useState('');
  const [search, setSearch] = useState('');

  const handleSortChange = (e) => {
    setSort(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const sortedProducts = [...products].sort((a, b) => {
    if (sort === 'priceLowToHigh') return a.price - b.price;
    if (sort === 'priceHighToLow') return b.price - a.price;
    return 0;
  });

  const filteredProducts = sortedProducts.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: '20px' }}>
      <TextField
        label="Search Products"
        value={search}
        onChange={handleSearchChange}
        fullWidth
        margin="normal"
      />
      <TextField
        select
        label="Sort By"
        value={sort}
        onChange={handleSortChange}
        fullWidth
        margin="normal"
      >
        <MenuItem value="">None</MenuItem>
        <MenuItem value="priceLowToHigh">Price: Low to High</MenuItem>
        <MenuItem value="priceHighToLow">Price: High to Low</MenuItem>
      </TextField>
      <Grid container spacing={4}> 
        {filteredProducts.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <ProductItem product={product} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default HomePage;
