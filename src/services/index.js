const vueInvoice = require('./vue-invoice/vue-invoice.service.js');
const users = require('./users/users.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(vueInvoice);
  app.configure(users);
};
