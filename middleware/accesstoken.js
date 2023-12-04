import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config()

export const token = async (req, res, next) => {
    let accesstoken = req.cookies.token;

    if (!accesstoken){
        return res.status(403).json({ msg:"Not verified"})
    }

    jwt.verify(accesstoken, process.env.ACCESS_TOKEN_SECRET, (err,decoded) => {
        if (err) {
            return res.status(403).json({ msg:"Not verified"})
        }
        next();
    })
}