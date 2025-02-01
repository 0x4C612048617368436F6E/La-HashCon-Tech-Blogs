"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginControllerPOST = exports.loginControllerGET = void 0;
const UserModel_1 = __importDefault(require("../model/UserModel"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const loginControllerGET = (req, res) => {
    //Now we will focus more on this later, but lets just return a status code
    const message = {
        message: "Welcome to the  Login Page"
    };
    res.status(200);
    console.log(message);
    return res.json(message);
};
exports.loginControllerGET = loginControllerGET;
const loginControllerPOST = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    //This part is going to contain a lot
    //First get the inputs from the user
    console.log("In Login Route");
    const Email = req.body.Email;
    const Password = req.body.Password;
    //Make sure these are not empty
    if (Email == "" || Email == undefined || Password == "" || Password == undefined) {
        //can not have empty fields
        const message = {
            message: "Can not leave any fields empty"
        };
        res.status(400);
        return res.json(message);
    }
    try {
        //if above is go continue. We will check wheter the credentials are correct
        let doesUserExist = yield UserModel_1.default.findOne({ "userInfo.Email": Email });
        //now lets check that the password entered is the same as the one stored in the dabase
        if (!doesUserExist) {
            const message = {
                message: "Credentials entered are incorrect. Please enter your email and password"
            };
            res.status(400);
            return res.json(message);
        }
        //otherwise the credentails entereated are correct. Lets test the password
        let isPasswordAMatch = yield bcrypt_1.default.compare(Password, doesUserExist.userInfo.Password);
        if (isPasswordAMatch) {
            //password is matched, so user is authorised
            //we will create our JWT ACCESS and REFRESH tokens her
            const payload = {
                Email: doesUserExist.userInfo.Email, Role: doesUserExist.userInfo.userRole
            };
            let ACCESS_TOKEN = "";
            let REFRESH_TOKEN = "";
            if (process.env.ACCESS_TOKEN != undefined) {
                ACCESS_TOKEN = process.env.ACCESS_TOKEN;
            }
            if (process.env.REFRESH_TOKEN != undefined) {
                REFRESH_TOKEN = process.env.REFRESH_TOKEN;
            }
            const JWT_ACCESS_TOKEN = jsonwebtoken_1.default.sign(payload, ACCESS_TOKEN, { expiresIn: "30s" });
            //1000 = 1 milliseconds -> 30*1000 = 30 seconds
            const JWT_REFRESH_TOKEN = jsonwebtoken_1.default.sign(payload, REFRESH_TOKEN, { expiresIn: "60s" });
            //we will need to first update the user  which have logged in - their refresh-token
            const update = { "userInfo.refreshToken": JWT_REFRESH_TOKEN };
            let UpdatedRefreshToken = yield UserModel_1.default.findOneAndUpdate({ "userInfo.Email": Email }, update);
            console.log(UpdatedRefreshToken);
            //send the refreshtoek as cookie (http cookie)
            res.cookie("REFRESH_TOKEN", JWT_REFRESH_TOKEN, { maxage: "60s", httpOnly: true });
            //The message we want to send will include:
            //we will get user FullName and split it
            let userFullName = (((_a = UpdatedRefreshToken === null || UpdatedRefreshToken === void 0 ? void 0 : UpdatedRefreshToken.userInfo) === null || _a === void 0 ? void 0 : _a.FullName.split(' ')) != undefined) ? (_b = UpdatedRefreshToken === null || UpdatedRefreshToken === void 0 ? void 0 : UpdatedRefreshToken.userInfo) === null || _b === void 0 ? void 0 : _b.FullName.split(' ') : null;
            /*
             1.) First Name
             2.) Last Name
             3.) UserName
             4.) Gmail
             5.) JWT_ACCESS_TOKEN
            */
            const messagetoSend = {
                FirstName: (userFullName == null ? userFullName : userFullName[0]),
                LastName: (userFullName == null ? userFullName : userFullName[1]),
                UserName: (_c = UpdatedRefreshToken === null || UpdatedRefreshToken === void 0 ? void 0 : UpdatedRefreshToken.userInfo) === null || _c === void 0 ? void 0 : _c.Username,
                Email: (_d = UpdatedRefreshToken === null || UpdatedRefreshToken === void 0 ? void 0 : UpdatedRefreshToken.userInfo) === null || _d === void 0 ? void 0 : _d.Email,
                message: "Login Successfully",
                JWT_ACCESS_TOKEN: JWT_ACCESS_TOKEN
            };
            console.log("User Login: ", messagetoSend);
            //res.status(200);
            //send the accessToken and the remaining as JSON to the frontend
            return res.json(messagetoSend);
        }
        else {
            //tell users password do not match
            const message = {
                message: "The password you entered is incorrect"
            };
            res.status(400);
            return res.json(message);
        }
    }
    catch (err) {
        console.log(err);
    }
});
exports.loginControllerPOST = loginControllerPOST;
