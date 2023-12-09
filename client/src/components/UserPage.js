import { useParams, Link} from "react-router-dom";
import {useState, useEffect, useContext} from 'react';
import axios from "axios";
import { AppContext } from "../App.js";
import emoji from '../img/wow.png'

const UserPage = (props) => {
    const {id} = useParams();
    const [favorites, setFav] = useState([]);
    const {username} = useContext(AppContext)
    const [display, setDisp] = useState(false);

    useEffect(()=>{
        getfav()
        if (favorites.length === 0) {
            setDisp(true)
        } else {
            setDisp(false)
        }
    }, []);
    
    const getfav = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/users/favorites/${id}`)
            setFav(response.data)
            console.log(favorites.length)
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
        <div className="container">
        <div className="leaddiv" style={{marginTop:'50px'}}>
            <div>
                <h1>Hi, {username}!</h1>
                <p style={{color: '#89A3F9'}}>This is your favorite routes!</p>
            </div>
            <div>
                <img src={emoji} style={{width:'60%'}}/>
            </div>
        </div>
            
        <div className="favContainer">
        {
            favorites.map((item,index)=>{
                let data = JSON.parse(item.tourinfo)
               return  <div key={index} className="favCard">
                    <h4 style={{margin:'0px'}}>{data.tourname}</h4>
                    <p>{data.time}</p>
                    <Link to={`/tours/${item.tourid}`}>Go to the Tour</Link>
                    <button onClick={()=>delFav(item.tourid)}>Not Favorite anymore</button>
                </div>
            })
        }
        </div>

        </div>
    )
}

export default UserPage