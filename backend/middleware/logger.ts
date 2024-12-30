//custom logger to use
import {existsSync} from 'node:fs';
import path from 'node:path';
import fs from 'node:fs';
enum DATABASELOGSTATUS{
    INFORMATION,WARNING,ERROR
}

enum REPSONSESTATUSCODE{
    INFORMATION,SUCCESS,REDIRECTION,CLIENTERROR,SERVERERROR
}

export default class Logger{
    private readonly date: Date;
    private readonly LogDirectory = path.join(__dirname,"..","..","Logger");
    private readonly LogPathServer:string = path.join(__dirname,"..","..","Logger","serverlog.log");
    private readonly LogPathDatbase = path.join(__dirname,"..","..","Logger","databaselog.log");
    public constructor(){
        //here just construct the date
        this.date = new Date();
        //const Cdate:string = date.toString().slice(0,-29);
    }

    async logMessage(req:any,res:any,next:any){
        //check the type of status we get
        let status:number = res.statusCode;
        let HTTPMethod = req.method;
        let origin = req.get('host'); //i.e. from whihc origin
        let originAgain = req.hostname;
        let route = req.path;
        let HTTPVersion = req.httpVersion; //The HTTP version
        let protocol = req.protocol;
        let PORT = req.socket.localPort;
        let Device = req.device
        let IPAddress = req.ip
        let RESPONSESTATUS:any;
        if(status>=100 && status<=199){
            RESPONSESTATUS = REPSONSESTATUSCODE.INFORMATION
        }
        else if(status >= 200 && status<= 299){
            //const LOGTAG = LOGSTATUS.INFORMATION;
            RESPONSESTATUS = REPSONSESTATUSCODE.SUCCESS
        }else if(status >=300 && status <= 399){
            RESPONSESTATUS = REPSONSESTATUSCODE.REDIRECTION
        }else if(status >=400 && status <= 499){
            RESPONSESTATUS = REPSONSESTATUSCODE.CLIENTERROR
        }else{
            RESPONSESTATUS = REPSONSESTATUSCODE.SERVERERROR;
        }

        //construct final string
        const FinalString:string = origin +" " + originAgain + " " + protocol +"-- ["+this.date.toString().slice(0,29)+"] " +"\""+HTTPMethod+route+HTTPVersion+status+PORT+"\"-\""+Device+IPAddress+"\n";
        //write to file
        if(existsSync(this.LogDirectory)){
            //file already exists
            //Append the message to the file
            try{
                await fs.promises.appendFile(this.LogPathServer,FinalString);
            }catch(err){
                console.log("Error occured: ",err);
            }
        }else{
            //file does not exists
            //make directory and create new file and write the message to it
            try{
                fs.promises.mkdir(this.LogDirectory);
                fs.promises.writeFile(this.LogPathServer,FinalString);
            }catch(err){
                console.log("Error occured: ",err);
            }
        }

        next();
    }

    async logDatabase(message:any){
        //Just to log Database access
        //write to file
        const FinalString = this.date + message +"\n";
        if(existsSync(this.LogDirectory)){
            try{
                fs.promises.appendFile(this.LogPathDatbase,FinalString);
            }catch(err){
                console.log("Error occured: ",err);
            }
        }else{
            //file does not exists
            //make directory and create new file and write the message to it
            try{
                console.log(this.LogDirectory);
                console.log(__dirname)
                //make directory
                await fs.promises.mkdir(this.LogDirectory);
                await fs.promises.writeFile(this.LogPathDatbase,FinalString);
            }catch(err){
                console.log("Error occured: ",err);
            }
        }
    }
}
