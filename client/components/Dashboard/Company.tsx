import React from 'react'
import {Form, Header, Segment} from 'semantic-ui-react'
import CustomForm, {IFormsInputs} from "../CustomForm/Form";
import {addCompanyValidation} from "../../../shared/Validations/AssignmentValidations/AssignmentValidation";
import {gql, useMutation} from "@apollo/client";
import {ShowMessage, type} from "../Toaster/ShowMessage";
import GetCompanyList, {getAllCompanyGql} from "./company/GetCompanyList";
import styled from "styled-components";

const InputList: Array<IFormsInputs> = [
  {
    placeholder: 'Company Name',
    name: 'name',
    type: 'text',
    as: Form.Input,
    icon: "building",
    options: {iconPosition: 'left'}
  },
  {
    placeholder: 'Company Address',
    name: 'address',
    type: 'text',
    as: Form.Input,
    icon: "address book",
    options: {iconPosition: 'left'}
  }
];
const initialValues = {
  name: '',
  address: ''
};
const addCompany = gql`
  mutation addCompany ($name: String! $address: String!) {
      addCompany(data: {address: $address name: $name})
  }
`
const Index = () => {
  const [add, {loading}] = useMutation(addCompany, {
    onCompleted: ()=> ShowMessage(type.DONE,  "Company Added"),
    refetchQueries:[{query: getAllCompanyGql, variables: {page: 1}}]
  })
  return(
    <Segment as={Container}>
      <Header>
        Add Company
      </Header>
      <CustomForm
        onSubmitFunction={async (fields, {resetForm}) => {
          add({variables: fields}).catch(()=>{}).finally(()=>{
            resetForm()
          })
        }}
        validationSchema={addCompanyValidation}
        initialValues={initialValues}
        btnProps={{size: "small", color: 'black'}}
        btnText={loading ? 'please wait' : 'Add'}
        loading={loading}
        formInputs={InputList}
      />
      <GetCompanyList/>
    </Segment>

  )
}
const Container = styled.div`
  min-height: 95vh;
`
export default Index
