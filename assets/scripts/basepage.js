const blogUi = require('./blogposts/ui.js')
const blogApi = require('./blogposts/api.js')
const webpageApi = require('./webpages/api.js')
const orgInfoTemplate = require('./templates/show-base-page.handlebars')
const showOnePageTemplate = require('./templates/show-one-page.handlebars')
const showOnePageTemplateWithButtons = require('./templates/show-one-page-with-buttons.handlebars')
const webpageLinksTemplate = require('./templates/page-links.handlebars')
const compare = require('./customsorterforposts.js')
const store = require('./store.js')
const userApi = require('./users/api.js')
const imageApi = require('./images/api.js')
const imageUi = require('./images/ui.js')
let webpage

const viewImageInfo = function (data) {
  console.log('viewImageInFo is running')
  const orgInfoData = orgInfoTemplate({ users: data })
  $('#content').html(orgInfoData)
  store.viewed_user.organization = data.user.organization
  return data
}

const viewOrgInfo = function (data) {
  console.log('viewOrgInfo is running')
  // viewImageInfo(data)
  const orgInfoData = orgInfoTemplate({ users: data })
  $('#content').html(orgInfoData)
  store.viewed_user.organization = data.user.organization
  $('.showblogbutton').on('click', () => onShowBlogPosts(data))
  $('.showimagebutton').on('click', () => {
    console.log('showImageButton was clicked')
    onUploadImages(data)
  })
  return data
}

const showWebpageLinks = function (data) {
  data.webpages.sort(compare)
  const webpageLinks = webpageLinksTemplate({ webpages: data.webpages })
  $('#page-links').html(webpageLinks)
  $('.individual-page-link').on('click')
  $('.individual-page-link').on('click', showWebpageByLink)
}

const showWebpageByLink = function (event) {
  const id = $(event.target).data('id')
  webpageApi.getWebpage(id)
    .then((response) => {
      return response
    }
    )
    .then((data) => {
      if (store.user) {
        if (store.user.id === store.viewed_user.user_id) {
          webpage = showOnePageTemplateWithButtons({ webpage: data.webpage,
            organization: store.viewed_user.organization})
        } else {
          webpage = showOnePageTemplate({ webpage: data.webpage,
            organization: store.viewed_user.organization})
        }
      } else {
        webpage = showOnePageTemplate({ webpage: data.webpage,
          organization: store.viewed_user.organization})
      }
      $('#content').html(webpage)
    })
    .then(() => $('#back-link').on('click', goBackToMain))
}

const goBackToMain = function () {
  userApi.getUser(store.viewed_user.user_id)
    .then(viewImageInfo)
    .then(viewOrgInfo)
    .then(response => {
      return response
    })
    .then(() => {
      return webpageApi.getOwnedWebpages(store.viewed_user.user_id)
    })
    .then(showWebpageLinks)
    .catch(console.error)
}

const onShowBlogPosts = function (data) {
  console.log('onShowBlogPosts is running')
  blogApi.getOwnedBlogposts(data.user.id)
    // .then((response) => console.log('response is', response))
    .then(blogUi.showBlogPosts)
    .then(() => $('#back-link').on('click', goBackToMain))
    .catch(console.error)
}

const onUploadImages = function (data) {
  console.log('onUploadImages in UI is running')
  imageApi.getOwnedImages(data.user.id)
    .then(imageUi.showImages)
    .then(() => $('#back-link').on('click', goBackToMain))
    .catch(console.error)
}

module.exports = {
  viewOrgInfo,
  showWebpageLinks,
  showWebpageByLink,
  goBackToMain,
  viewImageInfo,
  onUploadImages
}
