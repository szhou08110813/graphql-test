// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import "./commands";

// Alternatively you can use CommonJS syntax:
// require('./commands')

Cypress.on("fail", (error) => {
  // we now have access to the err instance
  // and the mocha runnable this failed on

  throw error; // throw error to have test still fail
});

Cypress.on("uncaught:exception", () => {
  // we expect a 3rd party library error with message
  // and don't want to fail the test so we return false
  return false;
});
