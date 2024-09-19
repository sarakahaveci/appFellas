// src/api/flightApi.js
import axios from 'axios';

const API_URL = '/public-flights/flights'; // Use relative path with proxy
const APP_ID = '518bd96b'; // Your Application ID
const APP_KEY = '015809ce9cf728f1780815ed36055990'; // Your Application Key

export const fetchFlights = async (date, direction) => {
  try {
    console.log('Fetching flights with:', { date, direction });
    
    const response = await axios.get(API_URL, {
      headers: {
        'Accept': 'application/json',
        'app_id': APP_ID,
        'app_key': APP_KEY,
        'ResourceVersion': 'v4',
      },
      params: {
        includedelays: false,
        page: 0,
        sort: 'scheduleTime',
        scheduleDate: date,
        flightDirection: direction,
      }
    });

    console.log('Response data:', response.data);
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error('Error fetching flights:', error.response.status, error.response.data);
    } else if (error.request) {
      console.error('Error fetching flights: No response received', error.request);
    } else {
      console.error('Error fetching flights:', error.message);
    }
    throw error;
  }
};
