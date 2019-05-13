import processPage from '@/scripts/lib/router/processPage';

/**
 * Fetches a url's contents
 * @param {String} url The url to fetch
 */
export default url => fetch(url)
.then(response => response.text())
.then(processPage);