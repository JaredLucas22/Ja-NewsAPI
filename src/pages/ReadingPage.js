import React from 'react';
import { useLocation } from 'react-router-dom';
import '../components/styles/ReadingPage.css'; 

const ReadingPage = () => {
  const location = useLocation();
  const { article } = location.state || {}; // Get the article data from state

  if (!article) {
    console.error('No article data passed to ReadingPage.');
    return <p className="error-message">No article data available.</p>;
  }

  const getTruncatedContent = (content) => {
    if (!content) return article.description; // Fallback to description if content is unavailable
    const lastPeriodIndex = content.lastIndexOf('.');
    return lastPeriodIndex !== -1 ? content.substring(0, lastPeriodIndex + 1) : content;
  };

  return (
    <div className="reading-page">
      <header className="reading-header">
        <h1 className="reading-title">{article.title}</h1>
        <p className="reading-meta">Published by <strong>{article.source.name}</strong></p>
      </header>
      <div className="reading-content">
        <img src={article.urlToImage} alt={article.title} className="reading-image" />
        <div className="reading-text">
          <p className="reading-description">
            {getTruncatedContent(article.content)}
          </p>
          <a 
            href={article.url} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="read-full-article"
          >
            Read the full article
          </a>
        </div>
      </div>
      <footer className="reading-footer">
        <button className="share-button">Share Link</button>
      </footer>
    </div>
  );
};

export default ReadingPage;