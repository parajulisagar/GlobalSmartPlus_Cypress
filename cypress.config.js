module.exports = {
  chromeWebSecurity: false,
  failOnStatusCode: false,
  projectId: 'hxqcm3',
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      return require('./cypress/plugins/index.js')(on, config)
    },
    baseUrl: 'https://dev-customer.swifttech.com.np',
    specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx}',
  },
}
