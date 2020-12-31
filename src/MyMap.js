import React, { useEffect } from 'react';
import { MapContainer, TileLayer } from "react-leaflet";
import CurrentLocation from './CurrentLocation';
import Store from './Store';
import "leaflet/dist/leaflet.css";
import L from 'leaflet';
import marker_icon_2x from "leaflet/dist/images/marker-icon-2x.png";
import marker_icon from "leaflet/dist/images/marker-icon.png"
import marker_shadow from "leaflet/dist/images/marker-shadow.png";

const MyMap = ({ lat, lng, stores }) => {

  useEffect(() => {
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: marker_icon_2x,
      iconUrl: marker_icon,
      shadowUrl: marker_shadow,
    });  
  })

  return (
    <div>
      {
        (lat && lng) && (
          <MapContainer center={[lat, lng]} zoom={12} style={{ height: "400px", width: "700px" }}>
            {/* <MapConsumer>
              {
                (map) => {
                  geosearch().addTo(map);
                  return null;
                }
              }
            </MapConsumer> */}
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <CurrentLocation 
              lat={lat}
              lng={lng}
            />
            {
              stores.map((store, i) => (
                <Store key={ i } store={ store }/>
              ))
            }
          </MapContainer>
        )
      }
    </div>
  );
};

export default MyMap;
