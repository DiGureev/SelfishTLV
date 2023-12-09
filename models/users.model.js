import { db } from "../config/db.js";

export const register = (username, email, password) => {
    return db('users').insert({username, email, password},['username', 'email', 'password']);
};

export const login = (email) => {
    return db('users').select('userid', 'username', 'email', 'password').where({email});
};

// export const getusername = (userid => {
//     return db('users').select('username').where({userid});
// })

export const addFavorite = (userid, tourid) => {
    return db('favorites').insert({userid, tourid});
};

export const getFavorite = (userid) => {
    return db('favorites').innerJoin('tours', 'favorites.tourid','tours.tourid')
    .select('tours.tourid', 'tours.tourinfo')
    .where({userid})
};

export const deleteFavorite = (userid, tourid) => {
    return db('favorites').where({userid, tourid}).del();
};