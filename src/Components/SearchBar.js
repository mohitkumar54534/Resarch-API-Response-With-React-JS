import React, { Component } from 'react';
import './SearchBar.css';

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      mode: 'academic', 
      searchResults: [], 
      isSiteUnderMaintenance: false,
    };
  }

  handleSearchModeChange = (mode) => {
    this.setState({ mode });
    this.handleSearch();
  }

  handleQueryChange = (event) => {
    this.setState({ query: event.target.value });
  }

  handleSearch = () => {
    const { query, mode } = this.state;
    if (query.toLowerCase().includes('climate')) {
      let results = [];
      if (mode === 'academic') {
        results = [
          'Climate refers to the long-term patterns of temperature, humidity, wind, and precipitation in an area.',
          'It plays a crucial role in ecosystems and weather patterns.',
          'Climate change is a pressing global issue that is affecting our planet.'
        ];
      } else if (mode === 'non-academic') {
        results = [
          'Climate can also refer to the general feeling or atmosphere of a place or situation.',
          'For example, "The political climate in the country is tense."',
          'In non-academic contexts, climate may have metaphorical meanings.'
        ];
      }
      
      this.setState({ searchResults: results });
      this.setState({ isSiteUnderMaintenance: false });
    } else {
      this.setState({ searchResults: [] });
      this.setState({ isSiteUnderMaintenance: true });
    }
  }

  render() {
    return (
      <div>
        <input
          type="text"
          placeholder="Search..."
          value={this.state.query}
          onChange={this.handleQueryChange}
        />
        <button onClick={this.handleSearch}>Search</button>

        <div className="toggle-button">
          <button
            onClick={() => this.handleSearchModeChange('academic')}
            className={this.state.mode === 'academic' ? 'selected' : ''}
          >
            Academic
          </button>
          <button
            onClick={() => this.handleSearchModeChange('non-academic')}
            className={this.state.mode === 'non-academic' ? 'selected' : ''}
          >
            Non-Academic
          </button>
        </div>

        <div>
          <h3>Search Results:</h3>
          {this.state.isSiteUnderMaintenance ? (
            <p>Site is under maintenance. Please try again later.</p>
          ) : (
            <ul>
              {this.state.searchResults.map((result, index) => (
                <li key={index}>{result}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    );
  }
}

export default SearchBar;
