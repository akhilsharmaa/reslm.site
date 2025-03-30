const jwt = require("jsonwebtoken");

// TODO: Change the JWT KEY TO ENV 
const JWTPRIVATEKEY = "12asdfasdfqa3r2323r23rfsd"

export const generateAuthToken = (id: number) => { 
    const token =  jwt.sign({ _id: String(id) }, JWTPRIVATEKEY).toString();;
    return token;  
};