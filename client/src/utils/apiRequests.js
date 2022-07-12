/*
Queries to the Express API
See .env file for base url 
http://localhost:8080/api
*/

export async function fetchUsers(q){

    const requestOptions = {
      method: "GET",
    };

    const response = await fetch(`${process.env.REACT_APP_API_BASE}/search?s=${q}`, requestOptions)
    .then((res) => {
      return res.json();
    })
    .catch((error) => {
      //console.log(error);
      return { error: error };
    });

  return response;

  };

  export async function fetchUser(platform, id){

    const requestOptions = {
      method: "GET",
    };
    const response = await fetch(`${process.env.REACT_APP_API_BASE}/user/${platform}/${id}`, requestOptions)
    .then((res) => {
      return res.json();
    })
    .catch((error) => {
      //console.log(error);
      return { error: error };
    });

    return response;

  };

