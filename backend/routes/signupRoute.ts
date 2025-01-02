import express from 'express';
import { signupControllerGET, signupControllerPOST } from '../controller/signupController';
const router = express.Router();

router.route('/').get(signupControllerGET);
router.route('/').post(signupControllerPOST);
export default router;