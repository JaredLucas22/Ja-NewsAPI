import React, { Component } from 'react';
import axios from 'axios';
import ReadMoreButton from '../components/buttons/ReadMoreButton';
import '../components/styles/combined-styles.css'; // Ensure the correct file extension for the CSS file

class SearchNews extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
    };
  }

  render() {
    const { articles } = this.state;

    return (
      <div className="container">
        <h2>Results for: "{this.props.search}"</h2>
        <div className="grid-container">
          {articles.map((article) => (
            <div
              className="grid-item"
              key={article.url}
              style={{
                width: '300px', // Customize the width of the card
                height: '400px', // Customize the height of the card
                border: '1px solid #ddd',
                borderRadius: '8px',
                overflow: 'hidden',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                backgroundColor: '#fff',
                margin: '10px', // Add spacing between cards
              }}
            >
              <img
                src={article.urlToImage || 'https://via.placeholder.com/300x200'}
                alt={article.title}
                style={{
                  width: '100%',
                  height: '200px', // Customize the height of the image
                  objectFit: 'cover', // Ensure the image covers the area without distortion
                }}
              />
              <div
                className="grid-content"
                style={{
                  padding: '15px',
                  flexGrow: 1, // Allow the content to grow and fill available space
                  overflow: 'hidden', // Prevent overflow of text
                }}
              >
                <h3 style={{ fontSize: '1.2em', margin: '0 0 10px' }}>{article.title}</h3>
                <p style={{ fontSize: '0.9em', color: '#555', margin: '0 0 10px' }}>
                  {article.description}
                </p>
                <p
                  className="grid-source"
                  style={{ fontSize: '0.8em', color: '#888', margin: '0 0 10px' }}
                >
                  <strong>Source:</strong> {article.source.name}
                </p>
              </div>
              
              <div
                style={{
                  padding: '10px',
                  textAlign: 'center',
                  borderTop: '1px solid #ddd',
                  backgroundColor: '#f9f9f9',
                }}
              >
                
              </div>
              <ReadMoreButton article={article} />
            </div>
            
          ))}
          
        </div>
      </div>
    );
  }

  componentDidMount() {
    this.reloadSearch();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.search !== this.props.search) {
      this.reloadSearch();
    }
  }

  reloadSearch() {
    const { search } = this.props;

    axios
      .get(`/api/search?query=${search}`) // Use the serverless API endpoint
      .then((response) => {
        const { articles } = response.data;
        this.setState({
          articles: articles,
        });
      })
      .catch((error) => {
        console.error('Error fetching search results:', error);
      });
  }
}

export default SearchNews;