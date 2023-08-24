import dotenv from "dotenv";

dotenv.config();

const configuration = {
    port: process.env.PORT,
    mongo: process.env.MONGODB,
    salt: process.env.SALT,
    private_key: process.env.PRIVATE_KEY,
};

export default configuration;
