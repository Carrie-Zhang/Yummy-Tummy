import React from 'react';
import List from './List.jsx';

class Search extends React.Component {
  constructor(props) {
  	console.log('props', props);
  	super(props);
  	this.state = {
  		term: ''
  	}
  	this.onChange = this.onChange.bind(this);
  	this.search = this.search.bind(this);
  }

  onChange(e) {
    this.setState({ term: e.target.value });
  }

  search() {
  	this.props.onSearch(this.state.term);
  }

  render() {
  	return (<div>
        Search Restaurants by cuisines: <input value={this.state.term} onChange={this.onChange}/>     
       	<button onClick={this.search}> Search </button>
      </div>)
  }

}

export default Search;