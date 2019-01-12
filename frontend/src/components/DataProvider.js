import React, { Component } from "react";
import PropTypes from "prop-types";
class DataProvider extends Component {
  static propTypes = {
    endpoint: PropTypes.string.isRequired,
    render: PropTypes.func.isRequired,
    query: PropTypes.string.isRequired,
    data_source: PropTypes.string.isRequired,
  };
  state = {
      data: [],
      loaded: false,
      placeholder: "Loading...",
      loaded_query: "asda"
    };

  load() {
    console.log(this.props.endpoint)

    fetch(this.props.endpoint, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                data_source: this.props.data_source,
                query: this.props.query,
            })
        },
    ).then(response => {
        if (response.status !== 200) {
          return this.setState({ placeholder: "Something went wrong" });
        }
        return response.json();
      })
      .then(data => this.setState({ data: data['rows'], loaded: true , loaded_query: this.props.query}));
  }

  render() {
    console.log('asa')
    if (this.props.query !== this.state.loaded_query) {
        this.load()
    }
    const { data, loaded, placeholder } = this.state;
    return loaded ? this.props.render(data) : <p>{placeholder}</p>;
  }
}
export default DataProvider;