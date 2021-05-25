import React from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow, Polygon } from 'react-google-maps';
const { MarkerClusterer } = require('react-google-maps/lib/components/addons/MarkerClusterer');
import { compose, withProps, withHandlers, withStateHandlers } from 'recompose';
import {WardType, Item, VIETNAM_BOUNDS} from '../Maps/MapConstants';

const defaultCenter = {lat: 19.942883067405628, lng: 105.59371472442866};

const MapDashboard = compose(
  withProps({
    googleMapURL: 'https://maps.googleapis.com/maps/api/js?libraries=places&v=3.31&key=key=AIzaSyARz_HOqiVeOPfFClTE5W2A1EMz6S6IL1w&v=3.exp&libraries=geometry,drawing,places',
    loadingElement: <div style={{ height: `100%` }}/>,
    containerElement: <div style={{ height: `100vh` }}/>,
    mapElement: <div style={{ height: `100%` }}/>,
  }),
  withHandlers({
    onMarkerClustererClick: () => (markerClusterer) => {
      const clickedMarkers = markerClusterer.getMarkers();
    },
  }),
  withStateHandlers(() => ({
    isOpen: false,
  }), {
    onToggleOpen: ({ isOpen }) => () => ({
      isOpen: !isOpen,
    }),
  }),
  withScriptjs,
  withGoogleMap,
)(props =>
  <GoogleMap
    defaultZoom={10}
    defaultCenter={defaultCenter}
    defaultOptions={{
      streetViewControl: false,
      mapTypeControl: false,
      minZoom: 5,
      maxZoom: 20,
      gestureHandling: 'greedy'
    }}
  >
    <MarkerClusterer
      onClick={props.onMarkerClustererClick}
      averageCenter
      enableRetinaIcons
      gridSize={60}
    >
      {Item.map(marker => (
        <MapMarkerInfoWindow
          key={marker._id}
          onToggleOpen={props.onToggleOpen}
          marker={marker}
          isOpen={props.isOpen}
          settingRes={props.settingRes}
        />
      ))}
    </MarkerClusterer>
  </GoogleMap>,
);

class MapMarkerInfoWindow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
    };
    this.toggleInfo = this.toggleInfo.bind(this);
  }

  toggleInfo(id) {
    let { isOpen } = this.props;
    if (!isOpen) {
      this.setState({ id: id });
    } else {
      this.setState({ id: '' });
    }

    this.props.onToggleOpen();
  }

  render() {
    let { settingRes, marker, isOpen } = this.props;

    return <Marker
      key={marker._id}
      onClick={() => this.toggleInfo(marker._id)}
      position={{ lat: marker.latitude, lng: marker.longitude }}>
      {isOpen && this.state.id === marker._id &&
      <InfoWindow onCloseClick={() => this.toggleInfo(marker._id)}
                  position={{ lat: marker.lat, lng: marker.lng }}>
        <div className="info-window">
          <p>aaaaa</p>
        </div>
      </InfoWindow>}
    </Marker>;
  }
}

export default MapDashboard ;
