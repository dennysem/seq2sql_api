import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class SearchBar extends Component {
  state = {
    query: ''
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.props.makeQuery(this.state.query);
    this.setState({ query: '' });
  }

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  render() {
    return (
      <form onSubmit={this.onSubmit} style={{ display: 'flex' }}>
        <input
          type="text"
          name="query"
          style={{ flex: '10', padding: '5px' }}
          placeholder="Ask a question"
          value={this.state.query}
          onChange={this.onChange}
        />
        <input
          type="submit"
          value="Submit"
          className="btn"
          style={{flex: '1'}}
        />
      </form>
    )
  }
}

// PropTypes
SearchBar.propTypes = {
  makeQuery: PropTypes.func.isRequired
}

export default SearchBar