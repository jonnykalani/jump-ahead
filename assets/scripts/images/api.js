'use strict'

const store = require('../store')
const config = require('../config')

let token
let id

const imageIndex = function () {
  token = ''
  if (store.user) {
    token = store.user.token
  }
  return $.ajax({
    url: config.apiUrl + '/images',
    method: 'GET',
    headers: {
      contentType: 'application/json',
      Authorization: 'Token token=' + token
    }
  })
}

const uploadImage = function (data) {
  return $.ajax({
    url: config.apiUrl + '/images',
    method: 'POST',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data: data,
    processData: false,
    contentType: false
  })
}

const getOwnedImages = function (data) {
  console.log('getOwnedImages is running')
  token = ''
  if (store.user) {
    token = store.user.token
  }
  // if (data.webpage) {
  //   id = data.webpage.id
  // } else {
  //   id = data
  // }
  return $.ajax({
    url: config.apiUrl + '/ownedimages/' + data,
    method: 'GET',
    headers: {
      contentType: 'application/json',
      Authorization: 'Token token=' + token
    }
  })
}

const imageDelete = function (data) {
  id = data
  if (data.image) {
    id = data.image.id
  }
  // if (data.image) {
  //   id = data.image.id
  // } else {
  //   id = data
  // }
  return $.ajax({
    url: config.apiUrl + '/images/' + id,
    method: 'DELETE',
    headers: {
      contentType: 'application/json',
      Authorization: 'Token token=' + store.user.token
    }
  })
}

module.exports = {
  uploadImage,
  imageIndex,
  imageDelete,
  getOwnedImages
}
