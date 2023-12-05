import { useParams, Link} from "react-router-dom";
import {useState, useEffect} from 'react';
import axios from "axios";

const UserPage = (params) => {
    const {id} = useParams();
    const [favorites, serFav] = useState([]);

    useEffect(()=>{
        getfav()
    }, []);
    
    const getfav = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/users/favorites/${id}`)
            serFav(response.data)
        }catch (e) {

        }
    };
    
    return (
        <>
        <h2>{id}</h2>
        {
            favorites.map((item,index)=>{
                let data = JSON.parse(item.tourinfo)
               return  <div key={index}>
                    <p>{data.tourname}</p>
                    <p>{data.time}</p>
                    <Link to={`/tours/${item.tourid}`}>Go to the Tour</Link>
                </div>
            })
        }
        </>
    )
}

export default UserPage