import React, { useState } from 'react';
import { GoogleMap, MarkerF, LoadScript } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px',
};

const center = {
  lat: 37.7749,
  lng: -122.4194,
};

const MapContainer = () => {
  const [position, setPosition] = useState(center);

  const handleMarkerDragEnd = (e) => {
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();
    setPosition({ lat, lng });
    console.log(lat,lng);
  };

  return (
    <LoadScript googleMapsApiKey="AIzaSyCUuJfyVEHoeUT49q-NFyBDRetC6GqSkeI">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={position}
        zoom={10}
      >
        {position.lat && position.lng && (
          <MarkerF
            position={position}
            draggable={true}
            onDragEnd={handleMarkerDragEnd}
          />
        )}
      </GoogleMap>
    </LoadScript>
  );
};

export default MapContainer;