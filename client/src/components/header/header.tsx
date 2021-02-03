// @flow
import * as React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { HeaderLogo } from "./header-logo";
type Props = {};
export function HeaderComponent(props: Props) {
  return (
    <div className="header-component">
      <Container>
        <Row>
          <Col xs={3}>
            <HeaderLogo />
          </Col>
        </Row>
      </Container>
    </div>
  );
}
