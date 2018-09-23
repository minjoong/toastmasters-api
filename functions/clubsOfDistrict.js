const R = require('ramda')
const districtDashboardPage = require('./districtDashboardPage')
const club = require('./club')

const mergedClub = async c => {
  const clubDetail = await club(c.id)
  return R.merge(clubDetail, c)
}

const clubsOfDistrict = async districtId => {
  const $ = await districtDashboardPage(districtId)
  const clubs = $('td.Grid_Title_top5.min280.crop')
    .map((i, elem) => {
      const name = $(elem).attr('title')
      const id = $(elem)
        .children('span.redFont')
        .text()
      const divisionAreaId = $(elem)
        .closest('tbody')
        .parent()
        .closest('tbody')
        .attr('id')
      const division = R.compose(
        R.replace('division', ''),
        R.head,
        R.split('_')
      )(divisionAreaId)
      const area = R.compose(
        R.replace('area', ''),
        R.nth(1),
        R.split('_')
      )(divisionAreaId)
      const member = Number(
        $(elem)
          .parent()
          .find('td.Grid_Table.title_gray>span')
          .text()
      )

      return { id, name, division, area, member }
    })
    .toArray()

  const clubsPromises = R.map(mergedClub)(clubs)

  return await Promise.all(clubsPromises)
}

module.exports = clubsOfDistrict
