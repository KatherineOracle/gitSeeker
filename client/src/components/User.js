/*
Display a single user 
Child components
* LoadingIcon
* RepoList
* The use effect function listens for changes to the URL parameters (id and platform)
* The API is called providing that it is not the same as the matching keys of the user in state 
... This prevents reloading when using back/forward buttons in the browser
*/

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Image, Row, Col } from "react-bootstrap";
import RepoList from "./RepoList";
import LoadingIcon from "./LoadingIcon";
import { fetchUser } from "../utils/apiRequests";
import '../css/User.css';

const User = ({ user, setUser }) => {

    //const location = useLocation();
    const dateSettings = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};
    const {platform, id} = useParams();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
  
    useEffect(() => {

    if(user.id === id && user.platform === platform && user.data !== '') return; 

      setLoading(true);
      fetchUser(platform, id).then(result => {
        setUser(platform, id, result.data);
        setError(result.error);
        setLoading(false);
      });

    }, [platform, id])
  
  
    if (error) return <p className="text-center">{error}</p>;  
  
    if (loading) return <LoadingIcon />;
    
    if(user.data !== "") return(
        <Row className="user justify-content-center ">
            <Col xs={12} md={10} lg={9}>
            <Row>
                <Col xs="auto" lg={3} xl={2}>
                <Image roundedCircle width="120" src={user.data.avatar_url} />
                </Col>
                <Col xs="auto" lg={9} xl={10}>
                <h1>
                {user.data.login} <span> (<strong>{user.data.followers}</strong> followers, <strong>{user.data.following}</strong> following, on <span className={"icon-" + platform}>{platform}</span>)</span></h1>
                <dl>
                    <dt>Real name</dt><dd>{(user.data.name)? user.data.name : "N/A" } </dd>
                    <dt>Home page</dt><dd><a rel="external" href={user.data.html_url}>{user.data.html_url}</a></dd>
                    { (user.data.email)? <><dt>Email</dt><dd> <a rel="email" href={user.data.email}>{user.data.email}</a> </dd></> : ""}
                    { (user.data.location)? <><dt>Location</dt><dd>{user.data.location} </dd></> : ""}
                    { (user.data.repos_url)? <><dt>Public repos</dt><dd>{user.data.public_repos? user.data.public_repos + ' at' : ''} <a rel="external" href={user.data.repos_url}>{user.data.repos_url}</a></dd></> : ""}
                    { (user.data.gists_url)? <><dt>Public gists</dt><dd>{user.data.public_gists? user.data.public_gists + ' at' : ''} <a rel="external" href={user.data.gists_url}>{user.data.gists_url}</a> </dd></> : ""}
                    <dt>Since</dt><dd>{new Date(user.data.created_at).toLocaleDateString('en-US',dateSettings)}</dd>
                    <dt>Biography</dt><dd>{user.data.bio? user.data.bio : "N/A"}</dd>
                </dl>
                </Col>
            </Row> <hr/>
            <Row>
                <Col xs="12">
                    <RepoList user={user} platform={platform} dateSettings={dateSettings}></RepoList>
                </Col>
            </Row>
            </Col>
        </Row>
    )
}

export default User;


