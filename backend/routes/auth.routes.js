import express from "express";

import { signup,login,logout } from "../controllers/auth.controller.js";

const router = express.Router(); 

router.post("/signup",signup);
router.post("/login",login);
router.post("/logout",logout);
//Each line here connects a specific HTTP POST request to a controller function (like signup, login, etc.)
//the router itself (router) is a middleware->	Express Router
//The controller functions (signup, login, logout) are also middleware functions because they 
//receive (req, res, next) and can handle the request or call next() to pass control.


export default router;