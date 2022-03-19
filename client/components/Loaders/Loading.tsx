import React from 'react';
import styled from "styled-components";
import {Loader, Segment} from "semantic-ui-react";

const Loading = () => {
  return (
    <Container>
      <Segment basic>
        <Loader active/>
      </Segment>
    </Container>
  );
};
const Container = styled.div`
  justify-content: center;
  align-items: center;
`
export default Loading;
