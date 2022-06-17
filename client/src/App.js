import { Container } from '@material-ui/core';
import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import Auth from './components/Auth/Auth';
import Chat from './components/Chat/Chat';
import CreatorOrTag from './components/CreatorOrTag/CreatorOrTag';
import Home from './components/Home/Home';
import Navbar from './components/Navbar/Navbar';
import PostDetails from './components/PostDetails/PostDetails';
import UserProfile from './components/UserProfile/UserProfile';

const App = () => {
  const user = JSON.parse(localStorage.getItem('profile'));

  return (
    <BrowserRouter>
      <Container maxWidth="xl">
        <Navbar />
        <Switch>
          <Route path="/" exact component={() => <Redirect to="/posts" />} />
          <Route path="/posts" exact component={Home} />
          <Route path="/posts/search" exact component={Home} />
          <Route path="/posts/:id" exact component={PostDetails} />
          <Route path={['/creators/:name', '/tags/:name']} component={CreatorOrTag} />
          <Route path="/auth" exact component={() => (!user ? <Auth /> : <Redirect to="/posts" />)} />
          <Route path="/profile" exact component={UserProfile} />
          <Route path="/chat" exact component={Chat} />
        </Switch>
      </Container>
    </BrowserRouter>
  );
};

export default App;