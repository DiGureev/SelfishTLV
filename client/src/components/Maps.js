import { useState,useMemo, useCallback, useRef, useEffect } from 'react';

import {
    useLoadScript,
    GoogleMap,
    Marker,
    DirectionsRenderer,
} from '@react-google-maps/api'

const google = window.google

const Maps = (props) => {
    const latlng = props.latlng
    console.log(latlng)//doesnt work
    // const [latlng, setLL] = useState([]) //still can't see the markers
    const mapRef = useRef()
    const [directions, setDir] = useState();
    const center = useMemo(()=> ({lat: 32.0853, lng: 34.7818}), []);
    const options = useMemo(()=> ({
        mapId: 'd46503c02ab29bed',
        disableDefaultUI: true,
        clickableIcons: false,
    }), []);


    const {isLoaded} = useLoadScript({
        googleMapsApiKey: '',
        libraries: ['places']
    })

    const onLoad = useCallback(map => mapRef.current = map, [])

    const fetchDirection = (item1, item2, index)=>{
        console.log(item1)
        console.log(item2)
        if (!item2) {
            item2 = latlng[index-1]
        };

        const service = new google.maps.DirectionsService();

        service.route({
            origin: item1,
            destination: item2,
            travelMode: google.maps.TravelMode.WALKING
        }, (result, status) => {
            if (status === 'OK' && result){
                setDir(result);
            }
        })

    }

    if (!isLoaded) return <div>Loading...</div>

    return (
        <div>
            <GoogleMap zoom={10} center={center} onLoad={onLoad} options={options} mapContainerClassName='map-container'>
                {directions && <DirectionsRenderer directions={directions} />}
                {
                    latlng.map((item, index) => <Marker key={index} position={item} onClick={()=>fetchDirection(item, latlng[index+1], index)}/>)
                }
                
            </GoogleMap>
        </div>
    
        )
}

export default Maps