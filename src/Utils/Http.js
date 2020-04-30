import $ from 'jquery'

export const Post = async function (config) {
  config.type = 'post'
  config.contentType = 'application/json'
  config.data = JSON.stringify(config.data)
  // config.timeout = 10000
  // config.crossDomain = true
  $.ajax(config)
}
export const PostCopy = async function (config) {
  config.type = 'post'
  $.ajax(config)
}
export const Get = async function (config) {
  config.type = 'get'
  // config.crossDomain = true
  $.ajax(config)
}

export let apiHeader = function () {

}
