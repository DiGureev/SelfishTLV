import { useState,useMemo, useCallback, useRef } from 'react';

import {
    useLoadScript,
    GoogleMap,
    Marker,
    DirectionsRenderer,
} from '@react-google-maps/api';

const google = window.google = window.google ? window.google : {}

const API_KEY = process.env.REACT_APP_API_KEY

const Maps = (props) => {
    const latlng = props.latlng;
    const mapRef = useRef()
    const [directions, setDir] = useState();
    const center = useMemo(()=> ({lat: 32.0853, lng: 34.7818}), []);

    const options = useMemo(()=> ({
        mapId: 'd46503c02ab29bed',
        disableDefaultUI: true,
        clickableIcons: false,
    }), []);


    const {isLoaded} = useLoadScript({
        googleMapsApiKey: API_KEY,
        libraries: ['places']
    });

    const onLoad = useCallback(map => mapRef.current = map, []);

    const fetchDirection = (item1, item2, index)=>{
        setDir({})
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
                console.log(result)
                setDir(result);
            }
        })
    };

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