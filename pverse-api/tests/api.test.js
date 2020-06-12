"use strict";

const test = require("ava");
const request = require("supertest");
const sinon = require("sinon");
const proxyquire = require("proxyquire");

const {
  fixtures: { agent: agentFixtures, metric: metricFixtures },
} = require("pverse-utils");

let sandbox = null;
let server = null;
let dbStub = null;
let AgentStub = {};
let MetricStub = {};
let uuid = "yyy";
let notfoundtype = "notfoundtype";

//console.log(agentFixtures);

test.beforeEach(async () => {
  sandbox = sinon.createSandbox() // it creates an environment for each test, as this way, each test with the same files referetions won't generate conflicts

  dbStub = sandbox.stub();
  dbStub.returns(
    Promise.resolve({
      Agent: AgentStub,
      Metric: MetricStub,
    })
  );

  	AgentStub.findConnected = sandbox.stub();
  	AgentStub.findConnected.returns(Promise.resolve(agentFixtures.connected));

  	// Model findById Stub
  	AgentStub.findById = sandbox.stub()
  	AgentStub.findById
    .withArgs(uuid)
    .returns(Promise.resolve(agentFixtures.byUuid(uuid)));

  	MetricStub.findByAgentUuid = sandbox.stub();
	MetricStub.findByAgentUuid
    .withArgs(uuid)
	.returns(Promise.resolve(metricFixtures.byAgentUuid(uuid)));
	
	MetricStub.findByTypeAgentUuid = sandbox.stub();
	MetricStub.findByTypeAgentUuid
    .withArgs(uuid)
    .returns(Promise.resolve(metricFixtures.findByTypeAgentUuid(uuid)));
	

	const api = proxyquire("../api", {
		"platziverse-db": dbStub,
	});

  server = proxyquire("../server", {
    "./api": api,
  });
});

test.afterEach(() => {
 sandbox && sandbox.restore();
});

test.serial.cb("/api/agents", (t) => {
  request(server)
    .get("/api/agents")
    .expect(200)
    .expect("Content-Type", /json/)
    .end((err, res) => {
      t.falsy(err, "should not return an error");
      let body = JSON.stringify(res.body);
      let expected = JSON.stringify(agentFixtures.connected);
      t.deepEqual(body, expected, "response body should be the expected");
      t.end();
    });
});

test.serial.cb("/api/agent/:uuid", (t) => {
  request(server)
    .get(`/api/agent/${uuid}`)
    .expect(200)
    .expect("Content-Type", /json/)
    .end((err, res) => {
      t.falsy(err, "should not return an error");
      let body = JSON.stringify(res.body);
      let expected = JSON.stringify(agentFixtures.byUuid(uuid));
      t.deepEqual(body, expected, "response body should be the expected");
      t.end();
    });
});

test.serial.cb("/api/agent/:uuid  - not found", (t) => {
  request(server)
    .get(`/api/agent/111`)
    .expect(200)
    .expect("Content-Type", /json/)
    .end((err, res) => {
		t.true(err instanceof Error, "should return an error");
		let body = JSON.stringify(res.body);
		let expected = JSON.stringify({
			error: "Agent not found with uuid 111",
		});
		t.deepEqual(body, expected, "response body should be the expected");
		t.end();
    });
});

test.serial.cb("/api/metrics/:uuid", (t) => {
  request(server)
    .get(`/api/metrics/${uuid}`)
    .expect(200)
    .expect("Content-Type", /json/)
    .end((err, res) => {
     	 t.falsy(err, "should not return an error");
      	let body = JSON.stringify(res.body);
		let expected = JSON.stringify(metricFixtures.byAgentUuid(uuid));
      	t.deepEqual(body, expected, "response body should be the expected");
      	t.end();
    });
});

test.serial.cb("/api/metrics/:uuid - not found", (t) => {
  request(server)
    .get(`/api/metrics/111`)
    .expect(200)
    .expect("Content-Type", /json/)
    .end((err, res) => {
		t.true(err instanceof Error, "should return an error");
		let body = JSON.stringify(res.body);
		let expected = JSON.stringify({
			error: "Metrics not found for agent with uuid 111",
		});
		t.deepEqual(body, expected, "response body should be the expected");
		t.end();
    });
});


test.serial.cb(`/api/metrics/${uuid}/temp`, (t) => {
  request(server)
    .get(`/api/metrics/${uuid}/temp`)
    .expect(200)
    .expect("Content-Type", /json/)
    .end((err, res) => {
		t.falsy(err, "should not return an error");
		let body = JSON.stringify(res.body);
		let expected = JSON.stringify(metricFixtures.findByTypeAgentUuid(uuid));
		t.deepEqual(body, expected, "response body should be the expected");
		t.end();
    });
});

test.serial.cb(`/api/metrics/:uuid/:type - not found`, (t) => {
  request(server)
    .get(`/api/metrics/${uuid}/${notfoundtype}`)
    .expect(200)
    .expect("Content-Type", /json/)
    .end((err, res) => {
		t.true(err instanceof Error, "should return an error");
		let body = JSON.stringify(res.body);
		let expected = JSON.stringify({
			error: `Metrics (${notfoundtype}) not found for agent with uuid ${uuid}`,
		});
		t.deepEqual(body, expected, "response body should be the expected");
		t.end();
    });
});

//test.serial.todo("/api/metrics/:uuid/:type");
//test.serial.todo("/api/metrics/:uuid/:type - not found");
