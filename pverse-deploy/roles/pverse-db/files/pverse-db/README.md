# pverse-db

## Usage

``` js
const setupDatabase = require('pverse-db')

setupDabase(config).then(db => {
  const { Agent, Metric } = db

}).catch(err => console.error(err))
```