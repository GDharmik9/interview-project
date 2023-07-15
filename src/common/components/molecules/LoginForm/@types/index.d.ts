interface UserLogin {
  email: string
  password: string
}

interface LoginFormProps {
  data: UserLogin
  onChange: React.ChangeEventHandler<HTMLInputElement>
  onSubmit: (event: React.FormEvent<HTMLFormElement>)=>void
}
