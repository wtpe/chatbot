import express from "express";
import bodyParser from "body-parser";
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from "helmet";
import morgan from "morgan";
import OpenAI from 'openai';
import openAiRoute from './routes/openAiRoute.js';

// CONFIGURATIONS
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());

app.use(helmet.crossOriginResourcePolicy({policy: 'cross-origin'}))
app.use(morgan('common'));
app.use(bodyParser.json({limit:'30mb',extended :true}));
app.use(bodyParser.urlencoded({limit:'30mb',extended:true}));
app.use(cors());

// OPEN AI CONFIGURATION
console.log(process.env['OPENAI_API_KEY']);
export const openai = new OpenAI({
    apiKey: process.env['OPENAI_API_KEY'], // This is the default and can be omitted
  });

//ROUTES
app.use("/openai",openAiRoute);

// SERVER SETUP
const PORT = process.env.PORT || 9000;
app.listen(PORT,()=>{
    console.log(`Server is running...: ${PORT}`)
})

