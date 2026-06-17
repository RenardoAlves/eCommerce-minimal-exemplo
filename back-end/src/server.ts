import productsRoute from './routes/products.routes.ts'
import express from 'express';
import cors from 'cors';
import cartRoutes from './routes/cart.routes.ts'

const app = express();
const port = 3000;

app.use(cors({
  origin: process.env.FRONTEND_URL
}));

app.use("/products", productsRoute);
app.use("/cart", cartRoutes);

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
