import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config()

export const token = async (req, res, next) => {
    console.log(req.cookies.accesstoken)
    // const token = req.cookies.accesstoken || req.headers['x-access-token']
    // console.log(token)

    let token = req.body.token; // doesn't work right
    // console.log(req.cookies.token)
    // let accesstoken = req.cookies.token
    // console.log(accesstoken)

    if(!token) return res.status(401).json({msg:'No token'})

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if(err) return res.status(403).json({msg:'Not authorized'})
    // const id = decoded.userid;
    // req.userid = id
    
    next();
  })
}