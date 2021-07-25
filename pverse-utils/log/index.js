const chalk = require("chalk");

const success = (msg, notice) => {
  console.log(`${chalk.green(notice ? notice : "success")} ${msg}`);
};

module.exports = {
    success
}