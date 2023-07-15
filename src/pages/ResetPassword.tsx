import React, { useState } from 'react'
import { useDisclosure } from '@mantine/hooks'
import { LoadingOverlay, Box } from '@mantine/core'
import FormLayout from 'common/components/templates/FormLayout'
import ChangePasswordSection from 'common/components/organisms/ChangePasswordSection'
import AuthService from 'services/auth.service'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const ResetPassword = () => {
  const [visible, { toggle }] = useDisclosure(false)
  const navigate = useNavigate()
  const tokenId = ''
  const [userData, setUserData] = useState({
    oldPassword: '',
    newPassword: '',
  })
  const [loading, setLoading] = useState(false)

  const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value
    setUserData({
      ...userData,
      [e.target.name]: value,
    })
  }

  const handleChangePassword = (
    event: React.FormEvent<HTMLInputElement>
  ): void => {
    event.preventDefault()
    toggle
    setLoading(true)

    AuthService.resetPassword(userData.newPassword, tokenId).then(
      (res) => {
        if (res.status === 200) {
          setUserData({
            oldPassword: '',
            newPassword: '',
          })
          navigate('/login')
        }
        console.log(res)
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
          oldPassword: '',
          newPassword: '',
        })
        toast.error(error.response.data.errorMessage.split(',')[0], {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'dark',
        })
      }
    )
  }

  return (
    <>
      <Box maw={400} pos="relative">
        <LoadingOverlay visible={visible} overlayBlur={2} />
        {!loading && (
          <FormLayout>
            <ChangePasswordSection
              title="Login"
              data={userData}
              onChange={onChange}
              onSubmit={handleChangePassword}
            />
          </FormLayout>
        )}
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </Box>
    </>
  )
}

export default ResetPassword
