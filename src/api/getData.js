import axios from 'axios';

const axios = require('axios');

async function getData() {
  try {
    const response = await axios.get('http://127.0.0.1:5000/api/data');
    const data = response.data;
    return data;
  } catch (error) {
    console.error('Error fetching data: ', error);
    return null;
  }
}

module.exports = getData;
