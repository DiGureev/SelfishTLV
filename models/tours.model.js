import { db } from "../config/db.js";


//get tourinfo for the TourPage
export const gettour = (tourid) => {
    return db('tours').select("tourinfo").where({tourid});
};

//get all tours for the All tours page
export const getAllTours = () => {
    return db('tours').select("tourid","tourinfo");
};

//get main img
export const getMainImg = (tourid) => {
    return db('tours').select('mainimg').where({tourid});
};


