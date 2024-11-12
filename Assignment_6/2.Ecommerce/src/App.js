import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage'; 

const ProductDetail = React.lazy(() => import('./pages/ProductDetail'));

const theme = createTheme({
  palette: {
    primary: {
      main: '#007A33', 
    },
    secondary: {
      main: '#c5a880', 
    },
    background: {
      default: '#fdf7f1',
    },
  },
  typography: {
    fontFamily: '"Poppins", sans-serif',
  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CartProvider>
        <WishlistProvider>
          <Router>
            <Navbar />
            <Suspense fallback={<div>Loading...</div>}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/checkout" element={<CheckoutPage />} /> { }
              </Routes>
            </Suspense>
          </Router>
        </WishlistProvider>
      </CartProvider>
    </ThemeProvider>
  );
};

export default App;