import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { fetchFlights } from '../api/flightApi';
import './Home.css';

const Home = () => {
  const [flights, setFlights] = useState([]);
  const [error, setError] = useState(null);
  const [date, setDate] = useState('2024-09-25'); 
  const [direction, setDirection] = useState('D'); 
  const navigate = useNavigate(); 

  const handleSearch = async () => {
    console.log('Search button clicked');
    try {
      const response = await fetchFlights(date, direction);
      console.log('Fetched flights:', response);

      if (Array.isArray(response.flights)) {
        setFlights(response.flights);
      } else {
        console.error('Fetched flights is not an array:', response.flights);
        setFlights([]);
      }

      setError(null);
    } catch (error) {
      console.error('Error fetching flights:', error);
      setError('Error fetching flights. Please try again.');
      setFlights([]);
    }
  };

  const reserveFlight = (flight) => {
    try {
      const existingReservations = JSON.parse(localStorage.getItem('flightReservations')) || [];
      existingReservations.push(flight);
      localStorage.setItem('flightReservations', JSON.stringify(existingReservations));
      console.log('Flight reserved:', flight);
      alert('Flight reserved successfully!');
    } catch (error) {
      console.error('Error reserving flight:', error);
      alert('Failed to reserve flight.');
    }
  };

  return (
    <div className="home-container">
      <h1>Flight Search</h1>
      <button onClick={() => navigate('/my-flights')} className="my-flights-button">
        View My Flights
      </button>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <select value={direction} onChange={(e) => setDirection(e.target.value)}>
        <option value="D">Departures</option>
        <option value="A">Arrivals</option>
      </select>
      <button onClick={handleSearch}>Search Flights</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {flights.length > 0 ? (
        <table className="flights-table">
          <thead>
            <tr>
              <th>Flight Number</th>
              <th>Flight Name</th>
              <th>Schedule Date</th>
              <th>Schedule Time</th>
              <th>Aircraft Type</th>
              <th>Flight Direction</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {flights.map((flight) => (
              <tr key={flight.flightNumber} className="flight-item">
                <td>{flight.flightNumber}</td>
                <td>{flight.flightName}</td>
                <td>{flight.scheduleDate}</td>
                <td>{flight.scheduleTime}</td>
                <td>{flight.aircraftType?.iataMain}</td>
                <td>{flight.flightDirection}</td>
                <td>
                  <button className="reserve-button" onClick={() => reserveFlight(flight)}>Reserve Flight</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        !error && <p>No flights found.</p>
      )}
    </div>
  );
};

export default Home;
