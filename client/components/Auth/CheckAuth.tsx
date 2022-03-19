import React, { ReactNode} from 'react';
import {gql, useQuery} from "@apollo/client";
import {Loader} from "semantic-ui-react";
import Login from "../../../pages";


interface IUser {
  email: string
  lastName: string
  firstName: string
  code:string
  createdAt:string
}
export const getCurrentUser = gql`
    query getCurrentUser {
        getCurrentUser {
            email
            lastName
            firstName
            code
            createdAt
        }
    }
`
const CheckAuth = ({children}: { children: (data:IUser)=> ReactNode}) => {
  const {loading, error, data} = useQuery(getCurrentUser)
  return (
    <>
        {loading ? <Loader/> : error ? <Login/> : children(data.getCurrentUser)}
    </>
  );
};

export default CheckAuth;
