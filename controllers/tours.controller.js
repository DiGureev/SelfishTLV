import {gettour, getAllTours} from "../models/tours.model.js";

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
        console.log(row)
    }catch(e){
        console.log(e)
        res.status(404).json({ msg: "Something went wrong with getting tour" });
    }

}