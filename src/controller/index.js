import { 
    getUser,
    getAllUser,
    createUser,
    updateUser,
    deleteUser,
    findUsers
} from "../repository/users.js";

import { generatePassword, verifyPassword } from "../../lib/encryption.js";
import { validateEmail } from "../../lib/validateEmail.js";
import { generateToken } from "../../lib/token.js";

export const getUserProfileController = async (req, res, next) => {
    try {
        const { params: { id } } = req;
        const response = await getUser(id);
        res.status(200).json({
            status: 200,
            data: response,
            message: "User fetched sucessfully"
        })
    } catch(error) {
        next(error);
    }
}

export const getAllUserController = async (req, res, next) => {
    try {
        const { query } = req;
        const { search } = query

        let payload;

        if (search) {
            payload = {
                name: new RegExp(search)
            }
        }

        const response = payload ? await getAllUser(payload) : await getAllUser();
        res.status(200).json({
            status: 200,
            data: response,
            message: "User fetched successfully"
        });
    } catch (error) {
        next(error);
    }
};

export const createUserController = async (req, res, next) => {
    try {
        const { body } = req;
        const { name, email, password, role } = body;
        const encryptPassword = await generatePassword(password);
        const isValidEmail = validateEmail(email);
        if (!isValidEmail) {
            return res.status(200).json({ status: 400, message: "Invalid email" })
        }

        const user = await findUsers({email});

        if (user.length) {
            return res.status(200).json({ status: 400, message: "email already exists " })
        }
        
    
        await createUser({ name, email, password: encryptPassword, role });
        res.status(200).json({ 
            status: 200,
            message: `new user ${name} is created`
        });
    } catch (error) {
        next(error);
    }
}

export const updateUserController = async (req, res, next) => {
    try {
        const { params, body } = req;
        const { field, value } = body;
        const { id } = params;

        await updateUser(id, field, value);
        res.status(200).json({ 
            status: 200,
            message: `${field} changed successfully`
        });
    } catch (error) {
        next(error)
    }
}
export const deleteUserController = async (req, res, next) => {
    try {
        const { params } = req;
        const { id } = params;
        await deleteUser(id);
        res.status(200).json({ 
            status: 200,
            message: "account deleted successfully"
        });
    } catch (error) {
        next(error)
    }
}
export const LoginController= async(req,res,next)=>{
    try{
        const { body }=req;
        const { email ,password}=body;

        const user = await findUsers({ email });
        if (user.length === 0) {
            return res.status(200).json({
                status: 400,
                message: "Invalid email/password"
            });
        }

        const isValid = await verifyPassword(password, user[0].password);

        if (!isValid) {
            return res.status(200).json({
                status: 400,
                message: "Invalid email/password"
            });
        }
        const payload = { 
            email: user[0].email,
            role: user[0].role,
            id: user[0].id
        }
        const token = await generateToken(payload);
        res.status(200).json({
            status:200,
            data: { token }
        });
    } catch (error){
        next(error)
    }
}