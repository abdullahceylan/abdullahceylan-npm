#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const meow = require('meow');
const importJsx = require('import-jsx');
const { h, render } = require('ink');

const ui = importJsx('./build-ui');

const binDir = require.resolve('./card.js');
const datFile = path.resolve(
  path.dirname(binDir),
  process.stdout.isTTY ? 'card.color' : 'card.plain'
);

meow(`
	Usage
	  $ abdullahceylan
`);

fs.readFile(datFile, (error, buffer) => {
  if (error) {
    console.error(`Error reading card data: ${error}`);
    process.exit(1);
  } else {
    console.info(buffer.toString());
  }
});

render(h(ui));
