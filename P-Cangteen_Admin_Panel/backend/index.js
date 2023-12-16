const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require("dotenv")

const productRoutes = require("./src/routes/products")
const userRoutes = require("./src/routes/users")
const receiptRoutes = require("./src/routes/receipts")


const app = express();
const port = process.env.PORT || 3001;

dotenv.config()
app.use(bodyParser.json());
app.use(cors());

// MongoDB Connection
const connectDB = async () => {
    try {
        await mongoose.connect(
            `mongodb+srv://${process.env.USERNAME_DB}:${process.env.PASSWORD_DB}@cluster0.z4dda47.mongodb.net/?retryWrites=true&w=majority`
        )
        console.log('connected DB')
    } catch (error) {
        console.log(error)
        process.exit(-1)
    }
}
connectDB()

// Routes
app.use("/api/products",productRoutes);
app.use("/api/users",userRoutes);
app.use("/api/receipts",receiptRoutes);

// Start Server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
