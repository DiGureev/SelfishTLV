import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config()

export const token = async (req, res, next) => {

    let accesstoken = req.body.token; // doesn't work right
    // console.log(req.cookies.token)
    // let accesstoken = req.cookies.token
    // console.log(accesstoken)

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