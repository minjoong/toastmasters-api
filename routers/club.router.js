const express = require('express')
const club = require('../functions/club')

const router = express.Router()

router.get('/club/:clubId', async (req, res, next) => {
  try {
    const clubId = req.params.clubId
    res.json(await club(clubId))
  } catch (err) {
    next(err)
  }
})

module.exports = router
