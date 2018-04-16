'use strict'

const imageInfoTemplate = require('../templates/images.handlebars')
const imageInfoTemplateWithButtons = require('../templates/images-with-buttons.handlebars')
const store = require('../store.js')
const compare = require('../customsorterforposts.js')
let imageInfoData

const imageCreateSuccess = function (data) {
  $('#create-image-modal').modal('hide')
  $('#message').text('Created image post successfully!')
  $('#message').removeClass('alert-danger').addClass('alert-success').show()
  $('form').find('input:not([type="submit"])').val('')
  $('#content').attr('src', data.image.url)
  $('#message').delay(3000).slideToggle()
}

const showImages = function (data) {
  console.log('data in showImages is', data)
  // data.url.sort(compare)
  // data.sort(compare)
  if (store.user) {
    if (store.user.id === store.viewed_user.user_id) {
      imageInfoData = imageInfoTemplateWithButtons({ images: data.webpages,
        organization: store.viewed_user.organization})
      console.log('data.images is', data.webpages)
    } else {
      imageInfoData = imageInfoTemplate({ images: data.webpages,
        organization: store.viewed_user.organization})
      console.log('data.images is', data.webpages)
    }
  } else {
    imageInfoData = imageInfoTemplate({ images: data.webpages,
      organization: store.viewed_user.organization})
    console.log('data.images.url is', data.webpages)
  }
  $('form').find('input:not([type="submit"])').val('')
  $('#content').html(imageInfoData)
  return data
}

// const showImages = function (data) {
//   console.log('data in showImages is', data)
//   data.images.sort(compare)
//   // data.sort(compare)
//   if (store.user) {
//     if (store.user.id === store.viewed_user.user_id) {
//       imageInfoData = imageInfoTemplateWithButtons({ images: data.images,
//         organization: store.viewed_user.organization})
//       console.log('data.images is', data.images)
//     } else {
//       imageInfoData = imageInfoTemplate({ images: data.images,
//         organization: store.viewed_user.organization})
//       console.log('data.images is', data.images)
//     }
//   } else {
//     imageInfoData = imageInfoTemplate({ images: data.images,
//       organization: store.viewed_user.organization})
//     console.log('data.images is', data.images)
//   }
//   $('form').find('input:not([type="submit"])').val('')
//   $('#content').html(imageInfoData)
//   return data
// }

module.exports = {
  imageCreateSuccess,
  showImages
}
