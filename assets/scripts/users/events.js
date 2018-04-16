'use strict'

const api = require('./api')
const getFormFields = require('../../../lib/get-form-fields')
const ui = require('./ui')
const wpApi = require('../webpages/api.js')
const store = require('../store.js')
const viewMain = require('../basepage.js')

const onSignUp = function (event) {
  event.preventDefault()
  // event.target is the same as this in the parameter below
  const data = getFormFields(this)
  api.signUp(data)
    .then(ui.signUpSuccess)
    .catch(ui.signUpFailure)
}

const onSignIn = function (event) {
  event.preventDefault()
  // event.target is the same as this in the parameter below
  const data = getFormFields(this)
  api.signIn(data)
    .then(ui.signInSuccess)
    .catch(ui.signInFailure)
}

const onChangePassword = function (event) {
  event.preventDefault()
  const data = getFormFields(event.target)

  api.changePassword(data)
    .then(ui.changePasswordSuccess)
    .catch(ui.changePasswordFailure)
}

const onSignOut = function (event) {
  event.preventDefault()
  const data = getFormFields(event.target)

  api.signOut(data)
    .then(ui.signOutSuccess)
    .catch(ui.signOutFailure)
}

const onViewOrgInfo = function (event) {
  event.preventDefault()
  console.log('onViewOrgInfo is running')
  const data = getFormFields(event.target)
  store.viewed_user = data.users
  api.getUser(data.users.user_id)
    // .then(viewMain.viewImageInfo)
    .then(viewMain.viewOrgInfo)
    .then(() => {
      return wpApi.getOwnedWebpages(data.users.user_id)
    })
    .then(viewMain.showWebpageLinks)
    .catch(console.error)
}

const addHandlers = () => {
  $('#sign-up').on('submit', onSignUp)
  $('#sign-in').on('submit', onSignIn)
  $('#change-password').on('submit', onChangePassword)
  $('#sign-out').on('submit', onSignOut)
  $('#organizations-to-view').on('submit', onViewOrgInfo)
}

module.exports = {
  addHandlers
}
