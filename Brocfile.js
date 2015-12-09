const concat = require('broccoli-concat');
const mergeTrees = require('broccoli-merge-trees');
const esTranspiler = require('broccoli-babel-transpiler');
const coffeescript = require('broccoli-coffee');
const uglifyJavaScript = require('broccoli-uglify-js');


/* 资源路径 */
const es6 = 'es6';
const coffee  = 'coffeescript';

/* es6 */
const es = esTranspiler(es6, {
  stage: 0,
  moduleIds: true,
  modules: 'amd',
});
/* 合并 */
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

/* 压缩 */
const uglifyEs = uglifyJavaScript(mainJs);
const uglifyCoffee = uglifyJavaScript(mainCoffee);



module.exports = mergeTrees([uglifyEs, uglifyCoffee]);