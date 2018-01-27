const autoprefixer = require('autoprefixer');
const csso = require('postcss-csso');

const plugins = [
  autoprefixer({ browsers: ['last 2 versions', 'ie >= 11'] }),
];

if (process.env.NODE_ENV === 'production') {
  plugins.push(csso);
}

module.exports = {
  plugins,
};
