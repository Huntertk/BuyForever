import 'dotenv/config';
import express, {Request, Response} from 'express';
import errorHandler  from './middleware/errorMiddleware';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import authRouter from './routes/authRoutes';
import userRouter from './routes/userRoutes';
import productRouter from './routes/productRoutes';
import orderRouter from './routes/orderRoutes';
import path from 'path';


//Express App Initialization
const app = express();
const PORT = process.env.PORT || 4000;

//Middleware
app.use(express.json());
app.use(cookieParser());

//Routes
app.get('/health', (req:Request, res:Response) => {
    return res.status(200).json({messgage:"Server is running"})
})

//serving static file
app.use('/assets/images', express.static(path.join(__dirname,"..", "public", "images")))


//Serving Frontend Statically
app.use(express.static(path.join(__dirname, "..", "..", "frontend", "dist")))


//Api Routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/product', productRouter);
app.use('/api/v1/order', orderRouter);

//Sending Frontend
app.get('*', (req:Request, res:Response) => {
    res.sendFile(path.join(__dirname, "..", "..", "frontend", "dist", "index.html"))
})

//Global Error Handler
app.use(errorHandler);


//Server Listen and DB Connect
const dbConn = async () => {
    try {
        await mongoose.connect(process.env.DB_URI as string);
        console.log("Db is connected to application");
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        })
    } catch (error) {
        console.log(error);
    }

}

dbConn();