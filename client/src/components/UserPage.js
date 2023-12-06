import { useParams, Link} from "react-router-dom";
import {useState, useEffect} from 'react';
import axios from "axios";

const UserPage = (params) => {
    const {id} = useParams();
    const [favorites, setFav] = useState([]);

    useEffect(()=>{
        getfav()
    }, []);
    
    const getfav = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/users/favorites/${id}`)
            setFav(response.data)
        }catch (e) {

        }
    };

    const delFav = async (tourid) => {
        try {
            const response = await axios.delete(`http://localhost:3001/users/favorites/${id}&${tourid}`)
            getfav()
        }catch (e) {
            console.log(e)
        }
    }
    
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
                    <button onClick={()=>delFav(item.tourid)}>Del from Fav</button>
                </div>
            })
        }
        </>
    )
}

export default UserPage