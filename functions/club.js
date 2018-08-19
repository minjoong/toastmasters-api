const R = require('ramda')
const findAClubPage = require('./findAClubPage')

const club = async clubId => {
  const $ = await findAClubPage(clubId)
  const name = $('div.detailHead h1.title').text()
  const clubIdentities = R.map(R.trim, R.split(',', $('.info dl:nth-child(1) dd').text()))

  const districtId = R.compose(
    R.last,
    R.split(/\s/),
    R.nth(1)
  )(clubIdentities)

  const [divisionId, areaId] = R.compose(
    R.splitAt(1),
    R.last,
    R.split(/\s/),
    R.nth(2)
  )(clubIdentities)

  const charterDate = $('.info dl:nth-child(2) dd').text()
  const website = $('.info dl:nth-child(3) dt a').attr('href')
  const facebook = $('.contactLinks li:nth-child(1) a').attr('href')
  const email = R.replace('mailto:', '')($('.contactLinks li:nth-child(2) a').attr('href'))

  const phone =
    R.compose(
      R.trim,
      R.replace('Phone:', '')
    )($('.contact-info-phone').text())

  const meetingTimes =
    R.compose(
      R.trim,
      R.replace('Meeting Times:', '')
    )($('.contact-info-meeting-times').text())

  const location =
    R.map(
      R.compose(
        R.replace(/\s{2,}/g, ' '),
        R.trim,
        R.replace('Location:', '')
      )
    )($('.contact-info-body')
      .contents()
      .map((i, elem) =>
        $(elem).text())
      .toArray())

  const [, , venueLine1, , venueLine2, , address] = location

  return {
    id: clubId,
    name,
    districtId,
    divisionId,
    areaId,
    charterDate,
    website,
    facebook,
    email,
    phone,
    meetingTimes,
    venueLine1,
    venueLine2,
    address
  }
}

module.exports = club
