import express from "express";
import mongoose from "mongoose";

class Server {
    constructor(configuration) {
        this.app = express();
        this.configuration = configuration;
        this.connectDB = this.connectDB.bind(this);
    }

    route() {
        this.app.use("/health-check", (req, res) => {
            res.send("Server is running..!");
        });
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
