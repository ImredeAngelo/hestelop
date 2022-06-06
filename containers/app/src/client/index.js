import React from 'react'
// import StyleContext from 'isomorphic-style-loader/StyleContext'
// import { BrowserRouter as Router } from 'react-router-dom'
// import { hydrateRoot } from 'react-dom/client';
import { createRoot } from 'react-dom/client';
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
const container = document.getElementById('root');
const root = createRoot(container);

root.render(<App/>);
