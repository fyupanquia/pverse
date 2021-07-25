const json = require('./modules/json')
const db = require("./modules/db");
const emit = require("./modules/emit");
const agent = require("./fixtures/agent");
const metric = require("./fixtures/metric");
const auth = require("./modules/auth");
const error = require("./error");
const log = require("./log");

module.exports = {
  db,
  json,
  auth,
  emit,
  fixtures: {
    agent,
    metric,
  },
  error,
  log,
};
