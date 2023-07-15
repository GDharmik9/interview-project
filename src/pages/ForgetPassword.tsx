import React, { useState } from 'react'
import { LoadingOverlay, Box } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import FormLayout from 'common/components/templates/FormLayout'
import ForgetPasswordSection from 'common/components/organisms/ForgetPasswordSection'
import AuthService from 'services/auth.service'
import Button from 'common/components/atoms/Button'
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const ForgetPassword = () => {
  const [visible, { toggle }] = useDisclosure(false)
  const [userData, setUserData] = useState('')
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState(false)

  const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value
    setUserData(value)
  }

  const handleForgetPassword = () => {
    toggle
    setLoading(true)

    AuthService.forgetPassword(userData).then(
      (res) => {
        if (res.status === 200) {
          console.log(res)
          setLoading(false)
          setUserData('')
          setStatus(true)
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
        setUserData('')
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
        {!status ? (
          !loading && (
            <FormLayout>
              <ForgetPasswordSection
                data={userData}
                onChange={onChange}
                onSubmit={handleForgetPassword}
              />
            </FormLayout>
          )
        ) : (
          <FormLayout>
            <form className="forget-password">
              <h3 style={{ fontWeight: 900, padding: '16px' }}>
                Password reset Link is send
              </h3>
              <div className="button-wrapper">
                <Link to="/login">
                  <Button fullWidth>Ok</Button>
                </Link>
              </div>
            </form>
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

export default ForgetPassword
