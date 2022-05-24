import React from 'react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import Header from './components/Header';
import Footer from './components/Footer';

import Home from './pages/Home';
import Login from './pages/Login';
import NoMatch from './pages/NoMatch';
import SingleThought from './pages/SingleThought';
import Profile from './pages/Profile';
import Signup from './pages/Signup';
import Sidebar from './components/Sidebar';


const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});


// const getImage = ({ image }) => {
//   const picture = React.useContext(url)
// }

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
      <Header />
      <Sidebar />
      {/* <div className='flex-column' style={{"width": "20vw"}}><Sidebar /></div> */}
        <div className="main flex-column justify-flex-start min-100-vh">
          
          
          <div className="container">
              <Routes>
              <Route
                path="/"
                element={<Home />}
              />
              <Route
                path="/login"
                element={<Login />}
              />
              <Route
                path="/signup"
                element={<Signup />}
              />
              <Route
                path="/profile"
                element={<Profile />}
              >
                <Route path=":username"
                  element={<Profile />}
                />
              </Route>
              <Route
                path="/thought/:id"
                element={<SingleThought />}
              />
              <Route
                path="*"
                element={<NoMatch />}
              />
            </Routes>
          
          </div>
          
        </div>
        <Footer />
      </Router>
    </ApolloProvider>
  );
}

export default App;
