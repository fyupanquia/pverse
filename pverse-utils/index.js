const json = require('./modules/json')
const db = require("./modules/db");
const agent = require("./fixtures/agent");
const metric = require("./fixtures/metric");

module.exports = {
  db,
  json,
  fixtures: {
    agent,
    metric
  },
};
