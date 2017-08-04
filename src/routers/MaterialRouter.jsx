
import React from 'react';
import { Container, Approval, Header } from '../bizComponent';

export default class MaterialRouter extends React.Component {
  render() {
    return (
        <div>
            <Header />
            <Container >
              <Approval />
            </Container>
        </div>
    );
  }
}