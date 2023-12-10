import {useState, useEffect} from 'react';
import axios from 'axios';
import EventsCard from './EventsCard.js';

const EventsPage = (props)=>{
    const [events, setEvents] = useState([])

    useEffect(()=>{
        getAllEvents()

    }, [])


    const getAllEvents = async() => {
        try {
            const response = await axios.get("http://localhost:3001/events/")
            setEvents(response.data)
        }catch (e) {
            console.log(e)
        }
    }

    const getToday = async() => {
        try {
            const response = await axios.get("http://localhost:3001/events/today")
            setEvents(response.data)
        }catch (e) {
            console.log(e)
        }
    }

    const getTomorrow = async() => {
        try {
            const response = await axios.get("http://localhost:3001/events/tomorrow")
            setEvents(response.data)
        }catch (e) {
            console.log(e)
        }
    }

    const getWeek = async() => {
        try {
            const response = await axios.get("http://localhost:3001/events/week")
            setEvents(response.data)
        }catch (e) {
            console.log(e)
        }
    }


    const handleSelect = (e) => {
        const value = e.target.value
        console.log(value)
        if (value === 'today') {
            getToday()
        } else if (value === 'tomorrow'){
            getTomorrow()
        } else if (value === 'week') {
            getWeek()
        } else {
            getAllEvents()
        }


    }

    return (
        <div className='container'>
        <div className='eventSelect'>
            <select onChange={(e)=>handleSelect(e)}>
                <option value='All'>All</option>
                <option value='today'>Today</option>
                <option value='tomorrow'>Tomorrow</option>
                <option value='week'>This Week</option>
            </select>
        </div>
        <div className='eventsBlock'>
        {
                events.map(( item, index) => {
                    return <EventsCard key={index} item={item}/>
                })
            }
        </div>
        </div>
    )

}   

export default EventsPage
