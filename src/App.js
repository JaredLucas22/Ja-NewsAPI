import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Headlines from './pages/Headlines';
import News from './pages/News';
import SearchNews from './pages/SearchNews';
import ReadingPage from './pages/ReadingPage';
import TopNavbar from './components/navigations/TopNavbar.js';
import debounce from 'lodash.debounce';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sources: [],
      sourceValue: 'headlines',
      searchValue: '',
    };
    this.handleChangeSource = this.handleChangeSource.bind(this);
    this.handleChangeSearch = this.handleChangeSearch.bind(this);
  }

  componentDidMount() {
    axios
      .get('/api/sources')
      .then((response) => {
        const { sources } = response.data;
        this.setState({ sources });
      })
      .catch((error) => {
        console.error('Error fetching sources:', error);
      });
  }

  handleChangeSource(event) {
    this.setState({ sourceValue: event.target.value });
  }

  handleChangeSearch(event) {
    this.setState({ searchValue: event.target.value });
    this.handleSearch(event.target.value);
  }

  handleSearch = debounce((searchValue) => {
    // Make API call here
  }, 500);

  render() {
    const { searchValue } = this.state;

    return (
      <Router>
        <div className="root">
          <TopNavbar
            searchValue={searchValue}
            onSearchChange={this.handleChangeSearch}
          />
          <Switch>
            <Route exact path="/" component={Headlines} />
            <Route path="/search" render={() => <SearchNews search={searchValue} />} />
            <Route path="/read" component={ReadingPage} />
            <Route path="/news" render={() => <News source={this.state.sourceValue} />} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;