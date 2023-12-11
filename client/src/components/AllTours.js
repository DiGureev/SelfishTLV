import axios from 'axios';
import {useState, useEffect} from 'react';
import TourCard from './TourCard.js';
import backimg from "../img/selftoursbackimg.png"



const AllTours = (props) => {
    const [data, setData] = useState([])

    useEffect(()=>{
        showData()
    },[])

    const showData = async() => {
        try {
            const response = await axios.get("http://localhost:3001/tours")
            setData(response.data)

        }catch (e) {
            console.log(e)
        }
    }

    return (
        <div className='container'>
        <div className='leaddiv'>
            <div>
                <h1>Self-tours</h1>
                <p style={{color: '#89A3F9'}}>See for yourself and show your guests</p>
            </div>
            <img src={backimg} style={{width:'50%'}}/>
        </div>
        <div>

            {
                data.map((item, index) => <TourCard  key={index} element={item}/>)
            }

        </div>
        </div>
    )

}

export default AllTours