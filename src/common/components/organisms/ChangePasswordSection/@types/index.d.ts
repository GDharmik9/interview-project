interface changePasswordProps {
  newPassword: string
  oldPassword: string
}
interface ChangePasswordSectionProps {
  title: string
  data: changePasswordProps
  onChange: React.ChangeEventHandler<HTMLInputElement>
  onSubmit: (event:React.FormEvent<HTMLInputElement>)=>void
}
