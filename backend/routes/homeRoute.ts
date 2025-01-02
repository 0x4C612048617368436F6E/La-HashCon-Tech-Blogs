//will defiine the home route here
import express from 'express';
import homeController from '../controller/homeController';
const router = express.Router();

//router.route('/').get(homeController);
router.get('/',homeController);

export default router;