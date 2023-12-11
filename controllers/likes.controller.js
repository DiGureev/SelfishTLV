import {alllikes, userlike, addlike, minusLikes} from '../models/likes.model.js'

export const _alllikes = async (req,res) => {
    const tourid = req.params.id
    try{
        const row = await alllikes(tourid)
        res.json(row)
        
    }catch(e){
        console.log(e)
        res.status(404).json({ msg: "Something went wrong with getting likes" });
    }
}

export const _userlike = async (req,res) => {
    const {userid, tourid} = req.body

    console.log('user',userid)
    console.log('tour',tourid)
    try{
        const row = await userlike(userid, tourid)
        res.json(row)
        
    }catch(e){
        console.log(e)
        res.status(404).json({ msg: "Something went wrong with getting user likes" });
    }
}

export const _addlike = async (req,res) => {
    const {userid, tourid} = req.body
    try{
        const row = await addlike(userid, tourid)
        res.json(row)
    }catch(e){
        console.log(e)
        res.status(404).json({ msg: "Something went wrong with getting user likes" });
    }
}

export const _minusLikes = async (req,res) => {
    const {userid, tourid} = req.body
    try{
        const row = await minusLikes(userid, tourid)
        res.json(row)
    }catch(e){
        console.log(e)
        res.status(404).json({ msg: "Something went wrong with getting user likes" });
    }
}