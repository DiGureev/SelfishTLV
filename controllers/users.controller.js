import { register, login, getusername, addFavorite, getFavorite, deleteFavorite } from "../models/users.model.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const _register = async (req, res) => {
    console.log(req.body)
    const { username, email, password } = req.body;
  
    const loweremail = email.toLowerCase();
  
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password + "", salt);
  
    try {
      const row = await register(username, loweremail, hash);
      res.json(row);
    } catch (e) {
      console.log("_register=>", e);
      res.status(404).json({ msg: "Email allready exist" });
    }
  };

export const _login = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      const row = await login(email.toLowerCase());
      
      if (row.length === 0)
        return res.status(404).json({ msg: "Email not found, please Sign Up" });
  
      const match = bcrypt.compareSync(password + "", row[0].password);
      if (!match) return res.status(404).json({ msg: "Wrong password" });
  
      const userid = row[0].userid;
      const username = row[0].username;
      const useremail = row[0].email;

      const secret = process.env.ACCESS_TOKEN_SECRET

      const accesstoken = jwt.sign({ userid, useremail }, secret, {
            expiresIn: "60s",
      });
      
      res.cookie('accesstoken', accesstoken, {
        httpOnly:true,
        maxAge: 60 * 1000
      })

      res.json({ accesstoken,  userid, username});
        } catch (e) {
          console.log(e);
          res.status(404).json({ msg: "Something went wrong with token" });
        }
};

export const _getusername = async (req,res) => {
    const userID = req.params.id
    try{
        const row = await getusername(userID)
        res.json(row)
    }catch(e){
        console.log(e)
        res.status(404).json({ msg: "Something went wrong with getting username" });
    }

}


export const _addFavorite = async (req,res) => {
  const {userid, tourid} = req.body
  try{
      const row = await addFavorite(userid, tourid)
      res.sendStatus(200)

  }catch(e){
      console.log(e)
      res.status(404).json({ msg: "Can't add to favorite" });
  }

}

export const _getFavorite = async (req,res) => {
  const userid = req.params.id
  console.log(userid)
  try{
      const row = await getFavorite(userid)
      res.json(row)

  }catch(e){
      console.log(e)
      res.status(404).json({ msg: "Can't get favorites" });
  }

}

export const _deleteFavorite = async (req,res) => {
  const {userid, tourid} = req.params
  console.log(userid)
  console.log(tourid)
  try{
      const row = await deleteFavorite(userid, tourid)
      res.sendStatus(200)
  }catch(e){
      console.log(e)
      res.status(404).json({ msg: "Can't delete favorites" });
  }

}