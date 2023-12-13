import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'

import { productRouter, receiptRouter, userRouter } from './routes'

dotenv.config()

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
const app = express()

// setup
app.use(cors())
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ limit: '10mb', extended: true }))


// Route
app.get('/', (req, res) => res.send('hello world'))
app.use('/api/products', productRouter)
app.use('/api/users', userRouter)
app.use('/api/receipts', receiptRouter)

// port
const PORT = process.env.PORT || 4000
app.listen(PORT, () => console.log(`App start on PORT ${PORT}!`))
