import bcrpyt from "bcrypt";

import configuration from "../src/configuration";

export const generatePassword = async (password) => {
    const en = await bcrpyt.hash(password, parseInt(configuration.salt));
    return en;
};

export const verifyPassword = async (plainText, hash) => {
    const rs = await bcrpyt.compare(plainText, hash);
    return rs;
};
