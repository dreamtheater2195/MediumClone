#!/usr/bin/env node

const shelljs = require("shelljs");
const animateProgress = require("./helpers/progress");
const chalk = require("chalk");
const addCheckMark = require("./helpers/checkmark");

const progress = animateProgress("Generating stats");

// Generate stats.json file with webpack
shelljs.exec(
  "webpack --config internals/webpack/webpack.prod.babel.js --profile --json > stats.json",
  addCheckMark.bind(null, callback), // Output a checkmark on completion
);

// Called after webpack has finished generating the stats.json file
function callback() {
  clearInterval(progress);
  process.stdout.write(
    // eslint-disable-next-line
    "\n\nOpen " +
      chalk.magenta("http://webpack.github.io/analyse/") +
      " in your browser and upload the stats.json file!" +
      chalk.blue(
        // eslint-disable-next-line
        "\n(Tip: " + chalk.italic("CMD + double-click") + " the link!)\n\n",
      ),
  );
}
