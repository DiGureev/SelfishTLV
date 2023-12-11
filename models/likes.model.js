import { db } from "../config/db.js";


export const alllikes = (tourid) => {
    return db('likes').count('tourid').where({tourid});
};

export const userlike = (userid, tourid) => {
    return db('likes').select('userid','tourid').where({userid, tourid})
};

export const addlike = (userid, tourid) => {
    return db('likes').insert({userid, tourid})
    // return db('likes').count('tourid').where({tourid})
};

export const minusLikes = (userid, tourid) => {
    return db('likes').where({userid, tourid}).del();
}