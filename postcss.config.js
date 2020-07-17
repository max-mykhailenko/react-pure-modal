const autoprefixer = require('autoprefixer');
const csso = require('postcss-csso');

const plugins = [
  autoprefixer({ browsers: ['last 2 versions', 'not ie'] }),
];

if (process.env.NODE_ENV === 'production') {
  plugins.push(csso);
}

module.exports = {
  plugins,
};
