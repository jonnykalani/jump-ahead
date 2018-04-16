'use strict'

// const config = require('./config')
const userEvents = require('./users/events.js')
const webpageEvents = require('./webpages/events.js')
const blogPostEvents = require('./blogposts/events.js')
const userDropdown = require('./users/user-dropdown.js')
const deleteEvents = require('./delete-events.js')
const updateEvents = require('./update-events.js')
const imageEvents = require('./images/events.js')

$(() => {
  userDropdown()
  userEvents.addHandlers()
  webpageEvents.addHandlers()
  blogPostEvents.addHandlers()
  deleteEvents.addHandlers()
  updateEvents.addHandlers()
  imageEvents.addHandlers()
  $('.modal').on('hidden.bs.modal', () => $('form').find('input:not([type="submit"])').val(''))
  $('.modal').on('hidden.bs.modal', () => $('textarea').val(''))
})

// use require with a reference to bundle the file and use it in this file
// const example = require('./example')

// use require without a reference to ensure a file is bundled
// require('./example')
