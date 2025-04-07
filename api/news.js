const axios = require('axios');
const URL = require('../src/config');

module.exports = async (req, res) => {
  const { source } = req.query;

  if (!source) {
    return res.status(400).json({ error: 'Source is required' });
  }

  try {
    const response = await axios.get(`${URL.topHeadlinesURL}${URL.apiKey}${URL.sources}${source}`);
    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error fetching news:', error);
    res.status(500).json({ error: 'Failed to fetch news' });
  }
};
