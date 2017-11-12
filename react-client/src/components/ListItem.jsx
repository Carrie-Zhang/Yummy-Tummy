import React from 'react';

const ListItem = (props) => (
  <div>
  <ul>
  	<li><a href={props.item.url} target="_blank">{ props.item.name }</a></li>
  	<li>Cuisine: { props.item. cuisines }</li>
  	<li>Rating: { props.item.user_rating }</li>
   </ul>
  </div>
)

export default ListItem;