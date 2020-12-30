import React from 'react';
import { Marker, Popup } from "react-leaflet";


function CurrentLocation() {
  return (
    <div>
      <Marker position={[37.746936, -122.472574]}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </div>
  )
}

export default CurrentLocation
