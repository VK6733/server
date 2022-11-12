import dotenv from "dotenv";

dotenv.config();

const configuration = {
    port: process.env.PORT,
    mongo: process.env.MONGODB
};

export default configuration;
