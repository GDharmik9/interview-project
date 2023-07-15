import React from 'react'
import Input from 'common/components/atoms/Input'
import Button from 'common/components/atoms/Button'
import './LoginForm.scss'
import Text from 'common/components/atoms/Text'
import { Anchor} from '@mantine/core'
import { useForm } from '@mantine/form'
import 'react-toastify/dist/ReactToastify.css'

const LoginForm = ({ onSubmit, onChange, data }: LoginFormProps) => {
  const form = useForm({
    initialValues: {
      password: '',
      email: '',
    },

    validate: {
      // email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      // password: (value) => (/^(?=(.*[a-z]){1,})(?=(.*[A-Z]){1,})(?=(.*[0-9]){1,})(?=(.*[!@#$%^&*()\-__+.]){1,}).{8,}$/.test(value) ? null : "Invalid Password")
    },
  })

  return (
    <form
      className="login-form"
      onSubmit={onSubmit}
    >
      <Input
        placeholder={'Enter your email'}
        label={'Email'}
        type={'text'}
        name="email"
        {...form.getInputProps('email')}
        onChange={onChange}
        value={data.email}
        required
      />
      <Input
        placeholder={'Enter your password'}
        label={'Password'}
        type={'password'}
        name="password"
        {...form.getInputProps('password')}
        onChange={onChange}
        value={data.password}
        required
      />
      <Anchor href={'/forget-password'}>
        <Text ta={'right'} color="blue.5" td={'underline'} fw={700} fz={'xxs'}>
          Forget Password
        </Text>
      </Anchor>
      <div className="button-wrapper">
        <Button fullWidth type="submit">
          Submit
        </Button>
      </div>
      <div style={{ display: 'flex', justifyContent: 'Center' }}>
        <Text fw={700} fz={'xs'}>
          create account
        </Text>
        &nbsp;
        <Anchor href={'/'}>
          <Text
           
            color="blue.5"
            td={'underline'}
            fw={700}
            fz={'xxs'}
          >
            Sign up
          </Text>
        </Anchor>
      </div>
    </form>
  )
}

export default LoginForm
