import React, {useState, useEffect} from 'react';
import './Map.scss'
import {WardType, Item, VIETNAM_BOUNDS, ICON} from './MapConstants'
import {
    withGoogleMap,
    GoogleMap,
    Marker, InfoWindow, Polygon,
} from "react-google-maps";
import {Card, Checkbox} from "antd";

function MapConponent() {
    const [markerSelected, setMarkerSelected] = useState();
    const [isOpen, setIsOpen] = useState(false)
    const GOOGLE_API_KEY = 'AIzaSyARz_HOqiVeOPfFClTE5W2A1EMz6S6IL1w';
    const defaultCenter = {lat: 19.942883067405628, lng: 105.59371472442866};
    const [findType, setFindType] = useState([]);

    useEffect(() => {
        loadDataComponent();
    }, []);

    async function loadDataComponent() {
        let arr = WardType.map(x => x._id);
        setFindType(arr);
    }

    async function handleChangeCheckbox(id) {
        console.log(id)
        console.log(findType.includes(id))
        if(findType.includes(id) === true) {
            let arr = [...findType];
            arr.splice(arr.indexOf(id), 1);
            setFindType(arr);
        }
        else {
            setFindType([...findType,id]);
        }
    }
    function handleClickMarker(item) {
        if (markerSelected && (item.lat === markerSelected.lat && item.lng === markerSelected.lat)) {
            setIsOpen(!isOpen)
        } else
            setMarkerSelected({lat: item.lat, lng: item.lng})
        setIsOpen(true)
    }

    function handleToggleClose(item) {
        setIsOpen(false)
    }

    const MapWithAMarker = withGoogleMap(props =>
        <GoogleMap
            className='map-cp'
            defaultZoom={10.5}
            defaultCenter={defaultCenter}
            defaultOptions={{
                restriction: {
                    latLngBounds: VIETNAM_BOUNDS,
                },
                streetViewControl: false,
                mapTypeControl: false,
                minZoom: 8,
                maxZoom: 20,
                gestureHandling: 'greedy'
            }}
        >
            <Polygon
                // paths={[OUTSIDE, polygon]}
                options={{
                    strokeOpacity: 0,
                    fillColor: '#ffffff',
                    fillOpacity: 1,
                    zIndex: 0,
                }}
                onClick={() => null}
            />
            {Item && Item.map((item, key) => {
                return (
                    <>
                    {findType.includes(item.wardId) && <Marker
                        key={key}
                        icon={item.wardId === '111' ? ICON.HOME_ICON : item.wardId === '222' ? ICON.MEDICAL : ICON.HOME_PATIENT}
                        position={{lat: parseFloat(item.lat), lng: parseFloat(item.lng)}}
                        onClick={() => handleClickMarker(item)}
                    >
                        {isOpen && item.lat === markerSelected.lat && item.lng === markerSelected.lng &&
                        <InfoWindow
                            onCloseClick={() => handleToggleClose()}
                            // position={{lat: parseFloat(item.lat), lng: parseFloat(item.lng)}}
                        >
                            <div className="info-window">
                                <p className='mr-1'>_id: {item._id} </p>
                                <p>Vị trí: {item.address}</p><br/>
                                <p>lat: {item.lat}</p><br/>
                                <p>lng: {item.lng}</p><br/>
                            </div>
                        </InfoWindow>}
                    </Marker>}
                    </>
                )
            })}
        </GoogleMap>
    );
    return (
        <>
            <div className='map-cp' style={{height: '100vh', width: '100%'}}>
                <MapWithAMarker
                    containerElement={<div style={{height: `100vh`}}/>}
                    mapElement={<div style={{height: `100%`}}/>}
                />
            </div>
            <div className='ward-cp site-card-border-less-wrapper'>
                <Card bordered={true}>
                    {WardType && WardType.map((item, key) => {
                        return (
                            <p key={key}>
                                <Checkbox checked={findType.includes(item._id)} onChange={() => handleChangeCheckbox(item._id)}>{item.name}</Checkbox>
                            </p>
                        )
                    })}
                </Card>
            </div>
        </>
    );
}

export default React.memo(MapConponent)
