//custom logger to use
import {existsSync} from 'node:fs';
import path from 'node:path';
enum LOGSTATUS{
    INFORMATION,WARNING,ERROR
}

export default class Logger{
    private readonly date: Date;
    private readonly LogPath:string = path.join(__dirname+".."+"Logger"+"log.log");
    public constructor(){
        //here just construct the date
        this.date = new Date();
        //const Cdate:string = date.toString().slice(0,-29);
    }

    logMessage(req:any,res:any,next:any){
        //check the type of status we get
        let status:number = req.status;
        let HTTPMethod = req.method;
        let origin = req.origin; //i.e. from whihc origin
        let route = req.path;
        let HTTPVersion = req.HTTPVersion; //The HTTP version
        let PORT = req.PORT;
        let Device = req.device
        let IPAddress = req.IPAddress
        if(status == 200){
            const LOGTAG = LOGSTATUS.INFORMATION;
        }

        //construct final string
        const FinalString:string = origin+"-- ["+this.date.toString().slice(0,29)+"] " +"\""+HTTPMethod+route+HTTPVersion+status+PORT+"\"-\""+Device+IPAddress;
        //write to file
        if(existsSync(this.LogPath)){
            //file already exists
            //Append the message to the file
        }else{
            //file does not exists
            //create new file and write the message to it
        }
    }
}
