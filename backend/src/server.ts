import Logger from '../middleware/logger'
import express, { urlencoded } from 'express';
let app = express();
let PORT:number | string = process.env.PORT || 5000; 

//set up the middleware
app.use(express.urlencoded({extended:false}));
app.use(express.json());

app.listen(PORT,()=>{
    console.log("Server is listening at port " + PORT);
})