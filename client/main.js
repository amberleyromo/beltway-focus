// React package that deals with DOM interactions
import ReactDOM from 'react-dom';

// React package for constructing components (and all non-DOM related actions)
import React from 'react';


// Import React component from SearchPane
import App from './components/App';

// Render component to DOM!
ReactDOM.render(<App />, document.getElementById('app'));
