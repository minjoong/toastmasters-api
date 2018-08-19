const axios = require('axios')
const R = require('ramda')
const cheerio = require('cheerio')

const loadPageByUrl = R.composeP(
  cheerio.load,
  R.prop('data'),
  axios.get
)

module.exports = loadPageByUrl
