// scripts/Main.js
import React from 'react';
import ReactDOM from 'react-dom';
import ChatMain from './Components/ChatMain';

// required dependency for material ui
import injectTapEventPlugin from 'react-tap-event-plugin';
// Needed for onTouchTap 
// http://stackoverflow.com/a/34015469/988941 
injectTapEventPlugin();


ReactDOM.render(
 <ChatMain />,
 document.getElementById('root')
);
