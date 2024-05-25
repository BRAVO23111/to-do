import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors'
import { TaskRouter } from './controllers/TaskController.js';
import dotenv from 'dotenv'

dotenv.config()

const app = express();


const allowedOrigins = [
    'https://to-do-silk-three.vercel.app',
    'http://localhost:5173'
  ];
  
  const corsOptions = {
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
  };
  
  app.use(cors(corsOptions));
app.use(express.json())
try {
    const db = mongoose.connect(process.env.MONGO_URI)
    if(db){
        console.log("database connected");
    }
    
} catch (error) {
    console.log(error);
}

app.use('/task',TaskRouter)

// app.get("/",(req,res)=>{
//     res.json("hey")
// })


app.listen(3000 ,(req,res)=>{
    console.log("server at 3000");
})