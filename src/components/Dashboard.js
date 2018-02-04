import React, {Component} from 'react'
import { graphql } from 'react-apollo'
import { withApollo, compose } from 'react-apollo'
import {
  Container,
  TextInput,
  Button,
  Error
} from './styles'
import {
  QUERY_MYPROFILE,
  MUTATION_UPDATEUSERNAME
} from '../queries'

export class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      newUsername: ''
    }
    this.onLogout = this.onLogout.bind(this)
    this.onSaveUsername = this.onSaveUsername.bind(this)
    this.onChangeUsername = this.onChangeUsername.bind(this)
  }

  onChangeUsername (e) {
    this.setState({
      newUsername: e.target.value
    })
  }

  onSaveUsername () {
    const { newUsername } = this.state
    // https://www.apollographql.com/docs/react/basics/mutations.html
    this.props.mutate({
      variables: { newUsername },
      update: (proxy, { data: { updateUsername: { username } } }) => {
        // Read the data from our cache for this query.
        const data = proxy.readQuery({ query: QUERY_MYPROFILE });
    
        // Add our todo from the mutation to the end.
        data.getMyProfile.username = username
    
        // Write our data back to the cache.
        proxy.writeQuery({ query: QUERY_MYPROFILE, data });
      },
    })
    .then(({ data: { updateUsername: { token }} }) => {
      localStorage.setItem('token', token)
    })
    .catch((error) => console.log('onSaveUsername error', error))
  }

  onLogout () {
    localStorage.setItem('token', undefined)
    this.props.client.resetStore()
  }

  render() {
    const { data: { getMyProfile, loading, error }} = this.props
    const { newUsername } = this.state

    if (error) {
      return <Error id='error'>{error.message}</Error>
    }

    const { username, email } = getMyProfile
    return (
      <Container id='dashboard' className='dashboard'>
        <h2>Dashboard</h2>
        <p>Hello {username}</p>
        <TextInput id='new-username' placeholder='New Username' onChange={this.onChangeUsername} value={this.state.newUsername} />
        <Button btnStyle='success' onClick={this.onSaveUsername} disabled={newUsername.length === 0}>Update Username</Button>
        <Button btnStyle='secondary' onClick={this.onLogout}>Log out</Button>
      </Container>
    )
  }
}

export default withApollo(
  compose(
    graphql(MUTATION_UPDATEUSERNAME),
    graphql(QUERY_MYPROFILE),
  )(Dashboard))
