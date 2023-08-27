const path = require('path');

module.exports = {
  entry: './trans/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'bundle'),
  },
};
