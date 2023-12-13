import { db } from "../config/db.js";

export const gettour = (tourid) => {
    return db('tours').select("tourinfo").where({tourid});
};

export const getAllTours = () => {
    return db('tours').select("tourid","tourinfo");
};

export const getLikes = (tourid) => {
    return db('tours').select('likes').where({tourid});
};

export const getMainImg = (tourid) => {
    return db('tours').select('mainimg').where({tourid});
};


export const updateLikes = (tourid, likes) => {
    return db('tours').update({likes}, ['likes']).where({tourid});
};

