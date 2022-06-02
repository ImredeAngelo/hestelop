import React from 'react'
// import StyleContext from 'isomorphic-style-loader/StyleContext'
// import { BrowserRouter as Router } from 'react-router-dom'
import { hydrate } from 'react-dom'
// import { Workbox } from 'workbox-window'

import App from './app'

// TODO: Remove critical CSS after page is loaded OR include all sass in 
// const insertCss = (...styles) => {
//     const removeCss = styles.map(style => style._insertCss())
//     return () => removeCss.forEach(dispose => dispose())
// }

// Register service worker
// if (navigator.serviceWorker) {
//     const wb = new Workbox('/worker.js');
    
//     // Hot reload
//     if(process.env.NODE_ENV == "development")
//         wb.addEventListener('waiting', () => wb.messageSkipWaiting());
    
//     wb.register();
// }

// Render app
hydrate(
  // <Router>
    // <StyleContext.Provider value={{ insertCss }}> 
      <App/>,
    // </StyleContext.Provider>
  // </Router>
  document.getElementById('root')
)