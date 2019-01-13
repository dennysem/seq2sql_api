import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/lib/Button';
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar';


class FastButton extends Component {
  static propTypes = {
    text: PropTypes.string.isRequired,
    action: PropTypes.func.isRequired,
  };

  render() {
    return (
      <Button onClick = {() => this.props.action(this.props.text)} style={{ padding: '7px 10px', margin: '5px', color:'#000'}}>
        { this.props.text }
      </Button>
    )
  }
}


export class SearchBar extends Component {
  state = {
    query: ''
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.props.makeQuery(this.state.query);
  }

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  updateQuery = (q) => this.setState({ query: q })

  updateQueryAndSubmit = (q) => {
    this.updateQuery(q);
    this.props.makeQuery(this.state.query);
  }

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit} style={{ display: 'flex' }}>
          <input
            type="text"
            name="query"
            style={{ flex: '10', padding: '10px' }}
            placeholder="Ask a question(or use template buttons below)"
            value={this.state.query}
            onChange={this.onChange}
          />
          <input
            type="submit"
            value="Submit"
            className="btn"
            style={{flex: '1', padding: '7px 10px', display: 'inline-block', border: 'none',  background: '#555', color: '#fff'}}
          />
        </form>
        <ButtonToolbar>
          <FastButton text="Group by Category" action={this.updateQueryAndSubmit}/>
          <FastButton text="Show teen apps" action={this.updateQueryAndSubmit}/>
          <FastButton text="Arcade game" action={this.updateQueryAndSubmit}/>
          <FastButton text="Genres of free apps" action={this.updateQueryAndSubmit}/>
          <FastButton text="Monetization distribution" action={this.updateQueryAndSubmit}/>
          <FastButton text="Average ratings for different Category, Type and Genre" action={this.updateQueryAndSubmit}/>
          <FastButton text="How do ratings depend on content" action={this.updateQueryAndSubmit}/>
          <FastButton text="Most popular genres" action={this.updateQueryAndSubmit}/>
          <FastButton text="Which genres have the highest rating" action={this.updateQueryAndSubmit}/>
          <FastButton text="Productivity apps by type" action={this.updateQueryAndSubmit}/>
          <FastButton text="Group by Category and Type and Genre" action={this.updateQueryAndSubmit}/>
          <FastButton text="Ratings for different genres in paid segment" action={this.updateQueryAndSubmit}/>
          <FastButton text="Filter free teen apps" action={this.updateQueryAndSubmit}/>
          <FastButton text="All apps" action={this.updateQueryAndSubmit}/>
        </ButtonToolbar>
      </div>
    )
  }
}

// PropTypes
SearchBar.propTypes = {
  makeQuery: PropTypes.func.isRequired
}

export default SearchBar