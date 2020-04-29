import {
  getCookie
} from './Common'

let isLogin = function () {
  let token = getCookie('access-token')
  if (!token || token === null || token === 'undefined') {
    return false
  } else {
    return true
  }
}

let getRequestHeader = function () {
  let token = getCookie('access-token')
  return {
    'head': {
      'platform': 'web',
      'timestamp': Date.parse(new Date()) / 1000,
      'token': token
      // 'token': '4724e81f2c457515a0e6044464ed04e7b49f1f629f3bbdb6bd7605f3aabc95ae01886486c50fc95925618854bcad2eea'
    }
  }
}

export default {
  isLogin: isLogin,
  getRequestHeader: getRequestHeader
}
