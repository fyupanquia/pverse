"use strict";

const metric = {
    type: "memoria",
};

const metrics = [
  metric,
  extend(metric, {
    type: "temp"
  }),
];

const AgentYYYTemp = [
  {
    id: 2,
    type: "temp",
    value: "22",
    createdAt: "2020-06-11T23:31:55.820Z",
  },
];

function extend(obj, values) {
  const clone = Object.assign({}, obj);
  return Object.assign(clone, values);
}

module.exports = {
  byAgentUuid: (id) => metrics,
  findByTypeAgentUuid: (id) => AgentYYYTemp,
  //byUuid: (id) => agents.filter((a) => a.uuid === id).shift(),
  //byId: (id) => agents.filter((a) => a.id === id).shift(),
};
