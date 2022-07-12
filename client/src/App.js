/*
 Root componenent of the GitSeeker App.
 Comrprises
 1) Constructor to initialise state
 2) Setter functions
 
*/

import React from "react";
import {Routes, Route} from "react-router-dom";
import AppHeader from "./components/appHeader";
import SearchForm from "./components/SearchForm";
import UserList from "./components/UserList";
import User from "./components/User";
import Welcome from "./components/Welcome";
import "./css/App.css";


class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      query: "",
      users: "",
      user: {platform: '', id: '', data: ''} 
    };
    this.setQuery = this.setQuery.bind(this);
    this.setUser = this.setUser.bind(this);
    this.setUsers = this.setUsers.bind(this);
  }

  setQuery(q) {
    this.setState({ query: q });
  }

  setUser(platform, id, data) {

    this.setState({ user:  {
      platform: platform,
      id: id,
      data: {...data}}}
    );
  }  
  
  setUsers(data) {
    this.setState({ users: [...data] }
    );
  }  

  render () {
    return(
    <div className="App">
      <AppHeader />
      <SearchForm setQuery={this.setQuery} query={this.state.query} />
      <main>
        <Routes>
          <Route exact path="/" element={<Welcome />} />
          <Route
            path="/search"
            element={<UserList query={this.state.query} setQuery={this.setQuery} users={this.state.users} setUsers={this.setUsers} />}
          />
          <Route
            exact
            path="/user/:platform/:id"
            element={
              <User user={this.state.user} setUser={this.setUser}  />
            }
          />
        </Routes>
      </main>
      <footer>
        <span>Built by Katherine Van As at the HyperionDev School</span>
      </footer>
    </div>
    )
  };
}

export default App;
