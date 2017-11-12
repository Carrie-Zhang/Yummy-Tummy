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
  	console.log('in Search Component');
  	this.props.onSearch(this.state.term);
  }

  render() {
  	return (<div>
  		<br>
  		</br>
  	

        Search Restaurants: <input value={this.state.term} onChange={this.onChange}/>     
       	<button onClick={this.search}> Search </button>

 
      </div>)
  }

}

export default Search;