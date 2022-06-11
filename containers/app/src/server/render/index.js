// import { ChunkExtractor, ChunkExtractorManager } from '@loadable/server'
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
// import StyleContext from 'isomorphic-style-loader/StyleContext'
import { Helmet } from 'react-helmet'

import App from '../../client/app'
import HTMLTemplate from './index.template.html'

var template = 'Access Denied';

// Import template files
(function() {
    template = HTMLTemplate
        .replace(/^[ \t]<!--.*-->/gm, '')
        .replace(/<!--.*-->/g, '')
        .replace(/^[ \t]+\n/gm, '')
})()

// Insert dynamic data into template
function compose(request, markup, style, meta) {
    return template
     // .replace('${state}', JSON.stringify(state).replace(/</g,'\\u003c'))
        .replace('${meta}', meta)
        .replace('${lang}', 'no')
        .replace('${markup}', markup)
        // .replace('${scripts}', scripts)
        .replace('/* .style{} */', style)
}

function getMetaTags() {
    const helmet = Helmet.renderStatic();
    return `
        ${helmet.title.toString()}
        ${helmet.meta.toString()}
        ${helmet.link.toString()}
        ${helmet.script.toString()}
    `
}

// Render main app
export default function render(request, response) {
    // Critical CSS
    // const css = new Set()
    // const insertCss = (...styles) => styles.forEach(style => css.add(style._getCss()))

    // Loadable components
    // const statsFile = path.resolve('./stats.json')
    // const extractor = new ChunkExtractor({ statsFile })

    // User
    

    // Render main app
    const markup = ReactDOMServer.renderToString(
        // <ChunkExtractorManager manager={extractor}>
            <StaticRouter location={ request.url }>
                {/* <StyleContext.Provider value={{ insertCss }}> */}
                    <App/>
                {/* </StyleContext.Provider> */}
            </StaticRouter>
        // </ChunkExtractorManager>
    )
    
    // Dynamic data
    // const style = [...css].join('')
    const meta = getMetaTags()
    // const tags = extractor.getScriptTags()

    response.status(200).send(compose(request, markup, '', meta));
}