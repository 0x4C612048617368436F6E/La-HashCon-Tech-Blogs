"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authGoogleController_1 = __importDefault(require("../controller/authGoogleController"));
const router = express_1.default.Router();
router.get('/', authGoogleController_1.default);
exports.default = router;
