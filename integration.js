'use strict';

const async = require('async');

const { setLogger } = require('./src/logger');
const { createResultObject } = require('./src/create-result-object');
const { searchIp } = require('./src/search-ip');
const { version: packageVersion } = require('./package.json');

const MAX_TASKS_AT_A_TIME = 2;
const USER_AGENT = `abuseipdb-polarity-integration-v${packageVersion}`;
let Logger = null;

const startup = (logger) => {
  Logger = logger;
  setLogger(Logger);
};

const doLookup = async (entities, options, cb) => {
  Logger.trace({ entities }, 'doLookup');

  let lookupResults = [];
  const tasks = [];

  entities.forEach((entity) => {
    tasks.push(async () => {
      const searchResult = await searchIp(entity, options);
      const searchResultObject = createResultObject(entity, searchResult, options);
      lookupResults.push(searchResultObject);
    });
  });

  try {
    await async.parallelLimit(tasks, MAX_TASKS_AT_A_TIME);
  } catch (error) {
    Logger.error({ error }, 'Error in doLookup');
    return cb(error);
  }

  Logger.trace({ lookupResults }, 'Lookup Results');
  cb(null, lookupResults);
};

module.exports = {
  startup,
  doLookup
};
