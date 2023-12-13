import { useParams, Link} from "react-router-dom";
import {useState, useEffect, useContext} from 'react';
import axios from "axios";
import { AppContext } from "../App.js";
import emoji from '../img/wow.png';

const UserPage = (props) => {
    const {id} = useParams();
    const [favorites, setFav] = useState([]);
    const {username} = useContext(AppContext);
    const [display, setDisp] = useState('none');

    useEffect(()=>{
        getfav()
    }, []);
    
    const getfav = async () => {
        try {
            const response = await axios.get(`/api/users/favorites/${id}`)
            setFav(response.data)
            if (response.data.length === 0) {
                setDisp('')
            } else {
                setDisp('none')
            }
        }catch (e) {

        }
    };

    const delFav = async (tourid) => {
        try {
            const response = await axios.delete(`/api/users/favorites/${id}&${tourid}`)
            getfav()
        }catch (e) {
            console.log(e)
        }
    };
    
    return (
        <div className="container">
            <div className="leaddiv" style={{marginTop:'50px'}}>
                <div>
                    <h1>Hi, {username}!</h1>
                    <p style={{color: '#89A3F9'}}>This is your favorite routes!</p>
                </div>

                <div style={{textAlign:'right'}}>
                    <img src={emoji} style={{width:'60%'}}/>
                </div>
            </div>
                
            <div className="favContainer">
            {
            favorites && favorites.map((item,index)=>{
                    let data = JSON.parse(item.tourinfo)
                return  <div key={index} className="favCard">
                        <h4 style={{margin:'0px'}}>{data.tourname}</h4>
                        <p>{data.time}</p>
                        <Link to={`/alltours/${item.tourid}`}>Go to the Tour</Link>
                        <button onClick={()=>delFav(item.tourid)}>Not Favorite anymore</button>
                    </div>
                })
            }
            </div>

            <div className="noFavorites" style={{display: display}}>
                You will see your favorite tours here
            </div>
        </div>
    )
}

export default UserPage