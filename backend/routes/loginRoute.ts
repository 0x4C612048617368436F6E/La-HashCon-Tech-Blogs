import express from 'express';
import { loginControllerGET,loginControllerPOST } from '../controller/loginController';
const router = express.Router();

router.route('/').get(loginControllerGET);
router.route('/').post(loginControllerPOST);

export default router;