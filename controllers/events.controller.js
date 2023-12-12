import {allEvents, todayEvents, tomorrowEvents, weekEvents} from '../models/events.model.js';


export const _allEvents = async (req,res) => {
    try{
        const row = await allEvents()
        res.json(row)
    }catch(e){
        console.log(e)
        res.status(404).json({ msg: "Something went wrong with getting events" });
    }

};

export const _todayEvents = async (req,res) => {
    try{
        const row = await todayEvents()
        res.json(row)
    }catch(e){
        console.log(e)
        res.status(404).json({ msg: "Something went wrong with getting today's events" });
    }
};

export const _tomorrowEvents = async (req,res) => {
    try{
        const row = await tomorrowEvents()
        res.json(row)
    }catch(e){
        console.log(e)
        res.status(404).json({ msg: "Something went wrong with getting tomorrow's events" });
    }

};

export const _weekEvents = async (req,res) => {
    const date = new Date()
    date.setDate(date.getDate()+1)
    const weekDays = [];     
    weekDays.push(new Date(date.setDate(date.getDate())).toISOString().slice(0, 10))
    for (let i = 0; i <= 6; i++) {
      let first = date.getDate()
      let day = new Date(date.setDate(first + 1)).toISOString().slice(0, 10)
      weekDays.push(day)
    }

    try{
        const row = await weekEvents(weekDays)
        res.json(row)
    }catch(e){
        console.log(e)
        res.status(404).json({ msg: "Something went wrong with getting week's events" });
    }

};