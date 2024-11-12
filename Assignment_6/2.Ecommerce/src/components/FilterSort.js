import React, { useState, useEffect } from 'react';
import { TextField, MenuItem, Grid } from '@mui/material';

const FilterSort = ({ products, onFilterSort }) => {
  const [category, setCategory] = useState('');
  const [sortOrder, setSortOrder] = useState('');

  useEffect(() => {
    let filtered = [...products];

    if (category) {
      filtered = filtered.filter(product => product.category === category);
    }

    if (sortOrder === 'lowToHigh') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortOrder === 'highToLow') {
      filtered.sort((a, b) => b.price - a.price);
    }

    onFilterSort(filtered);
  }, [category, sortOrder, products, onFilterSort]);

  return (
    <Grid container spacing={2} style={{ marginBottom: '20px' }}>
      <Grid item xs={12} sm={6} md={3}>
        <TextField
          select
          label="Sort By"
          fullWidth
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <MenuItem value="">Default</MenuItem>
          <MenuItem value="lowToHigh">Price: Low to High</MenuItem>
          <MenuItem value="highToLow">Price: High to Low</MenuItem>
        </TextField>
      </Grid>
    </Grid>
  );
};

export default FilterSort;
