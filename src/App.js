import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, withRouter } from 'react-router-dom';
import './App.css';
import TopNavbar from './components/navigations/TopNavbar';
import Headlines from './pages/Headlines';
import SearchNews from './pages/SearchNews';
import ReadingPage from './pages/ReadingPage';
import News from './pages/News';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: '',
    };
    this.handleChangeSearch = this.handleChangeSearch.bind(this);
  }

  handleChangeSearch(value) {
    this.setState({ searchValue: value });
    this.handleSearch(value);
  }

  handleSearch = (searchValue) => {
    this.props.history.push(`/search?query=${searchValue}`); // Use history.push to navigate
  };

  render() {
    const { searchValue } = this.state;

    return (
      <div className="root">
        <TopNavbar
          searchValue={searchValue}
          onSearchChange={this.handleChangeSearch}
        />
        <Switch>
          <Route exact path="/" component={Headlines} />
          <Route path="/search" render={() => <SearchNews search={searchValue} />} />
          <Route path="/read" component={ReadingPage} />
          <Route path="/news" render={() => <News />} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App); // Wrap App with withRouter