import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from 'axios'

const Tour = (params)=>{
    const {id} = useParams()
    const [data, setData] = useState([])
    const [stops, setStops] = useState([])

    useEffect(()=>{
        getinfo()
    }, [])

    const getinfo = async() => {
        const response = await axios.get(`http://localhost:3001/tours/${id}`)
        setData(response.data)
        setStops(response.data.stops)
    }

    return (
        <>
        <h1>{data.tourname}</h1>
        <p>{data.time}</p>
       
        {
            stops.map((item,index)=>{
               return <div key={index}>
                    <h3>{item.name}</h3>
                    <p>{item.address}</p>
                    <p>{item.time}</p>
                </div>
            })
        }
        </>
    )
}

export default Tour