import React from 'react';

import { fetchData } from '../models/search';
import Visual from './Visual'


export default class SearchPane extends React.Component{
 
 constructor(props){
    super(props);
    this.state = {
    	searchTerm: '',
    	trendData: [],
    	lastSearch: '',
    	error: null
    };
  }

  componentDidMount(){
  	// start with a sample search
  	fetchData('oil')
	    .then((data) => {
	      // every time we call setState(), component will rerender
	      this.setState({trendData: data})
	      this.setState({lastSearch: 'oil'})
	    })

  }

  doSearch(){
  	console.log('[SearchPane] new search term: ', this.state.searchTerm)
    this.setState({error: null});

    fetchData(this.state.searchTerm)
      .then((resp) => {
      	console.log('[SearchPane] new trendData: ', resp);
        this.setState({trendData: resp})
        this.setState({lastSearch: resp})
      })
      .catch((resp) => {
        console.log("doSearch response fail", resp)
        this.setState({error: resp});
      })
  }

   handleSearchInput(e){
    this.setState({searchTerm: e.currentTarget.value})
  }


  render(){
    return (
		<div className='mainWrapper'>
			<div className='searchWrapper'>
				<div className='container'>
				<div className='six columns'>
				 { this.state.error !== null
			        ? <div className='error'> {this.state.error.error + ": " + this.state.error.reason} </div>
			        : null
			      }

			      <h1>Beltway Focus</h1>
			    </div>

			    <div className='six columns'>
			      <form onSubmit={function(e){ e.preventDefault() }}>
			        <input
			          type="text"
			          name="searchTerm"
			          value={this.state.searchTerm}
			          onInput={this.handleSearchInput.bind(this)}
			        />
			        <button onClick={this.doSearch.bind(this)}> Do Search</button>
			      </form>
		    	</div>
		    	</div>
		    </div>

		    <div className='searchTermWrapper'>
			    <div className='container'>
		    		<div className='twelve columns'>
		    			{ this.state.lastSearch.length > 0
				            ? <p>Current search term: '{this.state.lastSearch}'</p>
				            : null
				        }

		    		</div>
		    	</div>
	    	</div>

		    <div className='chartWrapper'>
			    { this.state.trendData.length > 0
		            ? <Visual data={this.state.trendData} />
		            : null
		        }
	       	</div>   	
		</div>
    );
  }
}
