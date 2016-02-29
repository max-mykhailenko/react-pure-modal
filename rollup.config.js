import babel from 'rollup-plugin-babel';
import npm from 'rollup-plugin-npm';
import { argv } from 'yargs';

const format = argv.format || argv.f || 'amd';
const compress = argv.uglify;

const babelOptions = {
    presets: [ 'es2015-rollup', 'react' ],
    plugins: [
        'transform-object-rest-spread',
        'transform-export-extensions'
    ],
    babelrc: false
};

const dest = {
    amd:  'dist/amd/react-pure-modal.js',
    umd:  'dist/umd/react-pure-modal.js'
}[format];

export default {
    entry: 'src/index.js',
    format,
    plugins: [ babel(babelOptions), npm({ jsnext: true }) ],
    moduleName: 'reactPureModal',
    moduleId: 'reactPureModal',
    dest
};