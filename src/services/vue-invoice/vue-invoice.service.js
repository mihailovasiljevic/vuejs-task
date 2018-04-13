// Initializes the `vue_invoice` service on path `/vue-invoice`
const createService = require('feathers-sequelize');
const createModel = require('../../models/vue-invoice.model');
const hooks = require('./vue-invoice.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'vue-invoice',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/vue-invoice', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('vue-invoice');

  service.hooks(hooks);
};
