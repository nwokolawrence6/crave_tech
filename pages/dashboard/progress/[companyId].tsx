import React from 'react'
import Company from "../../../client/components/Dashboard/Company";
import DashSideBar from "../../../client/components/Dashboard/DashSideBar";
import Progress from "../../../client/components/Dashboard/progress/progress";

const DashBoard = () => {
  return (
    <DashSideBar>
      <Progress/>
    </DashSideBar>
  )
}
export default DashBoard
