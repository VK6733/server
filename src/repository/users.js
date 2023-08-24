import userModel from "../model/schema.js";

const getAllUser = (payload = {}) => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await userModel.find(payload);
            resolve(response);
        } catch (error) {
            reject(error)
        }
    })
}

const getUser = async (id) => {
    return new Promise(async(resolve,reject)=>{
        try {
            const response = await userModel.find({ _id: id });
            resolve(response);
        } catch(error) {
            reject(error)
        }
    })
}

const createUser = async (payload) => {
    return new Promise(async (resolve, reject) => {
        try {
            await userModel.create(payload);
            resolve(true);
        } catch(error) {
            reject(error);
        }
    })
}

const updateUser = async (id, field, value) => {
    return new Promise(async (resolve, reject) => {
        try {
            await userModel.updateOne({ _id: id }, { [field]: value });
            resolve(true);
        } catch(error) {
            reject(error)
        }
    }) 
}

const deleteUser = async (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            await userModel.deleteOne({ _id: id });
            resolve(true);
        } catch(error) {
            reject(error)
        }
    })
}

const findUsers=async(payload)=>{
    return new Promise(async(resolve,reject)=>{
        try{
           const result= await userModel.find(payload);
            resolve(result);
        } catch(error)  {
            reject(error)}
          })
}


export { getAllUser, createUser, updateUser, deleteUser, getUser ,findUsers };