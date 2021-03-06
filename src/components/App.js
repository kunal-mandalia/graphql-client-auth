import React, { Component } from 'react';
import '../styles/App.css';
import Login from './Login'
import Dashboard from './Dashboard'
import Loader from './Loader'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { Gradient } from './styles'
import { QUERY_MYPROFILE } from '../queries'

export class App extends Component {
  render() {
    const { data: { getMyProfile, loading, error } } = this.props
    return (
      <div className="App">
        <Gradient>
          <header className="App-header">
            <h1 className="App-title">Frontend/Auth</h1>
            <p>An Apollo-Client demo</p>
          </header>
        </Gradient>
        {
          loading
            ? <Loader />
            : getMyProfile
              ? <Dashboard />
              : <Login />
        }
      </div>
    );
  }
}

export default graphql(QUERY_MYPROFILE)(App);
