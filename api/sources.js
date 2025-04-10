const axios = require('axios');
const URL = require('../src/config');

module.exports = async (req, res) => {
  try {
    const response = await axios.get(`${URL.sourcesURL}${URL.apiKey}`);
    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error fetching sources:', error.message);
    res.status(error.response?.status || 500).json({
      error: error.response?.data?.message || 'Failed to fetch sources',
    });
  }
};