interface UserSignUp {
    email:string
    password:string
    name:string
    phone:number
    address:string
   
}

interface SignUpFormProps {
    data:UserSign
    onChange: React.ChangeEventHandler<HTMLInputElement>
    onSubmit: (data:UserSignUp)  => void
}