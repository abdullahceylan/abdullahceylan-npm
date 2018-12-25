const chalk = require('chalk');
const fs = require('fs');
const path = require('path');
const boxen = require('boxen');
const opn = require('opn');
const { h, Text } = require('ink');
const SelectInput = require('ink-select-input');

const boxOptions = {
  padding: 1,
  margin: 1,
  bordStyle: 'round'
};

const card = (color, exp = false) => {
  const spacer = { label: '', value: '' };
  const red = t => (color ? chalk.red(t) : t);
  const blue = t => (color ? chalk.blue(t) : t);
  const grey = t => (color ? chalk.grey(t) : t);
  const white = t => (color ? chalk.white(t) : t);
  const green = t => (color ? chalk.green(t) : t);
  const boldWhite = t => (color ? chalk.white.bold(t) : t);

  const data = {
    name: {
      label: '',
      value: grey(
        `${boldWhite('Abdullah Musab Ceylan')} | ${blue('@abdullahceylan')}`
      )
    },
    work: {
      label: '',
      value: white(`Frontend Developer @ ${red('Creativouse')}`)
    },
    linkedin: {
      label: 'LinkedIn',
      url: grey(`https://linkedin.com/in/${blue('abdullahceylan')}`)
    },
    github: {
      label: 'Github',
      url: grey(`https://github.com/${blue('abdullahceylan')}`)
    },
    npm: {
      label: 'npm',
      url: grey(`https://npmjs.com/~${blue('abdullahceylan')}`)
    },
    twitter: {
      label: 'Twitter',
      url: grey(`https://twitter.com/${blue('ceylanabdullah')}`)
    },
    web: {
      label: 'Website',
      url: grey(`http://${blue('abdullahceylan')}.com`)
    },
    npx: {
      label: '$',
      value: red(`npx ${white('abdullahceylan')}`)
    },
    // TODO: Add separator item here when https://github.com/vadimdemedes/ink-select-input/issues/4 is done
    quit: {
      label: 'Quit',
      action() {
        process.exit(); // eslint-disable-line unicorn/no-process-exit
      }
    }
  };

  const cardLines = [
    data.name,
    data.work,
    spacer,
    data.linkedin,
    data.github,
    data.npm,
    data.twitter,
    data.web,
    spacer,
    data.npx
  ];

  if (exp) {
    return [
      data.web,
      data.linkedin,
      data.github,
      data.npm,
      data.twitter,
      data.quit
    ];
  }

  const maxLabelLen = Object.values(data).reduce(
    (m, d) => Math.max(m, d.label.length),
    0
  );
  const text = cardLines
    .map(({ label, value, url }) => {
      const pad = ' '.repeat(maxLabelLen - label.length);
      return boldWhite(`${pad}${label}  ${url ? url : value}`);
    })
    .join('\n');

  const buffer = Buffer.from(green(boxen(text, boxOptions)));

  return buffer;
};

module.exports = {
  menuData: card(null, true)
};

const binDir = require.resolve('./bin/card.js');
const colorFile = path.resolve(path.dirname(binDir), 'card.color');
const plainFile = path.resolve(path.dirname(binDir), 'card.plain');

const writeCard = (file, data, callback) => {
  fs.writeFile(file, data, error => {
    if (error) {
      console.error(`Error writing card to file ${file}:`, error);
      process.exit(1);
    } else if (callback) {
      callback();
    }
  });
};

writeCard(colorFile, card(true), () => writeCard(plainFile, card()));
