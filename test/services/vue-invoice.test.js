const assert = require('assert');
const app = require('../../src/app');

describe('\'vue_invoice\' service', () => {
  it('registered the service', () => {
    const service = app.service('vue-invoice');

    assert.ok(service, 'Registered the service');
  });
});
