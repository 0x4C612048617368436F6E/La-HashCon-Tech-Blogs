//creating refresh token to refresh access token
const OAuth2Client = require('google-auth-library');
const https = require("https");

const Oauth2Client = new OAuth2Client.OAuth2Client(
    process.env.GOOGLE_GENERATED_CLIENTID,
    process.env.GOOGLE_GENERATED_SECRETE
)

//set referesh token based on previous authorization
Oauth2Client.setCredentials({refresh_token:REFRESH_TOKEN})

//https://expertbeacon.com/authenticating-users-with-the-google-auth-library-for-node-js/

//https://cloud.google.com/nodejs/docs/reference/google-auth-library/latest