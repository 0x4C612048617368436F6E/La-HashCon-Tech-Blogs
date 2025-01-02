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

    async logMessageForServer(message:string){
        let date = new Date().toISOString();
        let LogDirectory = path.join(__dirname,"..","..","Logger");
        let LogPathServer = path.join(__dirname,"..","..","Logger","serverlog.log");
        let LogPathDatabase = path.join(__dirname,"..","..","Logger","databaselog.log");
        //write to file
        const FinalString = (date ?? new Date().toISOString()) + " "+ message +"\n";
        if(existsSync((LogDirectory ?? path.join(__dirname,"..","..","Logger")))){
            //file already exists
            //Append the message to the file
            try{
                await fs.promises.appendFile((LogPathServer ?? path.join(__dirname,"..","..","Logger","serverlog.log")),FinalString);
            }catch(err){
                console.log("Error occured: ",err);
            }
        }else{
            //file does not exists
            //make directory and create new file and write the message to it
            try{
                fs.promises.mkdir((LogDirectory ?? path.join(__dirname,"..","..","Logger")));
                fs.promises.writeFile((LogPathServer ?? path.join(__dirname,"..","..","Logger","serverlog.log")),FinalString);
            }catch(err){
                console.log("Error occured: ",err);
            }
        }
    }

    async logMessage(req:any,res:any,next:any){
        let date = new Date().toISOString();
        let LogDirectory = path.join(__dirname,"..","..","Logger");
        let LogPathServer = path.join(__dirname,"..","..","Logger","serverlog.log");
        let LogPathDatabase = path.join(__dirname,"..","..","Logger","databaselog.log");
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
        const FinalString:string = origin +" " + " " + originAgain + " " + protocol +" -- ["+(date ?? (date ?? new Date().toISOString()) +"\n")+"] " +"\""+ " " + HTTPMethod + " " + route + " " + HTTPVersion + " "+status + " " +PORT + " \" - "+Device+IPAddress+"\n";
        //write to file
        if(existsSync((LogDirectory ?? path.join(__dirname,"..","..","Logger")))){
            //file already exists
            //Append the message to the file
            try{
                await fs.promises.appendFile((LogPathServer ?? path.join(__dirname,"..","..","Logger","serverlog.log")),FinalString);
            }catch(err){
                console.log("Error occured: ",err);
            }
        }else{
            //file does not exists
            //make directory and create new file and write the message to it
            try{
                fs.promises.mkdir((LogDirectory ?? path.join(__dirname,"..","..","Logger")));
                fs.promises.writeFile((LogPathServer ?? path.join(__dirname,"..","..","Logger","serverlog.log")),FinalString);
            }catch(err){
                console.log("Error occured: ",err);
            }
        }

        next();
    }

    async logError(err:any,req:any,res:any,next:any){
        let date = new Date().toISOString();
        let LogDirectory = path.join(__dirname,"..","..","Logger");
        let LogPathServer = path.join(__dirname,"..","..","Logger","serverlog.log");
        let LogPathDatabase = path.join(__dirname,"..","..","Logger","databaselog.log");
        if(err){
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

            //construct final string
            const FinalString:string = origin +" " + " " + originAgain + " " + protocol +" -- ["+(date ?? (date ?? new Date().toISOString()) +"\n")+"] " +"\""+ " " + HTTPMethod + " " + route + " " + HTTPVersion + " "+status + " " +PORT + " \" - "+Device+IPAddress+"\n";
            //write to file
            if(existsSync((LogDirectory ?? path.join(__dirname,"..","..","Logger")))){
                //file already exists
                //Append the message to the file
                try{
                    await fs.promises.appendFile((LogPathServer ?? path.join(__dirname,"..","..","Logger","serverlog.log")),FinalString);
                }catch(err){
                    console.log("Error occured: ",err);
            }
            }else{
                //file does not exists
                //make directory and create new file and write the message to it
                try{
                    fs.promises.mkdir((LogDirectory ?? path.join(__dirname,"..","..","Logger")));
                    fs.promises.writeFile((LogPathServer ?? path.join(__dirname,"..","..","Logger","serverlog.log")),FinalString);
                }catch(err){
                    console.log("Error occured: ",err);
                }
            }

            next();
        }
    }

    async logDatabase(message:any){
        let date = new Date().toISOString();
        let LogDirectory = path.join(__dirname,"..","..","Logger");
        let LogPathServer = path.join(__dirname,"..","..","Logger","serverlog.log");
        let LogPathDatabase = path.join(__dirname,"..","..","Logger","databaselog.log");
        //Just to log Database access
        //write to file
        const FinalString = (date ?? new Date().toISOString()) + " "+ message +"\n";
        if(existsSync((LogDirectory ?? path.join(__dirname,"..","..","Logger")))){
            try{
                fs.promises.appendFile((LogPathDatabase ?? path.join(__dirname,"..","..","Logger","databaselog.log")),FinalString);
            }catch(err){
                console.log("Error occured: ",err);
            }
        }else{
            //file does not exists
            //make directory and create new file and write the message to it
            try{
                console.log((LogDirectory ?? path.join(__dirname,"..","..","Logger")));
                console.log(__dirname)
                //make directory
                await fs.promises.mkdir((LogDirectory ?? path.join(__dirname,"..","..","Logger")));
                await fs.promises.writeFile((LogPathDatabase ?? path.join(__dirname,"..","..","Logger","databaselog.log")),FinalString);
            }catch(err){
                console.log("Error occured: ",err);
            }
        }
    }
}
