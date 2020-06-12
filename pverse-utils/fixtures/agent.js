"use strict";

const agent = {
  id: 1,
  uuid: "yyy",
  username: "platzi",
  name: "test",
  hostname: "alp-pc",
  pid: 10,
  connected: true,
  createdAt: "2020-06-11T23:31:55.376Z",
  updatedAt: "2020-06-11T23:31:55.376Z",
};

const agents = [
  agent,
  extend(agent, {
    id: 2,
    uuid: "zzz",
    createdAt: "2020-06-11T23:52:28.419Z",
    updatedAt: "2020-06-12T00:08:02.808Z",
  }),
  //extend(agent, { id: 3, uuid: "yyy-yyy-yyx" }),
  //extend(agent, { id: 4, uuid: "yyy-yyy-yyz", username: "test" }),
];

function extend(obj, values) {
  const clone = Object.assign({}, obj);
  return Object.assign(clone, values);
}

module.exports = {
  single: agent,
  all: agents,
  connected: agents.filter((a) => a.connected),
  platzi: agents.filter((a) => a.username === "platzi"),
  byUuid: (id) => agents.filter((a) => a.uuid === id).shift(),
  byId: (id) => agents.filter((a) => a.id === id).shift(),
};
