import React, { useEffect, useState } from 'react';
import { Circle, Popup, MapConsumer } from "react-leaflet";

const Store = ({ store }) => {
  const [ lat, setLat ] = useState(0);
  const [ lng, setLng ] = useState(0);

  const lat1 = 37.75655;
  const lng1 = -122.49261;

  const apiKey = "HCIHt1mV9k4GyPpFDXrtDeMyANgtxZZs";
  const { address, city, state, zipCode } = store;

  useEffect(() => {
    const mapQuestUrl = `http://www.mapquestapi.com/geocoding/v1/address?key=${apiKey}&location=${address},${city},${state},${zipCode}`;

    fetch(mapQuestUrl)
    .then(response => response.json())
    .then(data => {
      const { lat, lng } = data.results[0].locations[0].latLng
      setLat(lat);
      setLng(lng);
    })
    .catch(console.error);

  })

  return (
    <div>
      <>
        {
          (lat && lng && lat1 && lng1) && (
            <MapConsumer>
              {
                (map) => {
                  if (map.distance([lat, lng], [lat1, lng1]) <= 8000) {
                    console.log("good");
                  } else {
                    console.log("bad");
                  }
                  return null;
                }
              }
            </MapConsumer>
          )
        }
        <Circle
          center={[lat, lng]} 
          radius={500}
          pathOptions={{ 
            fillColor: "#00a", 
            stroke: false 
          }}
        />
        <Circle
          center={[lat, lng]} 
          radius={100}
          pathOptions={{ 
            fillColor: "#00a",
            weight: 1 
          }}
        />
        <Circle 
          radius={2} 
          center={[lat, lng]} 
          pathOptions={{ 
            color: "#00a",
            fillColor: "#00a",
            weight: 6, 
          }}
        >
          <Popup>{ address }</Popup>  
        </Circle>
      </>
    </div>
  );
};

export default Store;
