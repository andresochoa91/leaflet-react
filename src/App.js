import React, { useEffect, useState } from "react";
import MyMap from './MyMap';

const App = () => {

  const [ lat, setLat ] = useState(0);
  const [ lng, setLng ] = useState(0);

  let address = "550 Rivera St.";
  let city = "San Francisco";
  let state = "CA";
  let zipCode = "94116";

  const stores = [
    {
      address: "2194 Rivera St",
      city: "San Francisco",
      state: "CA",
      zipCode: "94116",
    },
    {
      address: "1500 Rivera St",
      city: "San Francisco",
      state: "CA",
      zipCode: "94116",
    },
    {
      address: "750 Rivera St",
      city: "San Francisco",
      state: "CA",
      zipCode: "94116",
    }
  ];

  address = address.replace(/ /g, "+");
  console.log(address)

  const apiKey = "HCIHt1mV9k4GyPpFDXrtDeMyANgtxZZs";
  const mapQuestUrl = `http://www.mapquestapi.com/geocoding/v1/address?key=${apiKey}&location=${address},${city},${state},${zipCode}`;

  useEffect(() => {
    fetch(mapQuestUrl)
    .then(response => response.json())
    .then(data => {
      const { lat, lng } = data.results[0].locations[0].latLng
      setLat(lat);
      setLng(lng);
    })
    .catch(console.error);
  }, [mapQuestUrl]);

  return (
    <MyMap
      lat={ lat } 
      lng={ lng } 
      stores={ stores }
    />
  );
};

export default App;