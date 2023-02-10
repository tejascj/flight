// create a react component that input s a textarea message then perform a fetch request to localhost:3001 gets back a response as a data.message and displays that message in the box below

import React, { useState, useEffect } from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { Form, ListGroup, Checkbox } from "react-bootstrap";
import { airportsData } from "./airports.js";
// import index from './index.js';


export function Trip() {
  const [isChecked, setIsChecked] = useState(false);

  const [destination, setDestination] = useState('');
  const [response, setResponse] = useState('');
  const [days, setDays] = useState('');
  // flight details
  const [query1, setQuery1] = useState("");
  const [selectedAirport1, setSelectedAirport1] = useState({ city: "", iata: "" });
  const [query2, setQuery2] = useState("");
  const [selectedAirport2, setSelectedAirport2] = useState({ city: "", iata: "" });

  const filteredAirports1 = airportsData.filter((airport) =>
    airport.city.toLowerCase().includes(query1.toLowerCase()) ||
    airport.iata.toLowerCase().includes(query1.toLowerCase())
  );

  const filteredAirports2 = airportsData.filter((airport) =>
    airport.city.toLowerCase().includes(query2.toLowerCase()) ||
    airport.iata.toLowerCase().includes(query2.toLowerCase())
  );

  const handleInputChange1 = (event) => {
    setQuery1(event.target.value);
  };

  const handleInputChange2 = (event) => {
    setQuery2(event.target.value);
  };

  const handleOptionClick1 = (airport) => {
    setSelectedAirport1(airport);
    console.log(airport);
    setQuery1(`${airport.city} (${airport.iata})`);
  };

  const handleOptionClick2 = (airport) => {
    setSelectedAirport2(airport);
    console.log(airport);
    setQuery2(`${airport.city} (${airport.iata})`);
  };


  // handling the form submission for open ai and amadeus api
  const [openAiResponse, setOpenAiResponse] = useState(null);
  const [amadeusResponse, setAmadeusResponse] = useState(null);
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:3001/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        destination: destination,
        days: days,
        flight1: selectedAirport1.iata,
        flight2: selectedAirport2.iata
      })
    })
      .then(res => res.json())
      .then(data => {
        setOpenAiResponse(data,openAiResponse);
        setAmadeusResponse(data,amadeusResponse);
        console.log("OpenAI Response: ", data.openAiResponse);
        console.log("Amadeus Response data: ", data.amadeusResponse);
      });
  };


  return (
    <div className="App">

      <div class="container-fluid">
        <nav class="navbar bg-body-tertiary">
          <div class="container-fluid">
            <a class="navbar-brand" mb-0 h1>Trip Planner AI</a>
          </div>
        </nav>
      </div>
      <div class="container border rounded p-3 ">
        <form onSubmit={handleSubmit}>

          <div class="row g-3 align-items-center">
            <div class="col-md-4">
              <input type="text" class="form-control" value={destination} onChange={e => setDestination(e.target.value)} placeholder="Destination name" aria-label="Destination" />
            </div>
            <div class="col-md-4">
              <input type="text" class="form-control" value={days} onChange={e => setDays(e.target.value)} placeholder="Number of Days" aria-label="No of days" />
            </div>
            <div class="col-md-2">
              <input
                className="form-check-input"
                type="checkbox"
                checked={isChecked}
                onChange={() => setIsChecked(!isChecked)}
              /><label className="form-check-label">
                Cheapest Flight reccomendation
              </label></div>
            <div class="col-md-2 ">
              <input type="submit" value="submit" class="form-control" aria-label="Last name" />
            </div>
            <div>
              {isChecked && (
                <>
                  <Form.Control
                    type="text"
                    onChange={handleInputChange1}
                    value={query1}
                    placeholder="Search for an airport..."
                  />
                  {query1.length >= 3 && (
                    <ListGroup style={{ position: "absolute", zIndex: 100 }}>
                      {filteredAirports1.slice(0, 5).map((airport, index) => (
                        <ListGroup.Item
                          action
                          key={index}
                          onClick={() => handleOptionClick1(airport)}
                        >
                          {airport.city} ({airport.iata})
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  )}
                </>
              )}
            </div>
            <div>
              {isChecked && (
                <>
                  <Form.Control
                    type="text"
                    onChange={handleInputChange2}
                    value={query2}
                    placeholder="Search for an airport..."
                  />
                  {query2.length >= 3 && (
                    <ListGroup style={{ position: "absolute", zIndex: 100 }}>
                      {filteredAirports2.slice(0, 5).map((airport, index) => (
                        <ListGroup.Item
                          action
                          key={index}
                          onClick={() => handleOptionClick2(airport)}
                        >
                          {airport.city} ({airport.iata})
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  )}
                </>
              )}
            </div>
          </div>
        </form>
      </div>
      {openAiResponse ? (
        <div class="container mx-auto px-auto w-50 bg-light">
          <p>
            {openAiResponse.split('\n').map((item, i) => {
              return <React.Fragment key={i}>{item}<br /></React.Fragment>;
            })}
          </p>
        </div>
      ) : null}
      {amadeusResponse ? (
        <div>
          <div class="container">
            <div class="row">
              <div class="col-4">
                {/* <img src={`https://images.kiwi.com/airlines/64/${amadeusResponse.data.itineraries.segments.carrierCode}.png`} /> */}
              </div>
              <div class="col-5">
                <div class="row">
                  <div class="col-6">
                    <div class="origin">
                      {selectedAirport1.city}
                      {/* <div class="departure-time">{amadeusResponse.data.itineraries.segments.departure.at}</div> */}
                    </div>
                  </div>
                  <div class="col-6">
                    <div class="destination">
                      {selectedAirport2.city}
                      {/* <div class="arrival-time">{amadeusResponse.data.itineraries.segments.arrival.at}</div> */}
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-12">
                    {/* <div class="flight-code">Flight Code: {amadeusResponse.data.itineraries.segments.flightNumber}</div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export function Flight() {
  const [selectedAirport1, setSelectedAirport1] = useState(null);
  const [selectedAirport2, setSelectedAirport2] = useState(null);
  return (
    <div>
      <div class="h1">
        <h1>Flight</h1>
      </div>
    </div>
  );
}
