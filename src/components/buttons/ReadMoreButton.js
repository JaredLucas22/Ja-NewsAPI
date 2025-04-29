// filepath: src/components/buttons/ReadMoreButton.js
import React from 'react';
import { useHistory } from 'react-router-dom';

const ReadMoreButton = ({ article }) => {
  const history = useHistory();

  const handleClick = () => {
    if (article) {
      history.push('/read', { article }); // Pass the article object as state
    } else {
      console.error('Article data is missing.');
    }
  };

  return (
    <button className="btn" onClick={handleClick}>
      Read More
    </button>
  );
};

export default ReadMoreButton;