/*
Displays a form to get user search term. 
It navigates to the UserList Component on submit
*/
import { useState} from "react";
import { useNavigate } from "react-router";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import "../css/SearchForm.css";

const SearchForm = ({query}) => {
  
  let navigate = useNavigate();
  const [search, setSearch] = useState(query);

  const handleSubmit = (e) => {
    e.preventDefault();   
    navigate({
      pathname: '/search',
      search: '?s='+search,
    });
    
  }

  return (
    <div className="searchform text-center pt-5 pb-4">
    <Container>

    <Form  onSubmit={handleSubmit}>
    <Row className="justify-content-center g-1"><Col xs="12" md="9"  lg="8">
    <Form.Group className="mb-3" controlId="formSearch">
      <Form.Control
        type="text"
        name="search"
        value={search}
        pattern=".{3,}"
        title="Enter at least three characters to begin searching."
        placeholder="Search for a GitHub or Gitlabs user by name/username"
        onChange={(e) => setSearch(e.target.value)}
      />
      </Form.Group>
      </Col><Col xs="auto"><Button variant="primary" type="submit">Search</Button></Col></Row>
      
    </Form>
    </Container>
    </div> 
  );
};

export default SearchForm;
