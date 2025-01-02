"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//will defiine the home route here
const express_1 = __importDefault(require("express"));
const homeController_1 = __importDefault(require("../controller/homeController"));
const router = express_1.default.Router();
//router.route('/').get(homeController);
router.get('/', homeController_1.default);
exports.default = router;
