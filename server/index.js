import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors'
import { TaskRouter } from './controllers/TaskController.js';
import dotenv from 'dotenv'

dotenv.config()

const app = express();

app.use(cors({
    origin : ["https://to-do-silk-three.vercel.app/"],
    methods : ["GET", "POST" ,"PUT","DELETE"],
    credentials :true
}));
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