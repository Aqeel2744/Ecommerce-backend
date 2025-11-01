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

// ✅ CORS setup with your actual deployed URL
app.use(cors({
  origin: [
    "http://localhost:5173",
    "http://localhost:3000",
    "https://ecommerce-backend-v62ihhq6p-aqeel2744s-projects.vercel.app"
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));

// Home route
app.get('/', (req, res) => {
  res.json({ message: "server is running on home" });
});

// MongoDB connection
mongoose.connect(process.env.MONGO_URL, {
  dbName: "EcommerceWebsite"
})
  .then(() => console.log("MongoDB connected.."))
  .catch((err) => console.log(err.message));

// Routes
app.use('/api/user', userRoute);
app.use('/api/product', productRoute);
app.use('/api/cart', cartRoute);
app.use('/api/address', addressRoute);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
