import React from 'react'
import { Form, Header, Segment} from 'semantic-ui-react'
import CustomForm, {IFormsInputs} from "../../CustomForm/Form";
import {
  addStageAndStepsValidation
} from "../../../../shared/Validations/AssignmentValidations/AssignmentValidation";
import {gql, useMutation, useQuery} from "@apollo/client";
import {ShowMessage, type} from "../../Toaster/ShowMessage";
import styled from "styled-components";
import {useRouter} from "next/router";
import ProgressList from "./progressList/ProgressList";


const initialValues = {
  stage: '',
  steps: []
};
const createProgressSteps = gql`
    mutation addCompany ($companyId: ObjectID! $stage: String! $steps: [String!]! ) {
        createProgressStep(data: {
            companyId: $companyId
            stage: $stage
            steps: $steps
        })
    }
`
export const getAllProgress = gql`
    query getAllProgress ($companyId: ObjectID!) {
        getAllProgress(companyId: $companyId) {
            _id
            steps {
                _id
                status
                name
            }
            isCompleted
            stage
            createdAt
        }
    }
`
const Progress = () => {
  const router = useRouter()
  const companyId = router.query.companyId
  const [create, {loading}] = useMutation(createProgressSteps, {
    onCompleted: () => ShowMessage(type.DONE, "Stage created"),
    refetchQueries: [{query: getAllProgress, variables:{companyId}}],
    awaitRefetchQueries: true
  })
  const chipOptions: Array<object> = []
  const InputList: Array<IFormsInputs> = [
    {
      placeholder: 'Stage',
      name: 'stage',
      type: 'text',
      as: Form.Input,
      options: { fluid: true}
    },
    {
      placeholder: 'Steps',
      name: 'steps',
      as: Form.Dropdown,
      options: {
        fluid: true,
        search: true,
        selection: true,
        multiple: true,
        allowAdditions: true,
        options:chipOptions,
        onAddItem: (_: any, data: any) => chipOptions.push({key: data.value, text: data.value, value: data.value})
      }
    }
  ];
  const {loading:loadingProgress, error:errorLoadingProgress, data: progressData} = useQuery(getAllProgress, {
    variables: {companyId}
  })
  return (
    <Segment as={Container}>
      <Header>
        Create Stage And Steps
      </Header>
      <CustomForm
        onSubmitFunction={async (fields, {resetForm}) => {
          create({variables: {...fields, companyId}}).catch(() => null).then(() => { resetForm() })
        }}
        validationSchema={addStageAndStepsValidation}
        initialValues={initialValues}
        btnProps={{size: "small", color: 'black'}}
        btnText={loading ? 'please wait' : 'Add'}
        loading={loading}
        formInputs={InputList}
      />
      <Segment basic loading={loadingProgress}>
        {loadingProgress ? null : errorLoadingProgress ? null :<ProgressList companyId={companyId as string} progressList={progressData.getAllProgress}/>}
      </Segment>
    </Segment>
  )
}
const Container = styled.div`
  min-height: 95vh;
`
export default Progress
