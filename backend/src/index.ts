import 'dotenv/config';
import expres, {Request, Response} from 'express';
import errorHandler  from './middleware/errorMiddleware';
import mongoose from 'mongoose';
import authRouter from './routes/authRoutes';


//Express App Initialization
const app = expres();
const PORT = process.env.PORT || 4000;

//Middleware
app.use(expres.json());


//Routes
app.get('/health', (req:Request, res:Response) => {
    return res.status(200).json({messgage:"Server is running"})
})

app.use('/api/v1/auth', authRouter);

//Global Error Handler
app.use(errorHandler);


//Server Listen
const dbConn = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/ForeverBuy');
        console.log("Db is connected to application");
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        })
        
    } catch (error) {
        console.log(error);
    }

}

dbConn();