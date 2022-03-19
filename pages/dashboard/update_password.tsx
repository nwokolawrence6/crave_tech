import React from 'react'
import DashSideBar from "../../client/components/Dashboard/DashSideBar";
import {UserUpdatePasswordValidator} from "../../shared/Validations/user/userValidationSchema";
import CustomForm, {IFormsInputs} from "../../client/components/CustomForm/Form";
import {Form} from "semantic-ui-react";
import {gql, useMutation} from "@apollo/client";


const InputList:Array<IFormsInputs> = [
  {
    placeholder: 'Current Password',
    name: 'oldPassword',
    type: 'password',
    as: Form.Input,
    icon: "lock",
    options: {fluid: true, iconPosition:'left' }
  },
  {
    placeholder: 'New Password',
    name: 'newPassword',
    type: 'password',
    as: Form.Input,
    icon: "lock",
    options: {fluid: true, iconPosition:'left'}
  },
];
const initialValues = { oldPassword: "", newPassword: "" };
const updatePasswordGql = gql`
    mutation login ($oldPassword: String! $newPassword: String!){
        updatePassword(oldPassword: $oldPassword newPassword: $newPassword)
    }
`
const DashBoard = () => {
  const [updatePassword, {loading}] = useMutation(updatePasswordGql, {
    variables: {}
  })
  return (
    <DashSideBar>
      <CustomForm
        onSubmitFunction={async (fields) => {
          updatePassword({variables: fields}).catch(()=>{})
        }}
        validationSchema={UserUpdatePasswordValidator}
        initialValues={initialValues}
        title="Member Login"
        btnProps={{size: "large",  color: 'black'}}
        btnText={loading ? 'please wait' : 'Update Password'}
        loading={loading}
        formInputs={InputList}
      />
    </DashSideBar>
  )
}
export default DashBoard
