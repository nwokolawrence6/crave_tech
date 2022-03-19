import React from 'react';
import {Checkbox, List} from "semantic-ui-react";
import {ISteps} from "./ProgressList";
import {gql, useMutation} from "@apollo/client";
import {getAllProgress} from "../progress";

const checkCompletedStep = gql`
  mutation checkCompletedStep($step: ObjectID! $stage: ObjectID) {
      checkCompletedStep(stage: $stage step: $step)
  }
`
const ProgressCheckListBox = ({name, status, _id,stageId, companyId}:ISteps&{companyId: string, stageId:string}) => {
  const [checkStep, {loading}] = useMutation(checkCompletedStep, {
    variables:{stage:stageId, step: _id},
    refetchQueries: [{query: getAllProgress, variables: {companyId}}]
  })
  const handleCheck = ()=>{
    if(status === "pending") {
      checkStep().catch(()=>{})
    }
  }
  return (
    <List.List>
      <Checkbox onClick={handleCheck} disabled={status === "completed" || loading} label={{ children: name }} checked={status === "completed"}/>
    </List.List>
  );
};

export default ProgressCheckListBox;
