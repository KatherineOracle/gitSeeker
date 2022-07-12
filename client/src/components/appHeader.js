/*
Display our app header with cool GitSeeker logo as a link to home.
*/
import { Link } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import logo from "../logo.svg";

const AppHeader = () => {
  return (
    <header className="App-header">
      <Row xs="auto" className="g-0 justify-content-center align-items-center ">
        <Col className="me-4">
          <Link to="/">
            <img src={logo} className="App-logo" alt="logo" />
          </Link>
        </Col>
        <Col>
          <h1>
            <Link to="/">The GitSeeker</Link>
          </h1>
        </Col>
      </Row>
    </header>
  );
};

export default AppHeader;
