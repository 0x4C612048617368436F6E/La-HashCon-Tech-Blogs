//Database configuration
import mongoose from 'mongoose';
import { ConnectOptions } from 'mongoose';
//import logger here to use for database
import Logger from '../middleware/logger';

const logger = new Logger()

const databaseConnection = async()=>{
    //create new client instance
    const MONGODBURLSTRING:string | undefined = process.env.MONGODBKEY || undefined
    if(MONGODBURLSTRING ==undefined){
        console.log("Error extracting Value");
        return;
    }
    const MongooseObject = {
        useNewUrlParser: true,
        useUnifiedTopology: true
    } 
    try{
        mongoose.connect(MONGODBURLSTRING,MongooseObject as ConnectOptions);

    }catch(err){
        logger.logDatabase(err);
        console.log("Error :",err)
    }
}

export default databaseConnection;