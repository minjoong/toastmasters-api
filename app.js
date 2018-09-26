const cors = require('cors')
const createError = require('http-errors')
const express = require('express')
const logger = require('morgan')
// routers
const districtApi = require('./routers/district.router')
const clubApi = require('./routers/club.router')

const app = express()

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

// CORS 적용
app.use(cors())
// Access Logging
app.use(logger('dev'))
// Body Parser
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Public API
app.use('/v1', districtApi, clubApi)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404))
})

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.json({ message: err.message })
})

module.exports = app
