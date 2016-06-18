// React package that deals with DOM interactions
import ReactDOM from 'react-dom';

// React package for constructing components (and all non-DOM related actions)
import React from 'react';


// Import React component from SearchPane
import SearchPane from './components/SearchPane';

// Render component to DOM!
ReactDOM.render(<SearchPane />, document.getElementById('app'));
