const axios = require('axios');
const URL = require('../src/config');

module.exports = async (req, res) => {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ error: 'Search query is required' });
  }

  try {
    const response = await axios.get(`${URL.everythingURL}${URL.apiKey}${URL.search}${query}`);
    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error fetching search results:', error);
    res.status(500).json({ error: 'Failed to fetch search results' });
  }
};
