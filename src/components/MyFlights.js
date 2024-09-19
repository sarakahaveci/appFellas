import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './MyFlights.css'; 

const MyFlights = () => {
  const [reservations, setReservations] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadReservations = () => {
      const savedReservations = JSON.parse(localStorage.getItem('flightReservations')) || [];
      setReservations(savedReservations);
    };

    loadReservations();
  }, []);

  const clearReservations = () => {
    localStorage.removeItem('flightReservations'); 
    alert('All reservations cleared!');
  };

  return (
    <div className="my-flights-container">
      <h2>My Flights</h2>
      {reservations.length === 0 ? (
        <p>No flights reserved yet.</p>
      ) : (
        <table className="flights-table">
          <thead>
            <tr>
            <th>Flight Number</th>
            <th>Flight Name</th>
            <th>Schedule Date</th>
            <th>Schedule Time</th>
            <th>Aircraft Type</th>
            <th>Flight Direction</th>
            </tr>
          </thead>
          <tbody>
            {reservations.map((flight, index) => (
              <tr key={index} className="flight-item">
              <td>{flight.flightNumber}</td>
              <td>{flight.flightName}</td>
              <td>{flight.scheduleDate}</td>
              <td>{flight.scheduleTime}</td>
              <td>{flight.aircraftType?.iataMain}</td>
              <td>{flight.flightDirection}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <button onClick={clearReservations} className="clear-button">Clear All Reservations</button>
      <button onClick={() => navigate('/')} className="back-button">Back to Home Page</button>
    </div>
  );
};

export default MyFlights;
