import React from 'react'

// App component has one child component
import SearchPane from './SearchPane'
//import Visual from './Visual'


// parent App contains state across the whole app
  // we pass it down to child components
export default class App extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      
    }
  }

  render(){
    return <div>
      <SearchPane />
    </div>
  }
}
