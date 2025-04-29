import axios from 'axios';

/**
 * Fetches search results from the serverless API.
 * @param {string} query - The search query.
 * @returns {Promise<Object>} - A promise that resolves to the search results.
 */
export const fetchSearchResults = async (query) => {
  try {
    const response = await axios.get(`/api/search?query=${query}`);
    return response.data.articles; // Return the articles array
  } catch (error) {
    console.error('Error fetching search results:', error.message);
    throw error; // Re-throw the error to handle it in the component
  }
};