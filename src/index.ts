import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import routes from './routes/routes';
require("dotenv").config()


const app = express()
app.use(cors())
app.use(express.json());
app.use('/api', routes)

mongoose.connect(process.env.MONGODB_URI ?? '').then(()=>{
    console.log('connected')
    app.listen(4000)
}).catch((err:any)=>console.log(err))




