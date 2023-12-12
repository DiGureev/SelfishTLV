import axios from 'axios';
import {useState, useEffect} from 'react';
import TourCard from './TourCard.js';
import backimg from "../img/selftoursbackimg.png";

const AllTours = (props) => {
    const [data, setData] = useState([]);
    const [index1, setIndexOne] = useState(0);
    const [index2, setIndexTwo] = useState(4);
    
    const page = data.slice(index1,index2);

    useEffect(()=>{
        showData()
    },[]);

    const showData = async() => {
        try {
            const response = await axios.get("/api/tours")
            setData(response.data)

        }catch (e) {
            console.log(e)
        }
    };

    const nextPage= () => {
        if (index2 >= data.length) {
          
        } else {
             setIndexOne(index1+4);
            setIndexTwo(index2+4);
        
            return (
                <div>
                {page.map((item, index) => <TourCard  key={index} element={item}/>)}
                </div>
                )
        } 
    };

    const backPage= () => {
        if (index1 === 0) {
           
        } else {
            setIndexOne(index1-4);
            setIndexTwo(index2-4);

             return (
                <div>
                {page.map((item, index) => <TourCard  key={index} element={item}/>)}
                </div>
                )
        }
    };

    return (
        <div className='container'>
        <div className='leaddiv'>
            <div>
                <h1>Self-tours</h1>
                <p style={{color: '#89A3F9'}}>See for yourself and show your guests</p>
            </div>
            <img src={backimg} style={{width:'50%'}}/>
        </div>
        <div className='container'>
            {
            page.map((item, index) => <TourCard  key={index} element={item}/>)
            }
        </div>
        <div className='PrevNextButtons'>
            <button onClick={backPage}>Back</button>
            <button onClick={nextPage}>Next Page</button>
        </div>
        </div>
    )

}

export default AllTours