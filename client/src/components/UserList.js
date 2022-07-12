/*
Render list of users.  
Holds the current page number in state for 
pagination of users (max 100)
The use effect function watches for changes in the search parameter 
if the query has changed users are fetched from API and stored in App state
*/
import React, { useEffect } from "react";
import { useState } from "react";
import { Image, ListGroup, Row, Col } from "react-bootstrap";
import { Link, useSearchParams } from "react-router-dom";
import Pagination from "./Pagination";
import LoadingIcon from "./LoadingIcon";
import { fetchUsers } from "../utils/apiRequests";
import '../css/UserList.css';


const UserList = ({query, setQuery, users, setUsers}) => {

  let [searchParams] = useSearchParams();
  const q = searchParams.get("s");
  const [page, setPage] = useState(0);
  const perPage = 15;
  const startUser = page*perPage ;
  const endUser = startUser+perPage;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {

    if(query === q) return; 
    if(q.length >= 3){

      setLoading(true);
      fetchUsers(q).then(result => {
        setUsers(result.data);
        setQuery(q);
        setError(result.error);
        setLoading(false);
      });

    }

  }, [q])


  if (error) return <p className="text-center">{error}</p>;  

  if (loading) return <LoadingIcon />;

  if(users !== '') return (
    <Row className="justify-content-center text-start">
      <Col md="8">
        
        <h1>I found some users for you</h1>

        <Pagination page={page} perPage={perPage} setPage={setPage} userCount={users.length} />

        <ListGroup variant="flush">
          
          {//display a slice of the user array based on page number
          users.slice(startUser, endUser).map((user, idx) => {
            return (
              <Link
                key={"userlink-" + idx}
                to={"/user/" + user.platform + "/" + user.id}
                state={{ user: user }}
              >
                <Row className="user-row p-2 align-items-center" g="2">
                  <Col xs="auto">
                    <Image roundedCircle width="40" src={user.avatar} />
                  </Col>
                  <Col>
                    <span className={"icon-" + user.platform}>
                      {" "}                      
                    </span>{" "}
                    {user.username}
                  </Col>
                </Row>
              </Link>
            );
          })}
        </ListGroup>

          
        <Pagination page={page} perPage={perPage} setPage={setPage} userCount={users.length} />

      </Col>
    </Row>
  );
};

export default UserList;
