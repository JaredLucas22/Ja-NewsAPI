import React, { Component } from 'react';
import axios from 'axios';
import '../components/styles/combined-styles.css'; // Ensure the correct file extension for the CSS file
import ReadMoreButton from '../components/buttons/ReadMoreButton.js'; // Ensure the correct file extension for the JavaScript file
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';

class Headlines extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
    };
  }

  render() {
    const { articles } = this.state;
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <GridList cellHeight={210} className={classes.gridList} cols={3}>
          <GridListTile key="Subheader" cols={3} style={{ height: 'auto' }}>
            <ListSubheader component="div">Top Headlines</ListSubheader>
          </GridListTile>

          {/* Featured Headline */}
          {articles[0] && (
            <GridListTile key={articles[0].urlToImage} cols={3} rows={2}>
              <img src={articles[0].urlToImage} alt={articles[0].title} />
              <GridListTileBar
                title={articles[0].title}
                subtitle={
                  <span>
                    by: {articles[0].source.name}
                    {articles[0].category && (
                      <span style={{ marginLeft: '10px', fontStyle: 'italic' }}>
                        Category: {articles[0].category}
                      </span>
                    )}
                  </span>
                }
                actionIcon={
                  <ReadMoreButton article={articles[0]} /> 
                }
              />
            </GridListTile>
          )}

          {/* Smaller Headlines */}
          {articles.slice(3).map((article) => (
            <GridListTile key={article.urlToImage} cols={1} rows={2}>
              <img src={article.urlToImage} alt={article.title} />
              <GridListTileBar
                title={article.title}
                subtitle={
                  <span>
                    by: {article.source.name}
                    {article.category && (
                      <span style={{ marginLeft: '10px', fontStyle: 'italic' }}>
                        Category: {article.category}
                      </span>
                    )}
                  </span>
                }
                actionIcon={
                  <ReadMoreButton article={article} />
                }
              />
            </GridListTile>
          ))}
        </GridList>
      </div>
    );
  }

  componentDidMount() {
    axios
      .get('/api/headlines') // Use the serverless API endpoint
      .then((response) => {
        const { data } = response;
        this.setState({
          articles: data.articles,
        });
      })
      .catch((error) => {
        console.error('Error fetching headlines:', error);
      });
  }
}

const styles = {
  body: {
    overflow: 'hidden',
  }, 

  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: '#f5f5f5', // Fixed background color
  },
  gridList: {
    width: 1300,
    height: 1500,
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
};

Headlines.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Headlines);