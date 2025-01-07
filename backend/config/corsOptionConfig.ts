//configure cors options here

//lets define the white-lists Whihc are the allowed origins
let allowedOrigins:string[] = ["localhost","http://localhost:3000"]; //Since this is a Private API, we only want our Front-end and any development frontend origin
const corsOptions = {
    origin: (origin:any,callback:any)=>{
        //check if origin is not in white list
        if(allowedOrigins.includes(origin) || origin == undefined){
            callback(null,true);
        }else{
            //origin does not exits
            callback(new Error("Origin is prohibited"));
        }
    }
}

export default corsOptions;