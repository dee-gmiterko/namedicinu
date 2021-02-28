import React from "react";
import { Container, Row, Col } from 'react-bootstrap';

import Layout from "../components/layout";
import SEO from "../components/seo";

const NotFoundPage = () => (
  <Layout>
    <SEO title="404: Not found" />
    <Container className="p-3">
      <Row className="justify-content-center align-items-center">
        <Col md={12} className="p-3">
          <h1>NOT FOUND</h1>
          <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
        </Col>
      </Row>
    </Container>
  </Layout>
);

export default NotFoundPage;
