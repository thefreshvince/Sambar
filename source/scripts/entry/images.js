/**
 * Auto-include images
 */

// Regular images
require.context(
    '../../images',
    false,
    /\.(jpe?g|png|gif|svg)$/
);

// Favicon images
// require.context(
//     '../../images/favicon',
//     false,
//     /\.(jpe?g|png|gif|svg)$/
// );
