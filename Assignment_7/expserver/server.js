import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

app.get('/', (req, res) => {
  res.send('<h1>Welcome to the Home Page</h1>');
});

app.get('/about', (req, res) => {
  res.send('<h1>This is the About Page</h1>');
});

app.get('/contact', (req, res) => {
  res.send('<h1>Contact us at: email@example.com</h1>');
});

app.get('/users/:id', (req, res) => {
  const userId = req.params.id;
  res.send(`<h1>User ID: ${userId}</h1>`);
});

app.get('/products/:category/:productId', (req, res) => {
  const { category, productId } = req.params;
  res.json({
    category: category,
    productId: productId
  });
});

app.use((req, res) => {
  res.status(404).send('<h1>Page Not Found</h1>');
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
