import React, { Component } from 'react';
import axios from 'axios';
import './combined-styles.css'; // Corrected the path to the combined CSS file

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';

class News extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      source: props.source,
    };
  }

  render() {
    const { articles, source } = this.state;
    const { classes } = this.props;

    if (source !== this.props.source) this.reloadSource();
    return (
      <div className={classes.root}>
        <GridList cellHeight={180} className={classes.gridList} cols={4}>
          <GridListTile key="Subheader" cols={4} style={{ height: 'auto' }}>
            <ListSubheader component="div">Results for: {this.props.source}</ListSubheader>
          </GridListTile>

          {/* Featured Headline */}
          {articles[0] && (
            <GridListTile key={articles[0].urlToImage} cols={3} rows={2}>
              <img src={articles[0].urlToImage} alt={articles[0].title} />
              <GridListTileBar
                title={articles[0].title}
                subtitle={<span>by: {articles[0].source.name}</span>}
                actionIcon={
                  <a
                    href={articles[0].url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn"
                    style={{ marginRight: '10px' }}
                  >
                    Read More
                  </a>
                }
              />
            </GridListTile>
          )}

          {/* Smaller Headlines */}
          {articles.slice(1).map((article) => (
            <GridListTile key={article.urlToImage} cols={1} rows={1}>
              <img src={article.urlToImage} alt={article.title} />
              <GridListTileBar
                title={article.title}
                subtitle={<span>by: {article.source.name}</span>}
                actionIcon={
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn"
                    style={{ marginRight: '10px' }}
                  >
                    Read More
                  </a>
                }
              />
            </GridListTile>
          ))}
        </GridList>
      </div>
    );
  }

  componentDidMount() {
    this.reloadSource();
  }

  reloadSource() {
    const { source } = this.props;

    axios
      .get(`/api/news?source=${source}`) // Use the serverless API endpoint
      .then((response) => {
        const { articles } = response.data;
        this.setState({
          articles: articles,
          source: source, // Update the state to match the current source
        });
      })
      .catch((error) => {
        console.error('Error fetching news:', error);
      });
  }
}

const styles = (theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 1300,
    height: 1500,
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
});

News.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(News);
