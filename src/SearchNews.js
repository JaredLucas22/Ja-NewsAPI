import React, { Component } from 'react';
import axios from 'axios';
import './combined-styles.css'; // Replace with the new combined CSS file

class SearchNews extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      search: props.search,
    };
  }

  render() {
    const { articles, search } = this.state;

    if (search !== this.props.search) this.reloadSearch();
    return (
      <div className="container">
        <h2>Results for: "{this.props.search}"</h2>
        <div className="grid-container">
          {articles.map((article) => (
            <div className="grid-item" key={article.url}>
              <img src={article.urlToImage} alt={article.title} className="grid-image" />
              <div className="grid-content">
                <h3>{article.title}</h3>
                <p>{article.description}</p>
                <p className="grid-source"><strong>Source:</strong> {article.source.name}</p>
                <a href={article.url} className="btn" target="_blank" rel="noopener noreferrer">
                  Read More
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  componentDidMount() {
    this.reloadSearch();
  }

  reloadSearch() {
    const { search } = this.props;

    axios
      .get(`/api/search?query=${search}`) // Use the serverless API endpoint
      .then((response) => {
        const { articles } = response.data;
        this.setState({
          articles: articles,
          search: search, // Update the state to match the current search term
        });
      })
      .catch((error) => {
        console.error('Error fetching search results:', error);
      });
  }
}

export default SearchNews;
