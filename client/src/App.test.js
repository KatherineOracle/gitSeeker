import React from 'react'
import App from './App'
import {findByRole, findByText, render, screen, waitFor, act} from '@testing-library/react'
import userEvent from '@testing-library/user-event';
import {BrowserRouter, MemoryRouter} from 'react-router-dom'


beforeEach(() => {
  fetch.resetMocks();
});


/*
This test checks that the app loaded by looking
for the text of the main app header H1
*/
test('renders welcome message', () => {
  render(<App />, {wrapper: BrowserRouter})
  const textElement = screen.getByText(/Enter a Git user name in the search above and I'll hunt them down!/i);
  expect(textElement).toBeInTheDocument();
})


/*
Now we are going to check that when the user: 
1) types in "KatherineOracle"
2) clicks submit

The following should happen:
1) An API call is made - we use a Mock API call with a data sample taken from the real API
2) The results are printed to the screen (we look for an element containing "KatherineOracle")
*/
it('Fetch data on button click', async () => {

  fetch.mockResponseOnce(JSON.stringify({"data":[{"id":"KatherineOracle","username":"KatherineOracle","avatar":"https://avatars.githubusercontent.com/u/65524890?v=4","platform":"github"},{"id":11977117,"username":"KatherineOracle","avatar":"https://secure.gravatar.com/avatar/acaf36bb4649a577eb041029120b39db?s=80&d=identicon","platform":"gitlab"}]}
    ));

    render(<App />, {wrapper: BrowserRouter})

  //find the form fields we want to fire events on
  const inputField = screen.getByRole('textbox');  
  const submitButton = screen.getByRole('button', { type: /submit/i
  });

  //fire events
  userEvent.type(inputField, 'KatherineOracle');
  userEvent.click(submitButton);
  
  //test that a fetch call was made once
  expect(fetch).toHaveBeenCalledTimes(1);
  //check the fetch url matches expectations
  expect(fetch).toHaveBeenCalledWith('http://localhost:8080/api/search?s=KatherineOracle', {"method" : "GET"})

  //we need to wait for the response to display on screen
  const promise = screen.findAllByText(/KatherineOracle/i);   
  await promise;

});

