import jwt from "jsonwebtoken";

import configuration from "../src/configuration";

export const generateToken = (payload) => {
    return new Promise(async (resolve, reject) => {
        try {
            const token = await jwt.sign(payload, configuration.private_key)
            resolve(token)
        } catch (error) {
            reject(error)
        }
    })
}