import 'dotenv/config';
import expres, {Request, Response} from 'express';
import errorHandler  from './middleware/errorMiddleware';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import authRouter from './routes/authRoutes';
import userRouter from './routes/userRoutes';
import productRouter from './routes/productRoutes';


//Express App Initialization
const app = expres();
const PORT = process.env.PORT || 4000;

//Middleware
app.use(expres.json());
app.use(cookieParser());

//Routes
app.get('/health', (req:Request, res:Response) => {
    return res.status(200).json({messgage:"Server is running"})
})

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/product', productRouter);

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