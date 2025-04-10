import React, { Component } from 'react';
import axios from 'axios'
import URL from './config'
import './App.css';

import Headlines from './Headlines'
import News from './News'
import SearchNews from './SearchNews';

import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import debounce from 'lodash.debounce';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sources: [],
      sourceValue: 'headlines',
      searchValue: ''
    };
    this.handleChangeSource = this.handleChangeSource.bind(this);
    this.handleChangeSearch = this.handleChangeSearch.bind(this);
  }

  componentDidMount() {
    axios
      .get('/api/sources') // Use the serverless API endpoint
      .then((response) => {
        console.log(response.data);
        const { sources } = response.data;
        this.setState({
          sources: sources,
        });
      })
      .catch((error) => {
        console.error('Error fetching sources:', error);
      });
  }

  render() {
    let { sources, sourceValue, searchValue } = this.state
    const { classes } = this.props;
    return (

      <div className="root">

        <AppBar position="static" style={{ backgroundColor: '#333' }}>
          <Toolbar>
            <Typography variant="h6" style={{ color: '#fff', marginRight: '16px' }}>
              JNews | Dary
            </Typography>
            <select
              value={this.state.sourceValue}
              onChange={this.handleChangeSource}
              style={{
                color: '#fff',
                backgroundColor: '#444',
                border: 'none',
                borderRadius: '4px',
                padding: '4px 8px',
                fontSize: '14px',
                marginRight: '16px',
              }}
            >
              <option value="headlines">Top Headlines</option>
              {sources.map((source, i) => (
                <option key={i} value={source.id}>
                  {source.name}
                </option>
              ))}
            </select>
            <div style={{ flexGrow: 1 }}></div> {/* Spacer to push the search bar to the right */}
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ position: 'relative' }}>
                <SearchIcon
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '8px',
                    transform: 'translateY(-50%)',
                    color: '#fff',
                  }}
                />
                <InputBase
                  placeholder="Search News..."
                  value={searchValue}
                  onChange={this.handleChangeSearch}
                  style={{
                    color: '#fff',
                    backgroundColor: 'rgba(255, 255, 255, 0.15)',
                    borderRadius: '4px',
                    padding: '4px 8px 4px 32px',
                    width: '200px',
                  }}
                />
              </div>
            </div>
          </Toolbar>
        </AppBar>

        {
          this.state.searchValue != '' ? <SearchNews search={searchValue} /> : this.state.sourceValue == 'headlines' ? <Headlines /> : <News source={sourceValue} />
        }
      </div>
    );
  }

  handleChangeSource(event) {
    this.setState({ sourceValue: event.target.value });
    console.log(this.state.sourceValue);
  }
  handleChangeSearch(event) {
    this.setState({ searchValue: event.target.value });
    console.log(this.state.searchValue);
    this.handleSearch(event.target.value);
  }

  handleSearch = debounce((searchValue) => {
    // Make API call here
  }, 500); // Delay of 500ms
}

const fetchWithRetry = async (url, retries = 3, delay = 1000) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    if (retries > 0 && error.response.status === 429) {
      await new Promise((resolve) => setTimeout(resolve, delay));
      return fetchWithRetry(url, retries - 1, delay * 2);
    }
    throw error;
  }
};

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

const styles = theme => ({
  root: {
    width: '100%',
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit,
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200,
      },
    },
  },
});

export default withStyles(styles)(App);