'use strict'
const blogInfoTemplate = require('../templates/blog-posts.handlebars')
const blogInfoTemplateWithButtons = require('../templates/blog-posts-with-buttons.handlebars')
const store = require('../store.js')
const compare = require('../customsorterforposts.js')
let blogInfoData

const blogPostCreateSuccess = function (data) {
  $('#create-blogPost-modal').modal('hide')
  $('#message').text('Created blog post successfully!')
  $('#message').removeClass('alert-danger').addClass('alert-success').show()
  $('form').find('input:not([type="submit"])').val('')
  $('#content').empty()
  $('#message').delay(3000).slideToggle()
}

const blogPostCreateFailure = function (error) {
  $('#create-blogPost-modal').modal('hide')
  $('#message').text('Error on creating a blog post!')
  $('#message').removeClass('alert-success').addClass('alert-danger').show()
  $('form').find('input:not([type="submit"])').val('')
  $('#message').delay(3000).slideToggle()
  console.error(error)
}

const blogPostShowSuccess = function (data) {
  $('#message').text('Showed Blog Post successfully')
  $('#message').css('background-color', 'green')
  $('#content').html(data.blogPost.title + ' ' + data.blogPost.body)
  $('form').find('input:not([type="submit"])').val('')
}

const blogPostShowFailure = function (error) {
  $('#message').text('Error on showinging blog post')
  $('#message').css('background-color', 'red')
  $('form').find('input:not([type="submit"])').val('')
  console.error(error)
}

const blogPostIndexSuccess = function (data) {
  $('#message').text('Indexed Blog Posts successfully')
  $('#message').css('background-color', 'green')
  $('form').find('input:not([type="submit"])').val('')
  $('#content').text(data)
}

const blogPostIndexFailure = function (error) {
  $('#message').text('Error on indexing blog post')
  $('#message').css('background-color', 'red')
  $('form').find('input:not([type="submit"])').val('')
  console.error(error)
}

const blogPostUpdateSuccess = function (data) {
  $('#update-blogPost-modal').modal('hide')
  $('#message').text('Updated blog post successfully!')
  $('#message').removeClass('alert-danger').addClass('alert-success').show()
  $('form').find('input:not([type="submit"])').val('')
  $('#message').delay(3000).slideToggle()
  $('#content').empty()
}

const blogPostUpdateFailure = function () {
  $('#update-blogPost-modal').modal('hide')
  $('#message').text('Error on creating a blog post!')
  $('#message').removeClass('alert-success').addClass('alert-danger').show()
  $('form').find('input:not([type="submit"])').val('')
  $('#message').delay(3000).slideToggle()
}

const blogPostDeleteSuccess = function (data) {
  $('#confirmDeleteBlogPostModal').modal('hide')
  $('#message').text('Deleted blog post successfully!')
  $('#message').removeClass('alert-danger').addClass('alert-success').show()
  $('form').find('input:not([type="submit"])').val('')
  $('#message').delay(3000).slideToggle()
}

const blogPostDeleteFailure = function (error) {
  $('#confirmDeleteBlogPostModal').modal('hide')
  $('#message').text('Error on deleting webpage!')
  $('form').find('input:not([type="submit"])').val('')
  $('#message').delay(3000).slideToggle()
  console.error(error)
}

const showBlogPosts = function (data) {
  console.log('data in showBlogPosts is ', data)
  data.blogPosts.sort(compare)
  if (store.user) {
    if (store.user.id === store.viewed_user.user_id) {
      blogInfoData = blogInfoTemplateWithButtons({ blogPosts: data.blogPosts,
        organization: store.viewed_user.organization})
    } else {
      blogInfoData = blogInfoTemplate({ blogPosts: data.blogPosts,
        organization: store.viewed_user.organization})
    }
  } else {
    blogInfoData = blogInfoTemplate({ blogPosts: data.blogPosts,
      organization: store.viewed_user.organization})
  }
  $('form').find('input:not([type="submit"])').val('')
  $('#content').html(blogInfoData)
  return data
}

module.exports = {
  blogPostCreateSuccess,
  blogPostCreateFailure,
  blogPostIndexSuccess,
  blogPostIndexFailure,
  blogPostShowSuccess,
  blogPostShowFailure,
  blogPostUpdateSuccess,
  blogPostUpdateFailure,
  blogPostDeleteSuccess,
  blogPostDeleteFailure,
  showBlogPosts
}
