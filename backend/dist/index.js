"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const errorMiddleware_1 = __importDefault(require("./middleware/errorMiddleware"));
const mongoose_1 = __importDefault(require("mongoose"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const productRoutes_1 = __importDefault(require("./routes/productRoutes"));
const orderRoutes_1 = __importDefault(require("./routes/orderRoutes"));
const path_1 = __importDefault(require("path"));
//Express App Initialization
const app = (0, express_1.default)();
const PORT = process.env.PORT || 4000;
//Middleware
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
//Routes
app.get('/health', (req, res) => {
    return res.status(200).json({ messgage: "Server is running" });
});
//serving static file
app.use('/assets/images', express_1.default.static(path_1.default.join(__dirname, "..", "public", "images")));
//Serving Frontend Statically
app.use(express_1.default.static(path_1.default.join(__dirname, "..", "..", "frontend", "dist")));
//Api Routes
app.use('/api/v1/auth', authRoutes_1.default);
app.use('/api/v1/users', userRoutes_1.default);
app.use('/api/v1/product', productRoutes_1.default);
app.use('/api/v1/order', orderRoutes_1.default);
//Sending Frontend
app.get('*', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, "..", "..", "frontend", "dist", "index.html"));
});
//Global Error Handler
app.use(errorMiddleware_1.default);
//Server Listen and DB Connect
const dbConn = async () => {
    try {
        await mongoose_1.default.connect(process.env.DB_URI);
        console.log("Db is connected to application");
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    }
    catch (error) {
        console.log(error);
    }
};
dbConn();
