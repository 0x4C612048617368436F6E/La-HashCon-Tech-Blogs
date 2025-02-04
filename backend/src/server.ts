import Logger from '../middleware/logger'
import express from 'express';
import databaseConnection from '../config/databaseConfig';
import mongoose from 'mongoose';
import cors from 'cors';
import corsOptionConfig from '../config/corsOptionConfig';
import homeRouter from '../routes/homeRoute'
import signupRouter from '../routes/signupRoute'
import logininRouter from '../routes/loginRoute';
import cookieParser from 'cookie-parser'
//import homeRoute from '../routes/homeRoute';
require('dotenv').config();
let app = express();
let PORT:number | string = process.env.PORT || 5000; 

databaseConnection();

//set up the middleware
app.use(cors(corsOptionConfig));
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(cookieParser());
const logger = new Logger();
app.use(logger.logMessage);

app.use('/',homeRouter);
app.use('/signup',signupRouter);
app.use('/login',logininRouter);


app.use(logger.logError);
//want to connect to database and then connect to server. If connection to databsae failes, no to concect to server
mongoose.connection.on('connecting', () => { 
  console.log('connecting');
  console.log(mongoose.connection.readyState);
  logger.logDatabase("Trying to connect to database... Please Wait");
  logger.logDatabase("Ready State "+ mongoose.connection.readyState+"\n");
})

mongoose.connection.on('connected', () => {
  console.log('connected');
  console.log(mongoose.connection.readyState);
  logger.logDatabase("Connected to Database");
  logger.logDatabase("Ready State "+ mongoose.connection.readyState);

  //make server listen here
  app.listen(PORT,()=>{
    console.log("Server is listening at port " + PORT);
    logger.logMessageForServer("Server is listening at port " + PORT)
  })
});

mongoose.connection.on('disconnecting', () => {
    console.log('disconnecting');
    console.log(mongoose.connection.readyState);
    logger.logDatabase("Disconnecting to database... Please Wait");
    logger.logDatabase("Ready State "+ mongoose.connection.readyState);
});

mongoose.connection.on('disconnected', () => {
    console.log('disconnected');
    console.log(mongoose.connection.readyState);
    logger.logDatabase("Database connection disconected");
    logger.logDatabase("Ready State "+ mongoose.connection.readyState+"\n");
});

//Checking
