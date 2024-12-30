import Logger from '../middleware/logger'
import express from 'express';
import databaseConnection from '../config/databaseConfig';
require('dotenv').config();
let app = express();
let PORT:number | string = process.env.PORT || 5000; 

databaseConnection();

//set up the middleware
app.use(express.urlencoded({extended:false}));
app.use(express.json());
const logger = new Logger();
app.use(logger.logMessage);


app.listen(PORT,()=>{
    console.log("Server is listening at port " + PORT);
})