import {gettour, getAllTours,updateLikes,getLikes, getMainImg} from "../models/tours.model.js";

export const _gettour = async (req,res) => {
    const id = req.params.id
    try{
        const row = await gettour(id)
        const data = JSON.parse(row[0].tourinfo)
        res.json(data)
        
    }catch(e){
        console.log(e)
        res.status(404).json({ msg: "Something went wrong with getting tour" });
    }

}

export const _getAllTours = async (req,res) => {
    try{
        const row = await getAllTours()
        res.json(row)
    }catch(e){
        console.log(e)
        res.status(404).json({ msg: "Something went wrong with getting tour" });
    }

}

export const _updateLikes = async (req,res) => {
    const tourid = req.params.id
    const {likes} = req.body
    console.log(likes)
    try{
        const row = await updateLikes(tourid, likes)
        res.json(row)
    }catch(e){
        console.log(e)
        res.status(404).json({ msg: "Something went wrong with update tour" });
    }

}

export const _getLikes = async (req,res) => {
    const tourid = req.params.id
    console.log(tourid)
    try{
        const row = await getLikes(tourid)
        res.json(row)
        
    }catch(e){
        console.log(e)
        res.status(404).json({ msg: "Something went wrong with getting likes" });
    }

}

export const _getMainImg = async (req,res) => {
    const tourid = req.params.id
    console.log(tourid)
    try{
        const row = await getMainImg(tourid)
        res.json(row)
        
    }catch(e){
        console.log(e)
        res.status(404).json({ msg: "Something went wrong with getting likes" });
    }

}