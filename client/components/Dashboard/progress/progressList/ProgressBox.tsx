import React from 'react';
import {Icon, List} from "semantic-ui-react";
import {IProgress} from "./ProgressList";
import ProgressCheckListBox from "./ProgressCheckListBox";
import styled from "styled-components";


const ProgressBox = ({stage, steps, number, companyId, _id, isCompleted}: IProgress & { number: number, companyId: string }) => {
  const list = steps.map((data) => <ProgressCheckListBox stageId={_id} companyId={companyId} {...data}/>)
  return (
    <>
      <List.Item>
        <H3><div>{number}</div> {stage} {isCompleted && <Icon name='check' color="green"/>}</H3>
        {list}
      </List.Item>
    </>
  );
};
const H3 = styled.h3`
  div {
    float: left;
    background: #000;
    border-radius: 100px;
    min-width: 25px;
    color: #fff;
    text-align: center;
    margin-right: 10px;
  }
`
export default ProgressBox;
