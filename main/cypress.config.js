const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  viewportWidth: 1846,
  viewportHeight: 933,
  defaultCommandTimeout: 10000,
})
