import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";

import {
    getUserProfileController,
    getAllUserController, 
    createUserController,
    updateUserController,
    deleteUserController,
    LoginController
} from "./controller";

class Server {
    constructor(configuration) {
        this.app = express();
        this.configuration = configuration;
        this.connectDB = this.connectDB.bind(this);
    }

    route() {

        this.app.use(bodyParser())

        this.app.use(cors())

        this.app.use("/health-check", (req, res) => {
            res.send("Server is running..!");
        });
        // HTTP METHODS
        this.app.get("/users", getAllUserController);

        this.app.post("/add-user", createUserController);

        this.app.patch("/edit-user/:id", updateUserController);

        this.app.delete("/deactivate/:id", deleteUserController);

        this.app.get("/profile/:id", getUserProfileController);
        
        this.app.post("/Login",LoginController);
    }

    async connectDB() {
        try {
            const { configuration: { mongo } } = this;
            await mongoose.connect(mongo);
        } catch (err) {
            throw err
        }
    }

    run() {
        const { app, configuration: { port } } = this;
        const message = `| App is running on ${port} |`;
        const len = message.length;
       
        try {
            this.connectDB()
            app.listen(port, err => {
                if(err) {
                    console.log("error encountered");
                };
                console.log("~".repeat(len));
                console.log(message)
                console.log("~".repeat(len));
                
            })
        } catch(err) {
            console.log("error encountered")
        }
    }
};

export default Server;
