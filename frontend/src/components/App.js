import React, { Component } from "react";
import ReactDOM from "react-dom";
import DataProvider from "./DataProvider";
import Table from "./Table";
import SearchBar from "./SearchBar";

class App extends Component {
    state = {
        query: '',
        data_source: 'google_play',
    }

    makeQuery = (query) => {
        this.setState({ query: query });
    }

    render() {
        console.log(this.state.query)
        return (
            <div className="App">
              <div className="container">
                <SearchBar makeQuery={ this.makeQuery } />
                <DataProvider endpoint="api/parse/"
                    query={ this.state.query }
                    data_source={ this.state.data_source }
                    render={data => <Table data={data} />} />
              </div>
            </div>
        );
    }

}

const wrapper = document.getElementById("app");
wrapper ? ReactDOM.render(<App />, wrapper) : null;