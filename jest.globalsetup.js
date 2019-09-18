const { setup: setupDevServer } = require('jest-dev-server')

module.exports = () => setupDevServer({ command: `node .`, port: 8000 })
