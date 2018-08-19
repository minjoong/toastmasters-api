const express = require('express')
const clubsOfDistrict = require('../functions/clubsOfDistrict')

const router = express.Router()

router.get('/district/:districtId/clubs', async (req, res, next) => {
  const districtId = req.params.districtId
  try {
    const clubs = await clubsOfDistrict(districtId)

    return res.json(clubs)
  } catch (err) {
    return next(err)
  }
})

module.exports = router
