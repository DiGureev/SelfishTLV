import {useState, useEffect} from 'react'
import axios from 'axios';
import {Link} from 'react-router-dom'

const Main = (props) => {
    const [tour, setData] = useState({})
    const [info, setInfo] = useState()

    useEffect(()=>{
        showData()
    },[])

    const showData = async() => {
        try {
            const response = await axios.get("http://localhost:3001/tours/");
         
            let arr = response.data;
            let tour = arr[Math.floor(Math.random()*arr.length)];
            let info = JSON.parse(tour.tourinfo)
           
            setData(tour)
            setInfo(info)

        }catch (e) {
            console.log(e)
        }
    }

    if (info){
         return (
        <div className='container'>
            <h2>😮 Self-tour of the day</h2>
            <div>
                <h3>{info.tourname}</h3>
                <Link to={`/tours/${tour.tourid}`}>Go to the Tour</Link>
            </div>
        </div>
    )
    }
}

export default Main