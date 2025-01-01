import Logger from '../middleware/logger'
import express from 'express';
import databaseConnection from '../config/databaseConfig';
import mongoose from 'mongoose';
require('dotenv').config();
let app = express();
let PORT:number | string = process.env.PORT || 5000; 

databaseConnection();

//set up the middleware
app.use(express.urlencoded({extended:false}));
app.use(express.json());
const logger = new Logger();
app.use(logger.logMessage);


app.use(logger.logError);
//want to connect to database and then connect to server. If connection to databsae failes, no to concect to server
mongoose.connection.on('connecting', () => { 
  console.log('connecting');
  console.log(mongoose.connection.readyState);
  logger.logDatabase("Trying to connect to database... Please Wait\n");
  logger.logDatabase(mongoose.connection.readyState+"\n");
})

mongoose.connection.on('connected', () => {
    console.log('connected');
    console.log(mongoose.connection.readyState);
    logger.logDatabase("Trying to connect to database... Please Wait\n");
  logger.logDatabase(mongoose.connection.readyState+"\n");

  //make server listen here
  app.listen(PORT,()=>{
    console.log("Server is listening at port " + PORT);
})
});

mongoose.connection.on('disconnecting', () => {
    console.log('disconnecting');
    console.log(mongoose.connection.readyState);
    logger.logDatabase("Trying to connect to database... Please Wait\n");
    logger.logDatabase(mongoose.connection.readyState+"\n");
});

mongoose.connection.on('disconnected', () => {
    console.log('disconnected');
    console.log(mongoose.connection.readyState);
    logger.logDatabase("Trying to connect to database... Please Wait\n");
    logger.logDatabase(mongoose.connection.readyState+"\n");
});
