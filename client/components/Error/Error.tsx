import React from 'react';
import styled from "styled-components";

const Error = ({message}:{message?:string}) => {
  return (
    <Container>
      <i className="fa fa-exclamation-circle" aria-hidden="true"/>
      <div>{message}</div>
    </Container>
  );
};
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  i {
    font-size: 100px;
    color: #9b0000;
  }
`
export default Error;
