import api from './api'
export function getUserCode(){
  console.log("获取二维码")
 return  api.get(`/user-code-log`,{})

}
