import {useState, useEffect} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import img from "../img/main.png";
import icon from "../img/icon.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import EventBlock from './EventBlock.js';


const Main = (props) => {
    const [tour, setData] = useState({});
    const [info, setInfo] = useState();
    const [like, setLike] = useState(null);

    useEffect(()=>{
        showData()
    },[]);

    const showData = async() => {
        try {
            const response = await axios.get("/api/tours/");
         
            let arr = response.data;
            let tour = arr[Math.floor(Math.random()*arr.length)];
            let info = JSON.parse(tour.tourinfo);

            const likeResponse = await axios.get(`/api/likes/${tour.tourid}`);
            setLike(likeResponse.data[0].count);
           
            setData(tour);
            setInfo(info);

        }catch (e) {
            console.log(e)
        }
    };

    if (info){
        return (
        <>
        <img src={img} className='backImg'/>
        <div className='container'>
            <div className='leadDivMain'>
            <h2>😮 Self-tour of the day</h2>
            <div className='MainTourCard'>
                <div className='icon'><img src={icon}/></div>
                <div>
                    <h3>{info.tourname}</h3>
                    <p style={{marginLeft:'0px'}}>{info.description}</p>
                    <Link to={`/alltours/${tour.tourid}`}>Go to the Tour</Link>
                    <p style={{textAlign:'right'}}><FontAwesomeIcon icon={faHeart}/> {like}</p>
                </div>
            </div>
            </div>
            <EventBlock/>
            <Link to={`/allevents`} >Go to all Events</Link>
        </div>
        </>
    )
    } else {
        return <div className='container'></div>
    }
};

export default Main;