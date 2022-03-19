import React from 'react'
import {Form, Grid, Header, Image as SImage, Message} from 'semantic-ui-react'
import Link from 'next/link'
import CustomForm, {IFormsInputs} from "../client/components/CustomForm/Form";
import logo from '../client/assete/logo.svg'
import {UserLoginValidation} from "../shared/Validations/user/userValidationSchema";
import {gql, useMutation} from "@apollo/client";
import {getCurrentUser} from "../client/components/Auth/CheckAuth";
import {useRouter} from "next/router";
const InputList:Array<IFormsInputs> = [
  {
    placeholder: 'Email*',
    name: 'email',
    type: 'text',
    as: Form.Input,
    icon: "mail",
    options: {fluid: true, iconPosition:'left' }
  },
  {
    placeholder: 'Password*',
    name: 'password',
    type: 'password',
    as: Form.Input,
    icon: "lock",
    options: {fluid: true, iconPosition:'left'}
  },
];
const initialValues = {
  email: '',
  password: ''
};
const loginGql = gql`
  mutation login ($email: EmailAddress! $password: String!){
      loginUser(email: $email password: $password)
  }
`
const Login = () => {
   const router = useRouter()
  const [login, {loading}] = useMutation(loginGql, {
    refetchQueries:[{query:getCurrentUser}],
    onCompleted:()=> {
      if(!router.pathname.includes("dashboard")){
        router.push('dashboard')
      }
    }
  })
  return <Grid textAlign='center' style={{height: '100vh'}} verticalAlign='middle'>
    <Grid.Column style={{maxWidth: 450, padding: 23}}>
      <Header textAlign='center'>
        <SImage size="huge" style={{minWidth: 120}} src={logo.src}/>
      </Header>
      <CustomForm
        onSubmitFunction={async (fields) => {
          login({variables: fields}).catch(()=>{})
        }}
        validationSchema={UserLoginValidation}
        initialValues={initialValues}
        title="Member Login"
        btnProps={{size: "large", fluid: true, color: 'black'}}
        btnText={loading ? 'please wait' : 'Sign In'}
        loading={loading}
        formInputs={InputList}
      />
      <Message>
        New Here? <Link href='/signup'>Sign Up</Link>
      </Message>
    </Grid.Column>
  </Grid>
}

export default Login
