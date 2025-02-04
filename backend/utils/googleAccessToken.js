const OAuth2Client = require('google-auth-library');

const client = new OAuth2Client.OAuth2Client(process.env.GOOGLE_GENERATED_CLIENTID);

const verifyToken = async (token) =>{
    try{
        const ticket = await client.verifyIdToken({
            idToken:token,
            audience:process.env.GOOGLE_GENERATED_CLIENTID
        })
    }
    catch(err){
        console.log(err);
    }
}

//get payload
const payload = OAuth2Client.ticket.getPayload();
//get the userID
const userid = payload['sub'];

