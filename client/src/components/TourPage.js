import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from 'axios'

const Tour = (params)=>{
    const {id} = useParams()
    const [data, setData] = useState([])
    const [stops, setStops] = useState([])
    const [rest, setRest] = useState({})
    const [likes, setLikes] = useState(null)
    const [liked, setLiked] = useState(false)

    useEffect(()=>{
        getinfo()
        getLikes()
    }, [])

    const getinfo = async() => {
        const response = await axios.get(`http://localhost:3001/tours/${id}`)
        setData(response.data)
        setStops(response.data.stops)
        setRest(response.data.eat)
    
    }

    const getLikes = async() => {
        const response = await axios.get(`http://localhost:3001/tours/likes/${id}`)
        setLikes(response.data[0].likes)
    }

    const updateLikes = async() => {
        if (!liked){
            const response = await axios.put(`http://localhost:3001/tours/${id}`, {likes: likes+1})
            setLikes(response.data[0].likes)
            setLiked(true)
        } else {
            const response = await axios.put(`http://localhost:3001/tours/${id}`, {likes: likes-1})
            setLikes(response.data[0].likes)
            setLiked(false)
        }
        
    }

    return (
        <>
        {/* <img src={data.mainimg}></img> not working*/}
        <h1>{data.tourname}</h1>
        <p>{data.time}</p>
        <p onClick={updateLikes}>Likes: {likes}</p>
        <p>{data.description}</p>
     
       
        {
            stops.map((item,index)=>{
               return <div key={index}>
                    <h2>{item.name}</h2>
                    <p>{item.description}</p>
                    <p>{item.address}</p>
                    <p>{item.time}</p>
                </div>
            })
        }

        <p>Hungry stop: {rest.name}</p>
        <p>{rest.address}</p>
        <img src={rest.img}></img>
        </>
    )
}

export default Tour