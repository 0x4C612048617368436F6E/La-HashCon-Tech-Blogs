"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const signupController_1 = require("../controller/signupController");
const router = express_1.default.Router();
router.route('/').get(signupController_1.signupControllerGET);
router.route('/').post(signupController_1.signupControllerPOST);
exports.default = router;
