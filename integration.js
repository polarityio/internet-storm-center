'use strict';
const config = require('./config/config.json');
const {
  logging: { setLogger },
  requests: { PolarityRequest }
} = require('polarity-integration-utils');

let Logger;
let request;

function startup(logger) {
  Logger = logger;
  setLogger(logger);
  request = new PolarityRequest({
    defaults: {
      json: true
    },
    roundedSuccessStatusCodes: [200],
    requestOptionsToOmitFromLogsKeyPaths: []
  });
}

async function doLookup(entities, options, cb) {
  Logger.trace({ entities }, 'doLookup');

  const lookupResults = [];

  const requestOptions = entities.map((entity) => {
    return {
      resultId: entity,
      uri: `https://isc.sans.edu/api/ip/${entity.value}?json`
    };
  });
  
  const responses = await request.runInParallel(requestOptions);
  
  responses.forEach((response) => {
    lookupResults.push({
      entity: response.resultId,
      data: {
        summary: ['Hello'],
        details: response.result
      }
    });
  });

  Logger.info({ lookupResults }, 'lookupResults');

  cb(null, lookupResults);
}

module.exports = {
  doLookup,
  startup
};
