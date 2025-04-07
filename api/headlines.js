const axios = require('axios');
const URL = require('../src/config');

module.exports = async (req, res) => {
  try {
    const response = await axios.get(`${URL.topHeadlinesURL}${URL.countryID}${URL.apiKey}`);
    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error fetching headlines:', error);
    res.status(500).json({ error: 'Failed to fetch headlines' });
  }
};
