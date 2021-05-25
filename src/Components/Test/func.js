import React, {useState} from 'react';
import InfoWindowComponent from "../Maps/InfoWindowComponent";
import {WardType, Item, VIETNAM_BOUNDS} from '../Maps/MapConstants'
import {
    withScriptjs,
    withGoogleMap,
    InfoWindow,
    GoogleMap,
    Marker,
} from "react-google-maps";

function Func() {
    const defaultCenter = {lat: 19.942883067405628, lng: 105.59371472442866};
    const [markerSelected, setMarkerSelected] = useState()
    const [isOpen, setIsOpen] = useState(false)

    async function handleClickMarker(item) {
        await setMarkerSelected({lat: item.lat, lng: item.lng})
        setIsOpen(true);
    }

    function handleToggleClose() {
        setIsOpen(false);
    }

    const MapWithAMarker = withScriptjs(withGoogleMap(props =>
        <GoogleMap
            defaultZoom={10}
            defaultCenter={defaultCenter}
        >
            {Item && Item.map((item, key) => {
                return (
                    <Marker
                        key={key}
                        position={{lat: parseFloat(item.lat), lng: parseFloat(item.lng)}}
                        onClick={() => handleClickMarker(item)}
                    >
                        <InfoWindowComponent value={item} markerSelected={markerSelected} isOpen={isOpen}/>

                    </Marker>
                )
            })}


        </GoogleMap>
    ));

    return (
        <MapWithAMarker
            googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyARz_HOqiVeOPfFClTE5W2A1EMz6S6IL1w&v=3.exp&libraries=geometry,drawing,places"
            loadingElement={<div style={{height: `100%`}}/>}
            containerElement={<div style={{height: `100vh`}}/>}
            mapElement={<div style={{height: `100%`}}/>}
        />
    );
}

export default React.memo(Func)
