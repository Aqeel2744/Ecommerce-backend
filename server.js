import express from 'express';
import mongoose from 'mongoose';
import { config } from 'dotenv';
import bodyParser from 'express';
import userRoute from './Routes/user.js';
import productRoute from './Routes/products.js';
import cartRoute from './Routes/cart.js';
import adrressRoute from './Routes/address.js';
import cors from 'cors';


const app = express();

// .ENV SETUP
config({ path: '.env' })

// express understand json res from thunder client 
app.use(bodyParser.json());
app.use(cors({
  origin:true,
  methods:[ "GET","POST","PUT","DELETE"],
  credentials:true
}))

app.get('/', (req, res) => {
    res.json({ message: "server is running on home" })
})
mongoose.connect(process.env.MONGO_URL, {
    dbName: "EcommerceWebsite"
}).then(() => console.log("mongo db connected..")).catch((err) => console.log(err.message));

app.use('/api/user', userRoute);

app.use('/api/product', productRoute);

app.use('/api/cart', cartRoute)

app.use('/api/address', adrressRoute)

const port = process.env.PORT
app.listen(port, () => console.log('our server is running'));