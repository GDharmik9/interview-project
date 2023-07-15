interface UserSignUp {
   email:string
    password:string
    name:string
    phone:number
    address:string
    
}
interface SignUpSectionProps {
  title: string
  data: UserSignUp
  onChange: React.ChangeEventHandler<HTMLInputElement>
  onSignUp: (data: UserSignUp)  => void
}
