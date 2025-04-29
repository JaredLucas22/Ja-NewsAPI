import React, { Component } from 'react';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import ReadMoreButton from '../components/buttons/ReadMoreButton';
import PropTypes from 'prop-types';

class Headlines extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
    };
  }

  componentDidMount() {
    axios
      .get('/api/headlines')
      .then((response) => {
        const { articles } = response.data;
        this.setState({ articles });
      })
      .catch((error) => {
        console.error('Error fetching headlines:', error);
      });
  }

  render() {
    const { articles } = this.state;
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Grid container spacing={3}>
          {articles.map((article) => (
            <Grid item xs={12} sm={6} md={4} key={article.url}>
              <Card className={classes.card}>
                <CardActionArea>
                  <CardMedia
                    className={classes.media}
                    image={article.urlToImage || 'https://via.placeholder.com/150'}
                    title={article.title}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h6" component="h2">
                      {article.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                      {article.description}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <ReadMoreButton article={article} />
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    );
  }
}

const styles = {
  root: {
    padding: '20px',
    backgroundColor: '#f5f5f5',
  },
  card: {
    maxWidth: 345,
    margin: 'auto',
  },
  media: {
    height: 140,
  },
};

Headlines.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Headlines);