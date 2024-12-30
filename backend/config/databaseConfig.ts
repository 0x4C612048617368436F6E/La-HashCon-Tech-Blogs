//Database configuration
import {MongoClient, ServerApiVersion} from 'mongodb';
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
    const client:MongoClient = new MongoClient(MONGODBURLSTRING,{
        serverApi:{
            version:ServerApiVersion.v1,
            strict:true,
            deprecationErrors:true,
        }
    });
    
    try{
        await client.connect();
        //send a ping to confirm a successful connection
        await client.db("admin").command({ping:1});
        logger.logDatabase(" Pinged your deployment. You successfully connected to MongoDB!");
        console.log("Pinged your deployment. You successfully connected to MongoDB!");

    }catch(err){
        logger.logDatabase(err);
        console.log("Error :",err)
        //since there is an error, we want to just exit everything, i.e. terminate the server
        process.exit(-1);
    }
}

export default databaseConnection;