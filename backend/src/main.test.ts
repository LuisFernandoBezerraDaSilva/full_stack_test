import 'jest';
(global as any).IS_TESTING = true;
import request from "supertest";
import { exec } from "child_process";
import isArray from "./helpers/is-array";
import app from "./main";
import sqlite3 from "sqlite3";
import {
  EndpointTest,
  EndpointTestMethod,
  makeEndpointTests,
} from "./tests/endpoint-test";

const endpointsToTest = makeEndpointTests();

const checkResponse = (response: any, expectedResponse: any) => {
  if (isArray(expectedResponse)) {
    if (!isArray(response)) {
      throw { msg: "Isnt equals", response, expectedResponse };
    }
    (response as any[]).forEach((responsItem, index) =>
      checkResponse(responsItem, response[index]),
    );
    return;
  }
  const props = Object.keys(expectedResponse);
  for (const prop of props) {
    console.log(`Prop: ${prop}`, expectedResponse, response);
    expect(response[prop]).toBe(expectedResponse[prop]);
  }
};

describe("Api status tests", () => {
let db = new sqlite3.Database(':memory:', (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Conectado ao banco de dados SQLite na memória.');
});

  afterAll((done) => {
    let db = new sqlite3.Database(':memory:', (err) => {
      if (err) {
        return console.error(err.message);
      }
      console.log('Conectado ao banco de dados SQLite na memória.');
    });

    db.serialize(() => {
      db.run("DROP TABLE IF EXISTS tests", (err) => {
        if (err) {
          return console.error(err.message);
        }
      });

      db.run("CREATE TABLE tests (id INT PRIMARY KEY NOT NULL)", (err) => {
        if (err) {
          return console.error(err.message);
        }
      });
    });

    db.close((err) => {
      if (err) {
        return console.error(err.message);
      }
      console.log('Fechou a conexão com o banco de dados SQLite.');
      done();
    });
  });

  beforeAll((done) => {
    let db = new sqlite3.Database(':memory:', (err) => {
      if (err) {
        console.error(err.message);
      } else {
        console.log('Conectado ao banco de dados SQLite na memória.');
      }
    });
  
    db.serialize(() => {
      db.run("DROP TABLE IF EXISTS tests", (err) => {
        if (err) {
          console.error(err.message);
        }
      });
  
      db.run("CREATE TABLE tests (id INT PRIMARY KEY NOT NULL)", (err) => {
        if (err) {
          console.error(err.message);
        }
      });
    });
  
    db.close((err) => {
      if (err) {
        console.error(err.message);
      } else {
        console.log('Fechou a conexão com o banco de dados SQLite.');
      }
    });
  
    exec("prisma migrate dev", { env: process.env }, (err, stdout) => {
      if (err) {
        console.error(err);
      } else {
        console.log(stdout);
      }
    });
  
    exec("ts-node src/migrations/migration.ts", { env: process.env }, (err) => {
      if (err) {
        console.error(err);
      }
      done();
    });
  }, 6e5);

  test("It should response the heart beat request", (done) => {
    request(app)
      .get("/heart-beat/")
      .then((response) => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });

  test("It should do the web API tests", async () => {
    const state: any = {};
    let currentResponse: any = {};
    const checkEndpointResponse = (
      response: request.Response,
      endpoint: EndpointTest,
    ) => {
      currentResponse = response?.body || {};
      if (endpoint.expectedResponseCode) {
        expect(response.statusCode).toBe(endpoint.expectedResponseCode);
      }
      checkResponse(response.body, endpoint.expectedResponseBody || {});
    };

    const testsTotal = endpointsToTest.length;
    let current = 0;
    for (const endpoint of endpointsToTest) {
      const epTry = async () => {
        console.log(`${++current} of ${testsTotal}`);
        console.log(endpoint.path);
        let requestChain: any = request(app);
        if (endpoint.beforeExecute) {
          await endpoint.beforeExecute(state);
        }
        switch (endpoint.method) {
          case EndpointTestMethod.GET:
            requestChain = requestChain
              .get(endpoint.path)
              .set(endpoint.requestHeaders)
              .then((response: request.Response) =>
                checkEndpointResponse(response, endpoint),
              );
            await requestChain;
            break;
          case EndpointTestMethod.POST:
            requestChain = requestChain
              .post(endpoint.path)
              .send(endpoint.requestBody)
              .set(endpoint.requestHeaders)
              .then((response: request.Response) =>
                checkEndpointResponse(response, endpoint),
              );
            await requestChain;
            break;
          case EndpointTestMethod.PUT:
            requestChain = requestChain
              .put(endpoint.path)
              .send(endpoint.requestBody)
              .set(endpoint.requestHeaders)
              .then((response: request.Response) =>
                checkEndpointResponse(response, endpoint),
              );
            await requestChain;
            break;
          case EndpointTestMethod.DELETE:
            requestChain = requestChain
              .delete(endpoint.path)
              .set(endpoint.requestHeaders)
              .then((response: request.Response) =>
                checkEndpointResponse(response, endpoint),
              );
            await requestChain;
            break;
          // TODO more
          default:
            console.warn("Invalid endpoint test", endpoint);
        }
        if (endpoint.afterExecute) {
          await endpoint.afterExecute(state, currentResponse);
        }
      };
      let tries = 0;
      do {
        try {
          await epTry();
          break;
        } catch (err) {
          if (tries === 5) {
            throw err;
          }
          console.warn(err);
        }
        continue;
      } while (++tries);
    }
  }, 5e4);
});
