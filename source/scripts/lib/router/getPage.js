import generateMeta from '@/scripts/lib/router/generateMeta';

/**
 * Fetches a url's contents
 * @param {String} url The url to fetch
 */
export default url => fetch(url)
.then(response => response.text())
.then(text => {

    // The head element
    let head = text.match(/<head>([\s\S]*)<\/head>/i)[1],
        content = text.match(/<router-view>([\s\S]*)<\/router-view>/i)[1];
    
    // Return the component data
    return Promise.resolve({
        meta: generateMeta(head),
        template: `<div>${content}</div>`
    });

});