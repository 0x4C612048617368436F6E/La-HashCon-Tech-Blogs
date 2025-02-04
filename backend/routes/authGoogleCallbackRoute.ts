import express from 'express';
import authGoogleCallbackRouteHandler from '../controller/authGoogleCallbackController'
const route = express.Router();
route.get('/',authGoogleCallbackRouteHandler)

export default route;