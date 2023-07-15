import api from './api'
import TokenService from './token.service'

const register = (
  email: string,
  password: string,
  name: string,
  phone: number,
  address: string
) => {
  return api.post('/register', {
    email,
    password,
    name,
    phone,
    address,
  })
}

const login = (email: string, password: string) => {
  return api
    .put('/login', {
      email,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        TokenService.setUser(response.data)
      }

      return response
    })
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const logout = (token: any) => {
  const config = {
    headers: {
      Authorization: 'Bearer ' + token?.token,
    },
  }
  console.log(token)
  return api.put('/logout', {}, config).then((response) => {
    if (response.status == 200) {
      TokenService.removeUser()
    }
    return response
  })
}

const forgetPassword = (email: string) => {
  return api
    .put('/password/forgot', {
      email,
    })
    .then((response) => {
      if (response.status == 200) {
        console.log(response)
      }
      return response
    })
}

const resetPassword = (password: string, tokenId: string) => {
  return api
    .put('/password/reset', {
      password,
      tokenId,
    })
    .then((response) => {
      console.log(response)
      return response
    })
}

const getCurrentUser = () => {
  const userStr = localStorage.getItem('user')
  if (userStr) return JSON.parse(userStr)

  return null
}

const AuthService = {
  register,
  login,
  logout,
  forgetPassword,
  getCurrentUser,
  resetPassword,
}

export default AuthService
