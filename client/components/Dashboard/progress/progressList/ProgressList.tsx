import React from 'react';
import {List} from "semantic-ui-react";
import ProgressBox from "./ProgressBox";

type status = "pending" | "completed"

export interface ISteps {
  _id: string
  status: status
  name: string
}

export interface IProgress {
  _id: string
  isCompleted: boolean
  steps: [ISteps]
  stage: string
  createdAt: Date
}


const ProgressList = ({progressList, companyId}: { progressList: Array<IProgress>, companyId: string }) => {
  const list = progressList.map((data, index)=> <ProgressBox companyId={companyId} number={index+1} key={data.stage} {...data} />)
  return (
    <List celled>
      {list}
    </List>
  );
};

export default ProgressList;
