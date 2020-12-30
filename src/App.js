import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Circle, Popup } from "react-leaflet";
import CurrentLocation from './CurrentLocation';
import "leaflet/dist/leaflet.css";
import L from 'leaflet';
import marker_icon_2x from "leaflet/dist/images/marker-icon-2x.png";
import marker_icon from "leaflet/dist/images/marker-icon.png"
import marker_shadow from "leaflet/dist/images/marker-shadow.png";

const App = () => {

  const [ lat, setLat ] = useState(0);
  const [ lng, setLng ] = useState(0);

  let address = "550 Rivera St.";
  let city = "San Francisco";
  let state = "CA";
  let zipCode = "94116";

  address = address.replace(/ /g, "+");
  console.log(address)

  const apiKey = "HCIHt1mV9k4GyPpFDXrtDeMyANgtxZZs";
  const mapQuestUrl = `http://www.mapquestapi.com/geocoding/v1/address?key=${apiKey}&location=${address},${city},${state},${zipCode}`;

  fetch(mapQuestUrl)
  .then(response => response.json())
  .then(data => {
    const { lat, lng } = data.results[0].locations[0].latLng
    setLat(lat);
    setLng(lng);
  })
  .catch(console.error);


  useEffect(() => {
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: marker_icon_2x,
      iconUrl: marker_icon,
      shadowUrl: marker_shadow,
    });

  }, [mapQuestUrl]);

  return (
    <div>
      <MapContainer center={[37.746936, -122.472574]} zoom={12} style={{ height: "400px", width: "700px" }}>
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
        {/* <Circle
          center={[37.746936, -122.472574]} 
          radius={500}
          pathOptions={{ 
            fillColor: "#00a", 
            stroke: false 
          }}
        />
        <Circle
          center={[37.746936, -122.472574]} 
          radius={100}
          pathOptions={{ 
            fillColor: "#00a",
            weight: 1 
          }}
        />
        <Circle 
          radius={2} 
          center={[37.746936, -122.472574]} 
          pathOptions={{ 
            color: "#00a",
            fillColor: "#00a",
            weight: 6, 
          }}
        >
          <Popup>yayaya</Popup>  
        </Circle> */}
      </MapContainer>
    </div>
  );
};

export default App;