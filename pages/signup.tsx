import React from 'react'
import {Form, Grid, Header, Image as SImage, Message} from 'semantic-ui-react'
import Link from 'next/link'
import CustomForm, {IFormsInputs} from "../client/components/CustomForm/Form";
import logo from '../client/assete/logo.svg'
import {UserSignUpValidator} from "../shared/Validations/user/userValidationSchema";
import {gql, useMutation} from "@apollo/client";
import {useRouter} from "next/router";
const InputList:Array<IFormsInputs> = [
  {
    placeholder: 'Email',
    name: 'email',
    type: 'text',
    as: Form.Input,
    icon: "mail",
    options: {fluid: true, iconPosition:'left' }
  },
  {
    placeholder: 'First Name',
    name: 'firstName',
    type: 'text',
    as: Form.Input,
    icon: "user",
    options: {fluid: true, iconPosition:'left' }
  },
  {
    placeholder: 'Last Name',
    name: 'lastName',
    type: 'text',
    as: Form.Input,
    icon: "user",
    options: {fluid: true, iconPosition:'left' }
  },
  {
    placeholder: 'Password',
    name: 'password',
    type: 'password',
    as: Form.Input,
    icon: "lock",
    options: {fluid: true, iconPosition:'left'}
  },
];
const initialValues = {
  email:'',
  firstName:'',
  lastName:''
};
const signUpGql = gql`
  mutation signUp($email:EmailAddress! $firstName: String! $lastName: String! $password: String!){
      addUser(data: {email: $email, firstName: $firstName lastName: $lastName, password:$password })
  }
`
const Index = () => {
  const router = useRouter()
  const [addUser, {loading}] = useMutation(signUpGql, {
    onCompleted: ()=>router.push('dashboard')
  })
 return <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
    <Grid.Column style={{ maxWidth: 450, padding: 23 }}>
      <Header textAlign='center' >
        <SImage size="huge" style={{minWidth: 120}} src={logo.src} />
      </Header>
      <CustomForm
        onSubmitFunction={async (fields) => {
          addUser({variables: fields}).catch(()=>{})
        }}
        validationSchema={UserSignUpValidator}
        initialValues={initialValues}
        title="Member Login"
        btnProps = {{size:"large", fluid:true, color:'black'}}
        btnText={loading ? 'please wait' : 'Sign Up'}
        loading={loading}
        formInputs={InputList}
      />
      <Message>
        Already have an account? <Link href='/'>Login</Link>
      </Message>
    </Grid.Column>
  </Grid>
}

export default Index
