import { db } from "../config/db.js";

//registration and login
export const register = (username, email, password) => {
    return db('users').insert({username, email, password},['username', 'email', 'password']);
};

export const login = (email) => {
    return db('users').select('userid', 'username', 'email', 'password').where({email});
};

//add and fetch refresh token to the data base
export const addToken = (token, userid) => {
    return db('users').update({refresh: token}).where({userid});
};

export const fetchRefresh = (userid) => {
    return db('users').select('userid','username','refresh').where({userid});
};

// add, get and delete user's favorites
export const addFavorite = async (userid, tourid) => {
    const row = await db('favorites').select('userid', 'tourid').where({userid, tourid});
    if (row.length === 0) {
        return db('favorites').insert({userid, tourid});
    }

    return row
};

export const getFavorite = (userid) => {
    return db('favorites').innerJoin('tours', 'favorites.tourid','tours.tourid')
    .select('tours.tourid', 'tours.tourinfo')
    .where({userid})
};

export const deleteFavorite = (userid, tourid) => {
    return db('favorites').where({userid, tourid}).del();
};