const R = require('ramda')
const loadPageByUrl = require('./loadPageByUrl')
const findAClubUrl = require('./findAClubUrl')

const findAClubPage =
  R.compose(
    loadPageByUrl,
    findAClubUrl
  )

module.exports = findAClubPage
