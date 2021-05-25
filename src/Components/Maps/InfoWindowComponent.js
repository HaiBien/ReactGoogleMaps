import React from 'react';
import { InfoWindow, Marker } from 'react-google-maps';
import { Link } from 'react-router-dom';


export default function WindowInfoComponent(props) {
  const { value, markerSelected } = props;
  if (!markerSelected) return null;
  return <>
    { props.isOpen &&
      <InfoWindow
        onCloseClick={() => props.closeInfo()}
      >
        <div className='place__info' style={{ width: '200px' }}>
              <p>{value._id}</p>
              <p>{value.address}</p>
        </div>
      </InfoWindow>}
  </>;
}