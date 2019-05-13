import generateMeta from '@/scripts/lib/router/generateMeta';

// Process ajax results
export default function processPage (text) {

    // The head element
    let head = text.match(/<head>([\s\S]*)<\/head>/i)[1],
        body_class = text.match(/<body.*class="(.+)">/i)[1],
        content = text.match(/<router-view[^>]*>([\s\S]*)<\/router-view>/i)[1],
        admin_bar = text.match(/(<div.+?wpadminbar[\s\S]+?)<\/body/);
    
    // remove style tags
    content = content.replace(/<style[\w\W]+<\/style>/ig, '');

    // Return the component data
    return Promise.resolve({
        meta: {
            body_class, 
            admin_bar: admin_bar ? admin_bar[1] : null,
            ...generateMeta(head)
        },
        template: `<div>${content}</div>`
    });

}