/**
 * Generates meta tags for vue router
 * @param {String} head Thea <head>'s contents
 */
export default head => {
    
    // Get our tags
    let title = (head.match(/<title>([\s\S]*?)<\/title>/i)||['',''])[1];

    // return our meta object
    return {
        title
    };

};