import express from 'express';
import authGoogleRouteHandler from '../controller/authGoogleController'
const router = express.Router();

router.get('/',authGoogleRouteHandler);

export default router;