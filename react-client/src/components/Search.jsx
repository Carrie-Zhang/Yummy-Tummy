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
  	this.onChange = this.search.bind(this);
  }

  onChange(e) {
  	console.log('onChange: ', e.target.value)
    this.setState({ items: e.target.value });
  }

  search() {
  	this.props.onSearch(this.state.items);
  }

  render() {
  	return (<div>
  		<br>
  		</br>
  		<form>
    	<label>
        Search Restaurants: <input value={this.term} onChange={this.onChange}/>     
       	<button onClick={this.props.search}> Search </button>
       	</label>
       </form>
      </div>)
  }

}

export default Search;