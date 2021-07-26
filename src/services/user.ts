import api from './api'
export function login(code){
 return  api.get(`/wx/user/${api.getAppid()}/login`,{code:code})
}

export function getUserInfo(data){
  return api.get(`/wx/user/${api.getAppid()}/info`,{...data})
}

export function setUserInfo(data){
  return api.post(`/wx/user/${api.getAppid()}/userInfo`,{...data})
}
