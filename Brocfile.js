const concat = require('broccoli-concat');
const mergeTrees = require('broccoli-merge-trees');
const esTranspiler = require('broccoli-babel-transpiler');
const coffeescript = require('broccoli-coffee');
const uglifyJavaScript = require('broccoli-uglify-js');


/* folder */
const es6 = 'es6';
const coffee  = 'coffeescript';

/* es6 */
const es = esTranspiler(es6, {
  stage: 0,
  moduleIds: true,
  modules: 'amd',
});
/* contact */
const mainJs = concat(es, {
  inputFiles: [
    '**/*.js'
  ],
  outputFile: '/js/es.js'
});

/* coffeescript */
const cf = coffeescript(coffee, {
	bare: true
});

const mainCoffee = concat(cf, {
	inputFiles: [
	  '**/*.js'
	],
	outputFile: '/js/coffee.js'
});

/* uglify */
const uglifyEs = uglifyJavaScript(mainJs);
const uglifyCoffee = uglifyJavaScript(mainCoffee);



module.exports = mergeTrees([uglifyEs, uglifyCoffee]);