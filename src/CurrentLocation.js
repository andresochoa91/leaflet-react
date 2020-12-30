import React from 'react';
import { Marker, Popup } from "react-leaflet";


function CurrentLocation({ lat, lng }) {
  return (
    <div>
      <Marker position={[lat, lng]}>
        <Popup>
          {lat}{lng}
        </Popup>
      </Marker>
    </div>
  )
}

export default CurrentLocation
