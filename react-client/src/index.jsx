import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import List from './components/List.jsx';
import Search from './components/Search.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      items: []
    }
    this.search = this.search.bind(this);
  }

  search(term) {
    //console.log('client index term:', term);
    $.ajax({
      url: 'http://127.0.0.1:3000/items',
      type: 'POST',
      data: JSON.stringify({cuisine: term}),
      contentType: 'application/json',
      success: (data) => {
        this.getRestaurants();
        console.log('Success', data);
      },
      error: (err, x) => {
        console.log('Fail',x);
      }
    })
  }

  componentDidMount() {
    this.getRestaurants();
  }

  getRestaurants() {
    $.ajax({
      url: 'http://127.0.0.1:3000/items', 
      type: 'GET',
      success: (data) => {
        console.log('client get data: ', typeof data);
        this.setState({
          items: data
        })
      },
      error: (err) => {
        console.log('Client get err', err);
      }
    });
  }


  render () {
    return (<div>
      <h1>Item List</h1>
      <List items={this.state.items}/>
      <Search onSearch={this.search}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));