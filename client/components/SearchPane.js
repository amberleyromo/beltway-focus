import React from 'react';

import { fetchData } from '../models/search';
import Visual from './Visual'


export default class SearchPane extends React.Component{
 
 constructor(props){
    super(props);
    this.state = {
    	searchTerm: '',
    	trendData: [],
    	error: null
    };
  }

  componentDidMount(){
  	// start with a sample search
  	fetchData('oil')
	    .then((data) => {
	      // every time we call setState(), component will rerender
	      this.setState({trendData: data})
	    })

  }

  doSearch(){
    this.setState({error: null});

    fetchData(this.state.searchTerm)
      .then((resp) => {
        this.setState({trendData: resp})
      })
      .catch((resp) => {
        console.log("response fail", resp)
        this.setState({error: resp});
      })
  }

   handleSearchInput(e){
    this.setState({searchTerm: e.currentTarget.value})
  }


  render(){
    return (
		<div className='wrapper'>
			<div className='search'>
				 { this.state.error !== null
			        ? <div className='error'> {this.state.error.error + ": " + this.state.error.reason} </div>
			        : null
			      }

			      <form onSubmit={function(e){ e.preventDefault() }}>

			        <input
			          type="text"
			          name="searchTerm"
			          value={this.state.searchTerm}
			          onInput={this.handleSearchInput.bind(this)}
			        />

			      </form>
			      
			      <button onClick={this.doSearch.bind(this)}> Do Search</button>
			   
		    </div>

		    <Visual data={this.state.trendData} />
		</div>
    );
  }
}
