import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv'
import connectDB from './config/db.js';
import userRouter from './routes/user.router.js';
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import helmet from 'helmet'
import categoryRouter from './routes/category.router.js'
import subCategoryRouter from './routes/subCategory.router.js'
import productRouter from './routes/product.router.js'
import addressRouter from './routes/address.router.js'
import cartRouter from './routes/cart.router.js'
import orderRouter from './routes/order.router.js'
import uploadRouter from './routes/upload.router.js'
import path from 'path'
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config()
// Connect to MongoDB
connectDB();
const app = express();
app.use(cors({
    credentials : true,
    origin : process.env.FRONTEND_URL
}))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(morgan())
app.use(helmet({
    crossOriginResourcePolicy : false
}))

// Routes
app.use('/api/user',userRouter);
app.use('/api/category',categoryRouter);
app.use('/api/subcategory',subCategoryRouter);
app.use('/api/product',productRouter);
app.use('/api/address',addressRouter);
app.use('/api/cart',cartRouter);
app.use('/api/order',orderRouter);
app.use('/api/file',uploadRouter);

// Serve frontend in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../frontend', 'dist', 'index.html'));
  });
}


// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
