import React, { useState } from 'react'
import SignUpSection from 'common/components/organisms/SignUpSection/SignUpSection'
import FormLayout from 'common/components/templates/FormLayout'
import AuthService from 'services/auth.service'
import { useDisclosure } from '@mantine/hooks'
import { LoadingOverlay, Box } from '@mantine/core'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Register = () => {
  const [visible, { toggle }] = useDisclosure(false)
  const [userData, setUserData] = useState({
    email: '',
    password: '',
    name: '',
    phone: 0,
    address: '',
  })
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value
    setUserData({
      ...userData,
      [e.target.name]: value,
    })
  }

  const handleSignUp = () => {
    toggle
    setLoading(true)

    AuthService.register(
      userData.email,
      userData.password,
      userData.name,
      userData.phone,
      userData.address
    )
      .then(
        (res) => {
          console.log(res)
          if (res.status === 200) {
            setUserData({
              email: '',
              password: '',
              name: '',
              phone: 0,
              address: '',
            })
            setLoading(false)
            navigate('/login')
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
            name: '',
            phone: 0,
            address: '',
          })
          toast.error(error.response.data.errorMessage.split(',')[0])
        }
      )
      .catch((error) => {
        console.log(error)
      })

    return false
  }

  return (
    <>
      <Box maw={400} pos="relative">
        <LoadingOverlay visible={visible} overlayBlur={2} />
        {!loading && (
          <FormLayout>
            <SignUpSection
              title="Sign up"
              data={userData}
              onChange={onChange}
              onSignUp={handleSignUp}
            />
          </FormLayout>
        )}
      </Box>
      <ToastContainer position="top-center" />
    </>
  )
}

export default Register
