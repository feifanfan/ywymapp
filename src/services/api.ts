import Taro from '@tarojs/taro'
import config from '../../project.config.json'
export const baseUrl = "http://localhost:15188/api"

export const HTTP_STATUS = {
  SUCCESS: 200,
  CREATED: 201,
  ACCEPTED: 202,
  CLIENT_ERROR: 400,
  AUTHENTICATE: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  SERVER_ERROR: 500,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504
}
export default {
  baseOptions(params, method = 'GET') {
    let { url, data } = params
    let contentType = 'application/json'
    contentType = params.contentType || contentType
    type OptionType = {
      url: string,
      data?: object | string,
      method?: any,
      header: object,
      // mode: string,
      success: any,
      error: any,
      xhrFields: object,
    }
    const setCookie = (res: {
      cookies: Array<{
        name: string,
        value: string,
        expires: string,
        path: string
      }>,
      header: {
        'Set-Cookie': string
      }
    }) => {
      if (res.cookies && res.cookies.length > 0) {
        let cookies = ''
        res.cookies.forEach((cookie, index) => {
          // windows的微信开发者工具返回的是cookie格式是有name和value的,在mac上是只是字符串的
          if (cookie.name && cookie.value) {
            cookies += index === res.cookies.length - 1 ? `${cookie.name}=${cookie.value};expires=${cookie.expires};path=${cookie.path}` : `${cookie.name}=${cookie.value};`
          } else {
            cookies += `${cookie};`
          }
        });
        Taro.setStorageSync('cookies', cookies)
      }
      if (res.header && res.header['Set-Cookie']) {
        Taro.setStorageSync('cookies', res.header['Set-Cookie'])
      }
    }
    const option: OptionType = {
      url: url.indexOf('http') !== -1 ? url : baseUrl + url,
      data: data,
      method: method,
      header: {
        'content-type': contentType,
        cookie: Taro.getStorageSync('cookies'),
        'Authorization':Taro.getStorageSync('token'),
      },
      // mode: 'cors',
      xhrFields: { withCredentials: true },
      success(res) {
        setCookie(res)
        if (res.data.code === HTTP_STATUS.SERVER_ERROR) {
          Taro.showToast({
            icon:"none",
            title:res.data.message
          })
          return
        } else if (res.data.code  === HTTP_STATUS.BAD_GATEWAY) {
          Taro.showToast({
            icon:"none",
            title:"网络错误"
          })
          return
        } else if (res.data.code  === HTTP_STATUS.FORBIDDEN) {
          Taro.showToast({
            icon:"none",
            title:"权限不足"
          })
          return
        } else if (res.data.code  === HTTP_STATUS.AUTHENTICATE) {
          Taro.clearStorage()
          Taro.redirectTo({
            url: '/pages/login/index'
          })
          Taro.showToast({
            icon:"none",
            title:"请重新登录"
          })
          return
        } else if (res.data.code === HTTP_STATUS.SUCCESS) {
          return res.data
        }
      },
      error() {
        Taro.showToast({
          icon:"none",
          title:"接口错误，请提交管理员处理"
        })
        return
      }
    }
    return Taro.request(option)
  },
  get(url, data?: object) {
    let option = { url, data }
    return this.baseOptions(option)
  },
  post: function (url, data?: object, contentType?: string) {
    let params = { url, data, contentType }
    return this.baseOptions(params, 'POST')
  },
  put(url, data?: object) {
    let option = { url, data }
    return this.baseOptions(option, 'PUT')
  },
  delete(url, data?: object) {
    let option = { url, data }
    return this.baseOptions(option, 'DELETE')
  },
  getAppid(){
    return config.appid
  }
}
