const axios = require('axios');
const URL = require('../src/config');

module.exports = async (req, res) => {
  const { source } = req.query;

  // Validate the source query parameter
  if (!source) {
    return res.status(400).json({ error: 'The "source" query parameter is required.' });
  }

  try {
    // Make the API request to fetch news by source
    const response = await axios.get(`${URL.topHeadlinesURL}${URL.apiKey}${URL.sources}${source}`);
    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error fetching news:', error.message);
    res.status(error.response?.status || 500).json({
      error: error.response?.data?.message || 'Failed to fetch news from the source.',
    });
  }
};