/**
 * The purpose of this webworker is to make a request on
 * a seperate thread so that the current thread can maintain
 * decent performance.
 */

// Store the pages
let pages = {},
    urls = [
        // list all preloadable pages here
        '/sample-page'
    ].reverse();

// prefetch pages
prefetchMainPages();

// When receiving a request, run the ajax q
onmessage = e => makeRequest(e.data);

// do the ajax and return the results
function makeRequest ({url,type}, cb = postMessage) {
    if(type == 'currentPage') return removeCurrentPage(url);
    if(pages[url]) return cb(pages[url]);
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.onload = function() {
        if (xhr.status === 200) 
            cb({
                url: url,
                content: storePageResults(xhr.responseText, url),
                type: type
            });
        else console.error(`${xhr.status} ${url}`);
    };
    xhr.send();
}

// prefetches page routes
function prefetchMainPages () {

    // Skip out if we've already done our fetches
    if(!urls.length) return;

    // get the next url
    let max_urls_per_load = 5;

    // loop through the urls and load 5 at a time
    while (max_urls_per_load-- && urls.length) {

        // pop a url off
        let url_pos = max_urls_per_load,
            url = urls.pop();

        // Make a request
        makeRequest({url, type:'prefetch'}, data => {
            postMessage(data);
            if(!url_pos) prefetchMainPages();
        });
    
    }

}

// stores the results
function storePageResults (response, url) {
    console.log(`%c ✔ Fetched: ${url}`, 'color: #4BB543');
    pages[url] = response;
    return response;
}

// remove the current page from url list
function removeCurrentPage (url) {
    let current_page_slug = url.match(/(?:.*?\/){2}[^\/]+(.+)/);
    if(current_page_slug && (current_page_slug = current_page_slug[1])) {
        for(let i = 0, l = urls.length; i < l; i++) {
            if(urls[i] == current_page_slug) {
                console.log(`%c ✔ Initial Page: ${current_page_slug}`, 'color: #4BB543');
                urls.splice(i,1);
                break;
            }
        }
    }
} 