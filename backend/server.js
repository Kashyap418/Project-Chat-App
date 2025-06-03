// const express=require('express');  
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import path from "path";

import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";

import connectToMongoDB from "./db/connectToMongoDB.js";
import { app, server } from "./socket/socket.js";

const PORT=process.env.PORT || 5000

dotenv.config();

const __dirname = path.resolve();

app.use(express.json()); 
// to parse the incoming request with JSON payloads (from req.body) 
//"Hey Express, if any incoming request has JSON data in the body, please parse it and make it available in req.body
//💥 Without express.json(): req.body will be undefined & Express won't know how to read the JSON body.
//✅ With express.json(): Express will automatically parse the JSON string and convert it to a JavaScript object.


app.use(cookieParser()); // Parses cookies attached to the client request.

app.use('/api/auth',authRoutes); //authRoutes is an Express router, defined in routes/auth.routes.js:
app.use('/api/messages',messageRoutes);  
app.use('/api/users',userRoutes);
// Above 3 are Route Middlewares which also contain middleware in them 

app.use(express.static(path.join(__dirname, '/frontend/dist' ))); // -> middleware-serves static frontend files (HTML, CSS, JS, etc.) from the dist folder.

app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname,"frontend","dist","index.html"));
});

server.listen(PORT,()=>{
    connectToMongoDB();
    console.log(`Server Running on Port: ${PORT}`);
})