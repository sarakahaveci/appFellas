// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/home/Home';
import MyFlights from './components/MyFlights';


const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/my-flights" element={<MyFlights />} />
    </Routes>
  </Router>
);
export default App;
