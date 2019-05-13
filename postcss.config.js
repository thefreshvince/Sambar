const autoprefixer = require('autoprefixer'),
      cssnano = require('cssnano'),
      responsivefont = require('postcss-responsive-font');

module.exports = {
  plugins: [
    responsivefont,
    autoprefixer({
      browsers: [
        'last 20 versions', // Set really far back in hopes of generating old prefixes
        'ie 10-11'          // Getting specific
      ]
    }),
    cssnano({
      preset: 'default',
      zindex: false
    })
  ]
}
