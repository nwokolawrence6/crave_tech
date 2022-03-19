import React from 'react';
import styled from "styled-components";
import Error from "./Error";
type message = string
const defaultProps = {
  message:"Error Loading page please reload"
}
const ErrorPage = ({message}:{message?:message}) => {
  return (
    <Container>
      <Error message={message}/>
    </Container>
  );
};
const Container = styled.div`
  display: flex;
  flex: 1;
  min-height: 100vh;
  width: 100vw;
  justify-content: center;
  align-items: center;
`
ErrorPage.defaultProps = defaultProps
export default ErrorPage;
