import React from 'react'
import Input from 'common/components/atoms/Input'
import Button from 'common/components/atoms/Button'
import './SignUpForm.scss'
import { useForm } from '@mantine/form'
import Text from 'common/components/atoms/Text'
import { Anchor } from '@mantine/core'

const SignUpForm = ({ onSubmit, onChange, data }: SignUpFormProps) => {
  const form = useForm({
    initialValues: {
      email: '',
      password: '',
      name: '',
      phone: 0,
      address: '',
    },

    validate: {
      // email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      // password: (value) => (/^(?=(.*[a-z]){1,})(?=(.*[A-Z]){1,})(?=(.*[0-9]){1,})(?=(.*[!@#$%^&*()\-__+.]){1,}).{8,}$/.test(value) ? null : "Invalid Password")
    },
  })

  return (
    <form
      className="sign-form"
      onSubmit={form.onSubmit(() => {
        onSubmit(form.values)
      })}
    >
      <Input
        placeholder={'Enter your name'}
        label={'name'}
        type={'text'}
        name="name"
        {...form.getInputProps('name')}
        onChange={onChange}
        value={data.name}
        required
      />
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
      <Input
        placeholder={'Enter your phone'}
        label={'Phone'}
        type={'number'}
        name="phone"
        {...form.getInputProps('phone')}
        onChange={onChange}
        value={data.phone}
        required
      />
      <Input
        placeholder={'Enter your address'}
        label={'Address'}
        type={'text'}
        name="address"
        {...form.getInputProps('address')}
        onChange={onChange}
        value={data.address}
        required
      />
      <div className="button-wrapper">
        <Button fullWidth type="submit">
          Submit
        </Button>
      </div>
      <div
        style={{ display: 'flex', justifyContent: 'Center', marginTop: '16px' }}
      >
        <Text fw={700} fz={'xs'}>
          Already Sign up
        </Text>
        &nbsp;
        <Anchor href={'/login'}>
          <Text color="blue.5" td={'underline'} fw={700} fz={'xxs'}>
            Login
          </Text>
        </Anchor>
      </div>
    </form>
  )
}

export default SignUpForm
