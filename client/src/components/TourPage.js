import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart , faBookmark} from '@fortawesome/free-solid-svg-icons';
import { AppContext } from "../App.js";
import Maps from "./Maps.js";

const Tour = (params)=>{
    const {userID} = useContext(AppContext)
    const {id} = useParams()
    const [data, setData] = useState([])
    const [stops, setStops] = useState([])
    const [rest, setRest] = useState({})
    const [likes, setLikes] = useState(null)
    const [mainimg, setImg] = useState('')
    const [liked, setLiked] = useState(false)
    const [visability, setVis] = useState('hidden')
    const navigate = useNavigate()

    let arr = []

    useEffect(()=>{
        getinfo()
        getLikes()
        getImg()

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

    const getImg = async() => {
        const response = await axios.get(`http://localhost:3001/tours/img/${id}`)
        setImg(response.data[0].mainimg)
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

    const addtoFav = async(id) => {
        if (userID === '') {
            navigate('/login')
        } else {
            try {
            const response = await axios.post("http://localhost:3001/users/favorites", {userid: userID, tourid: id})
           if (response.status===200){
            setVis('')
            setTimeout(()=>{
                setVis('hidden')
            },1000)
           }

        }catch (e) {
            console.log(e)
        }
        }
    }

    return (
        <div className="container">
            <div style={{display:'flex', justifyContent:'space-between', marginTop:'30px', height: '30px'}}>
                <div onClick={()=>addtoFav(data.tourid)} style={{cursor:'pointer'}}><FontAwesomeIcon icon={faBookmark}/><span style={{color:'#FF93ED', fontWeight:'500', marginLeft:'10px'}}>Add to favorite</span>
                    <p style={{visibility: visability}}>Added</p></div>
               <div><FontAwesomeIcon icon={faHeart} onClick={updateLikes}/> {likes}</div> 
            </div>

            <div style={{textAlign:'center'}}>
                <h1>{data.tourname}</h1>
                <p style={{fontWeight:'700'}}>Approximate time: {data.time}</p>
            </div>

        <div style={{display:'flex', width: '100%'}}>
        <div className="infoCard" >
            <h4>Route 🚌</h4>
            <p style={{color:'#FF6E07', fontWeight:'700'}}>You are starting from:</p>
            {
                stops.map((item,index)=>{
                    arr.push(item.latlang)
                    return <div key={index}>
                         <a href={item.address}><h5>{item.name}</h5></a>
                         <p>Walk: {item.time}</p>
                        
                     </div>
                 })
            }
            <h5 style={{color:'#7E6EEF'}}>Hungry stop: <a href={rest.address}>{rest.name}</a></h5>
            <p style={{color:'#7E6EEF'}}>40 minutes for the good meal</p>
            
        </div>

        <div className="tourInfo" style={{width: '80%'}}>
        <img src={mainimg} style={{width: '100%'}}></img>        
        <p>{data.description}</p>
     
       
        {
            stops.map((item,index)=>{
               return <div key={index}>
                    <h2>{item.name}</h2>
                    <p>{item.description}</p>
                </div>
            })
        }
        <div className="hungryCard">
        <h2>Where you will be eating?</h2>
        <h3>{rest.name}</h3>
        <img src={rest.img} style={{width: '100%'}}></img>
        </div>

        <Maps latlng={arr}/>

        </div>
        </div>
        </div>
        
    )
}

export default Tour