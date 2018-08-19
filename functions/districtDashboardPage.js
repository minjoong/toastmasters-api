const R = require('ramda')
const loadPageByUrl = require('./loadPageByUrl')
const districtDashboardUrl = require('./districtDashboardUrl')

const districtDashboardPage = R.compose(
  loadPageByUrl,
  districtDashboardUrl
)

module.exports = districtDashboardPage
