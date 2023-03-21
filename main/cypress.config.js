const { defineConfig } = require("cypress")

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      require('@cypress/code-coverage/task')(on, config)
      on('file:preprocessor', require('@cypress/code-coverage/use-babelrc'))
      return config

      // include any other plugin code...

      // It's IMPORTANT to return the config object
      // with any changed environment variables
    },
  },
  viewportWidth: 1846,
  viewportHeight: 933,
  defaultCommandTimeout: 10000,
})
