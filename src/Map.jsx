import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import bikeIcon from './car.png';
// Custom marker icon to address an issue with default marker in React-Leaflet
const customIcon = new L.Icon({
    //   iconUrl: require('leaflet/dist/images/marker-icon.png'),
    iconUrl: bikeIcon,
    iconRetinaUrl: bikeIcon,
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
    iconSize: [41, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
});

const MapWithLocation = ({ lat, lng }) => {
    return (
        <MapContainer center={[lat, lng]} zoom={13} style={{ height: "100vh", width: "100%" }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={[lat, lng]} icon={customIcon}>
                <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
            </Marker>
        </MapContainer>
    );
};

export default MapWithLocation;
