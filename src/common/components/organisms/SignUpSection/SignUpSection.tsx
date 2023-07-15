import React from 'react'
import SignUpForm from 'common/components/molecules/SignUpForm'
import { Title } from '@mantine/core'
import './SignUpSection.scss'

const SignUpSection = ({
  title,
  data,
  onChange,
  onSignUp,
}: SignUpSectionProps) => {
  return (
    <section className="login-section">
      <Title order={3} ta={'center'}>
        {title}
      </Title>
      <SignUpForm data={data} onChange={onChange} onSubmit={onSignUp} />
    </section>
  )
}

export default SignUpSection
