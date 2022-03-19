import React from 'react';
import {Icon, Menu, SemanticICONS} from "semantic-ui-react";
import routes from "./routes";
import Box from "./Box";
import Link from "next/link";
import {gql, useMutation} from "@apollo/client";
import {getCurrentUser} from "../../Auth/CheckAuth";
export interface IRoutes {
  route: string
  title: string
  as:any
  icon: SemanticICONS | undefined
}
const logoutGql = gql`
  mutation {
      logout
  }
`
const DashBoardRouterList = () => {
  const list = routes.map((res)=> <Box key={res.title} {...res}/>)
  const [logout, {loading}] = useMutation(logoutGql, {
    refetchQueries: [{query: getCurrentUser}],
    onCompleted: () => window.location.reload()
  })
  return <>
    {list}
      <Menu.Item as={"div"}  onClick={()=> !loading && logout().catch(()=>{})}>
        <Icon name={"lock"} loading={loading}/>
         Logout
      </Menu.Item>
  </>
};

export default DashBoardRouterList;
