import { db } from "../config/db.js";

export const gettour = (tourid) => {
    return db('tours').select("tourinfo").where({tourid});
}

export const getAllTours = () => {
    return db('tours').select("tourid","tourinfo");
}