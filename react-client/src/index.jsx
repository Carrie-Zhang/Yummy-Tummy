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
  }

  search(term) {
    $.ajax({
      url: 'http://127.0.0.1:3000',
      type: 'POST',
      data: JSON.stringify(term),
      contextType: 'application/json',
      success: (data) => {
        console.log('Success', data);
      },
      fail: (err) => {
        console.log('Fail');
      }
    })
  }

  componentDidMount() {
    $.ajax({
      url: '/items', 
      type: 'GET',
      success: (data) => {
        this.setState({
          items: data
        })
      },
      error: (err) => {
        console.log('err', err);
      }
    });
  }

  render () {
    return (<div>
      <h1>Item List</h1>
      <List items={this.state.items}/>
      <Search onSearch={this.search.bind(this)}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));