import axios from 'axios';
import {useState, useEffect} from 'react';
import TourCard from './TourCard.js';


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
        <>
        <h1>Self-tours</h1>
        <p>See for yourself and show your guests</p>
        <div>
            {
                data.map(item => <TourCard element={item}/>)
            }
        </div>
        </>
    )

}

export default AllTours