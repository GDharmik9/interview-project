import LoginSection from 'common/components/organisms/LoginSection'
import FormLayout from 'common/components/templates/FormLayout'
import React, { useState } from 'react'
import AuthService from 'services/auth.service'
import { useDisclosure } from '@mantine/hooks'
import { LoadingOverlay, Box } from '@mantine/core'
import { useNavigate } from 'react-router-dom'
import TokenService from 'services/token.service'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const SignIn = () => {
  const [visible, { toggle }] = useDisclosure(false)
  const navigate = useNavigate()
  const [userData, setUserData] = useState({
    email: '',
    password: '',
  })
  const [loading, setLoading] = useState(false)

  const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value
    setUserData({
      ...userData,
      [e.target.name]: value,
    })
  }

  const handleLogin = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault()
    toggle
    setLoading(true)

    AuthService.login(userData.email, userData.password).then(
      (res) => {
        if (res.status === 200) {
          const token = TokenService.getLocalAccessToken()
          console.log(res.data)
          setUserData({
            email: '',
            password: '',
          })
          setLoading(false)

          if (token) {
            console.log(token)
            navigate('/dashboard')
          }
        }
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString()
        console.log(resMessage)
        setLoading(false)
        setUserData({
          email: '',
          password: '',
        })
        toast.error(error.response.data.errorMessage.split(',')[0])
      }
    )
  }

  return (
    <div>
      <Box maw={400} pos="relative">
        <LoadingOverlay visible={visible} overlayBlur={2} />
        {!loading && (
          <FormLayout>
            <LoginSection
              title="Login"
              data={userData}
              onChange={onChange}
              onLogin={handleLogin}
            />
          </FormLayout>
        )}
      </Box>
      <ToastContainer position="top-center" />
    </div>
  )
}

export default SignIn
