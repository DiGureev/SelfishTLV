import { db } from "../config/db.js";

const date = new Date()

export const allEvents = () => {
    return db('allevents').select('id','title', 'date', 'link');
};

export const todayEvents = () => {
    return db('allevents').select('title', 'date', 'link').where({date});
};

export const tomorrowEvents = () => {
    const tomorrow = new Date(date)
    tomorrow.setDate(date.getDate()+1)

    return db('allevents').select('title', 'date', 'link').where({date: tomorrow});
};

export const weekEvents = (arr) => {
    return db('allevents').select('title', 'date', 'link').whereIn('date', arr).orderBy('date');
};
