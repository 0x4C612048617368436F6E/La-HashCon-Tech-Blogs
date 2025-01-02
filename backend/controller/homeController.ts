const homeController =(req:any,res:any)=>{
    //Can send stuff. Note this is an API only
    /*
    The stuff we will ssend to the home page includes:
    1.) Can send whether user is logged in
    2.) Send the latest or most popular posts to display
    
    For now, let met just send a simple welcome message
    */
    const message = {
        message:"Welcome to La HashCon"
    }
    res.status(200);
    res.json(message);
}

export default homeController;