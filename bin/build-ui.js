'use strict';
const path = require('path');
const { h, Text } = require('ink');
const SelectInput = require('ink-select-input');
const opn = require('opn');
const { menuData } = require('./build');

const open = url => opn(url, { wait: false });

const handleSelect = item => {
  if (item.url) {
    open(item.url);
  }

  if (item.action) {
    item.action();
  }
};

module.exports = () => (
  <div>
    <div>
      <Text>
        I’m a Frontend Web Developer making things open source applications, app
        plugins using Reac<span>t</span>.js, Reac<span>t</span> Native, node.js,
        JavaScript, redux, GraphQL, styled-components, emotion etc..
      </Text>
    </div>
    <br />
    <SelectInput items={menuData} onSelect={handleSelect} />
  </div>
);
