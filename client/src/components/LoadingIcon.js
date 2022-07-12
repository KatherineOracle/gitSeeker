/*
Displays a funky animation while we are fetching data.
This is a child component of the userList and/or User components
*/

import { Row, Col } from "react-bootstrap";
import "../css/LoadingIcon.css";

const LoadingIcon = () => {
  return (
    <Row className="justify-content-center text-center">
      <Col xs="auto" md={6} lg={4} xl={4}>
        <p className="loading">... loading gitteous data ... </p>

        <svg className="float-center" version="1.1" x="0px" y="0px" viewBox="0 0 100 50">
          <circle fill="#61dafb" stroke="none" cx="10" cy="25" r="10">
            <animateTransform
              attributeName="transform"
              dur="2s"
              type="translate"
              values="0 15 ; 0 -15; 0 15"
              repeatCount="indefinite"
              begin="0.1"
            />
          </circle>
          <circle fill="#61dafb" stroke="none" cx="50" cy="25" r="10">
            <animateTransform
              attributeName="transform"
              dur="2s"
              type="translate"
              values="0 10 ; 0 -10; 0 10"
              repeatCount="indefinite"
              begin="0.2"
            />
          </circle>
          <circle fill="#61dafb" stroke="none" cx="90" cy="25" r="10">
            <animateTransform
              attributeName="transform"
              dur="2s"
              type="translate"
              values="0 5 ; 0 -5; 0 5"
              repeatCount="indefinite"
              begin="0.3"
            />
          </circle>
        </svg>
      </Col>
    </Row>
  );
};

export default LoadingIcon;
