import React from 'react';

// this will be a stateless component
// child of SearchBar, which fetches search term data and passes it down
export default class Visual extends React.Component{
  render(){
    return (
      <div className='visual'>
        <h1> Welcome to visual </h1>
        { this.props.data.map((yearData, index) => {

          return <div key={index} className='data'>
            <p> { 'year: ' + yearData.year + ' count: ' + yearData.count }</p>
          </div>
        
        })}
      </div>
    );
  }
}
