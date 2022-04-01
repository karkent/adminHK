import Cookies from 'js-cookie'

const TokenKey = 'admin-token'
const UserName = 'username' // 账号
const RoleType = 'roleType' // 用户类型， 字符串 admin  ，staff
const AccId = 'accid'
const HospitalId = 'hospitalid'
const Name = 'name' // 该用户的姓名
const HospitalName = 'hospitalname' // 医院的名称

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getUserName() {
  return Cookies.get(UserName)
}

export function setUserName(username) {
  return Cookies.set(UserName, username)
}

export function removeUserName() {
  return Cookies.remove(UserName)
}

export function getRoleType() {
  return Cookies.get(RoleType)
}

export function setRoleType(roletype) {
  return Cookies.set(RoleType, roletype)
}

export function removeRoleType() {
  return Cookies.remove(RoleType)
}

export function getAccId() {
  return Cookies.get(AccId)
}

export function setAccId(accid) {
  return Cookies.set(AccId, accid)
}

export function removeAccId() {
  return Cookies.remove(AccId)
}

export function getHospitalId() {
  return Cookies.get(HospitalId)
}

export function setHospitalId(hospitalid) {
  return Cookies.set(HospitalId, hospitalid)
}

export function removeHospitalId() {
  return Cookies.remove(HospitalId)
}

export function getName() {
  return Cookies.get(Name)
}

export function setName(name) {
  return Cookies.set(Name, name)
}

export function removeName() {
  return Cookies.remove(Name)
}

export function getHospitalName() {
  return Cookies.get(HospitalName)
}

export function setHospitalName(hospitalName) {
  return Cookies.set(HospitalName, hospitalName)
}

export function removeHospitalName() {
  return Cookies.remove(HospitalName)
}
