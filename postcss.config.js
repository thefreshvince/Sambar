const autoprefixer = require('autoprefixer');

module.exports = {
  plugins: [
    autoprefixer({
      browsers: [
        'last 50 versions', // Set really far back in hopes of generating old prefixes
        'ie 10-11'          // Getting specific
      ]
    })
  ]
}
