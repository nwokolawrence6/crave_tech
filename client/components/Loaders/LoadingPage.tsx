import React from 'react';
import styled from "styled-components";
import Loading from "./Loading";
const LoadingPage = () => {
  return (
    <Container>
      <Loading/>
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
export default LoadingPage;
