'use strict'

module.exports = {
  endpoint: process.env.API_ENDPOINT || 'http://localhost:3000',
  serverHost: process.env.SERVER_HOST || 'http://localhost:8080',
  apiToken:
    process.env.API_TOKEN ||
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwicGVybWlzc2lvbnMiOlsibWV0cmljczpyZWFkIl0sInVzZXJuYW1lIjoiYWRtaW4iLCJpYXQiOjE1MTYyMzkwMjJ9.XVOLlwejN_FvzQ4TkGmRy8lqxp0RxJ2Uzy_MR20IMfY'
}
