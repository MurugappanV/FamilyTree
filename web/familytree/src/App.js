import React, { Component } from 'react';
import './App.css';
import { ApolloProvider } from "react-apollo";
import {client} from './Apollo';
import { Query } from "react-apollo";
import gql from "graphql-tag";
import MyTreeView from './MyTreeView';
import history from './history';
import { addUrlProps, UrlQueryParamTypes } from 'react-url-query';

const UsersGQL = gql`
query AllUsers($id: ID!){
  allUsers(filter: {families_some: {id: $id}}) {
    id
    name
    gender
    dateOfBirth
    photoUrl
    child(filter: {families_some: {id: $id}}) {
      id
    }
    wife(filter: {families_some: {id: $id}}) {
      id
      name
      dateOfBirth
      photoUrl
      father(filter: {families_some: {id: $id}}) {
        id
      }
		}
    husband(filter: {families_some: {id: $id}}) {
      id
      name
      dateOfBirth
      photoUrl
		}
    father(filter: {families_some: {id: $id}}) {
      id
    }
  }
}
`

const getUserData = (user, userMap) => {
  return {
    id: user.id,
    ...user.gender==="MALE" && {
      he: {
        name: user.name,
        born: user.dateOfBirth,
        photoUrl: user.photoUrl
      },
      ...user.wife.length > 0 && {
        she: {
          name: user.wife[0].name,
          born: user.wife[0].dateOfBirth,
          photoUrl: user.wife[0].photoUrl

        }
      },
      ...user.child.length > 0 && {
        children: user.child.map(child => {
          return getUserData(userMap.get(child.id), userMap)
        })
      }
    },
    ...user.gender==="FEMALE" && {
      she: {
        name: user.name,
        born: user.dateOfBirth,
        photoUrl: user.photoUrl
      },
      ...user.husband.length > 0 && {
        he: {
          name: user.husband[0].name,
          born: user.husband[0].dateOfBirth,
          photoUrl: user.husband[0].photoUrl

        }
      },
      ...user.child.length > 0 && {
        children: user.child.map(child => {
          return getUserData(userMap.get(child.id), userMap)
        })
      }
    }
  }
}

const refineData = (data) => {
  let userMap = new Map()
  let alphaUsers = []
  data.allUsers.forEach(user => {
    if(user.father == null && ((user.gender === "MALE" && (user.wife.length === 0 || user.wife[0].father == null)) || (user.gender === "FEMALE" && user.husband.length === 0))) {
      alphaUsers.push(user)
    } else {
      userMap.set(user.id, user)
    }
  })
  return alphaUsers.map(user => {
    return getUserData(user, userMap)
  })
}

const urlPropsQueryConfig = {
  id: { type: UrlQueryParamTypes.string }
};

class App extends Component {
  componentDidMount() {
    // force an update if the URL changes
    history.listen(() => this.forceUpdate());
  }

  render() {
    const id = this.props.id ? this.props.id : "cjiqdtajzeej90103krdzq5sx"
    console.log("params", id )
    return (
      <ApolloProvider client={client} style={{height: '100%'}}>
        <Query query={UsersGQL} variables={{ id }} style={{height: '100%'}}>
          {({ loading, error, data }) => {
            if (loading) return <div className="container"><p>Loading...</p></div>;
            if (error) return <div className="container"><p>Error :(</p></div>;
            return <MyTreeView style={{height: '100%'}} familyTree={refineData(data)}/>;
          }}
        </Query>
      </ApolloProvider>
    );
  }
}

export default addUrlProps({ urlPropsQueryConfig })(App);

            // return data.allCourses.map(({ id, title, author, description, topic, url }) => (
            //   <div key={id}>
            //     <p>{`${title} by ${author}`}</p>
            //   </div>
            // ));

      // <div className="App">
      //   <header className="App-header">
      //     <img src={logo} className="App-logo" alt="logo" />
      //     <h1 className="App-title">Welcome to React</h1>
      //   </header>
      //   <p className="App-intro">
      //     To get started, edit <code>src/App.js</code> and save to reload.
      //   </p>
      // </div>