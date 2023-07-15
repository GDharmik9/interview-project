import React from 'react'
import Input from 'common/components/atoms/Input'
import Button from 'common/components/atoms/Button'

import './ChangePasswordForm.scss'

const ChangePasswordForm = ({
  onChange,
  data,
  onSubmit,
}: ChangePasswordFormProps) => {
  return (
    <form className="change-password-form" onSubmit={()=>onSubmit}>
      <Input
        placeholder={'Enter current password'}
        onChange={onChange}
        label={'Current Password'}
        value={data.oldPassword}
        type={'password'}
        name="oldPassword"
        required
      />
      <Input
        placeholder={'Enter new password'}
        onChange={onChange}
        label={'New Password'}
        value={data.newPassword}
        type="password"
        name="newPassword"
        required
      />
      <div className="button-wrapper">
        <Button fullWidth>
          Reset
        </Button>
      </div>
    </form>
  )
}

export default ChangePasswordForm
