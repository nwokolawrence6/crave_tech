import React, {ReactNode} from 'react'
import {
  Menu,
  Segment,
  Sidebar,
} from 'semantic-ui-react'
import styled from "styled-components";
import {useRouter} from "next/router";
import DashBoardRouterList from "../../components/Dashboard/Routes/DashBoardRouterList";
import CheckAuth from "../../components/Auth/CheckAuth";
import Company from "./Company";
import Progress from "./progress/progress";

const DashBoard = ({children}: { children: ReactNode }) => {
  return (
    <CheckAuth>
      {() => <Sidebar.Pushable as={Container}>
        <Sidebar
          as={Menu}
          animation='push'
          icon='labeled'
          inverted
          vertical
          visible={true}
          width='thin'
        >
          <DashBoardRouterList/>
        </Sidebar>
        <Sidebar.Pusher>
          <Segment basic as={DashContent}>
            {children}
          </Segment>
        </Sidebar.Pusher>
      </Sidebar.Pushable>}
    </CheckAuth>
  )
}
const Container = styled.div`
  height: 100vh !important;
`
const DashContent = styled.div`
  width: 90%;
`
export default DashBoard
