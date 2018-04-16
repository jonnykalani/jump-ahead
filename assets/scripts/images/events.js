'use strict'

const ui = require('./ui')
const getFormFields = require('../../../lib/get-form-fields')
const api = require('./api')
// const store = require('../store')

const onUploadImage = function (event) {
  event.preventDefault()
  const formData = new FormData(event.target)
  const data = getFormFields(event.target)
  console.log('date in onUploadImage is ', data)
  $('#content').append(data)
  api.uploadImage(formData)
    .then(ui.imageCreateSuccess)
    .catch(ui.onUploadImageError)
}

const addHandlers = () => {
  $('#create-image').on('submit', onUploadImage)
}

module.exports = {
  addHandlers,
  onUploadImage
}
