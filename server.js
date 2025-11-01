import express from 'express';
import mongoose from 'mongoose';
import { config } from 'dotenv';
import userRoute from './Routes/user.js';
import productRoute from './Routes/products.js';
import cartRoute from './Routes/cart.js';
import addressRoute from './Routes/address.js';
import cors from 'cors';

const app = express();

// .ENV setup
config({ path: '.env' });

// Parse JSON bodies
app.use(express.json());

app.use(cors({
  origin: [
    "http://localhost:5173", // local dev frontend (Vite)
    "https://ecommerce-backend-ookg5rp7t-aqeel2744s-projects.vercel.app",
    "https://ecommerce-backend-chi-opal.vercel.app"
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));

// Home route
app.get('/', (req, res) => {
  res.json({ message: "Server is running on home" });
});

// MongoDB connection
mongoose.connect(process.env.MONGO_URL, {
  dbName: "EcommerceWebsite"
}).then(() => console.log("MongoDB connected.."))
  .catch((err) => console.log(err.message));

// Routes
app.use('/api/user', userRoute);
app.use('/api/product', productRoute);
app.use('/api/cart', cartRoute);
app.use('/api/address', addressRoute);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
