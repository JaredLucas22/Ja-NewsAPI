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
            <div className="grid-item" key={article.url}>
              <img src={article.urlToImage} alt={article.title} className="grid-image" />
              <div className="grid-content">
                <h3>{article.title}</h3>
                <p>{article.description}</p>
                <p className="grid-source"><strong>Source:</strong> {article.source.name}</p>
                <ReadMoreButton article={article} /> {/* Pass the article object */}
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

  componentDidUpdate(prevProps) {
    if (prevProps.search !== this.props.search) {
      this.reloadSearch();
    }
  }

  reloadSearch() {
    const { search } = this.props;

    axios
      .get(`/api/search?query=${search}`)
      .then((response) => {
        const { articles } = response.data;
        this.setState({ articles });
      })
      .catch((error) => {
        console.error('Error fetching search results:', error);
      });
  }
}

export default SearchNews;