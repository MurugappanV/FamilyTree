import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import { ApolloProvider } from "react-apollo";
import {client} from './Apollo';
import { Query } from "react-apollo";
import gql from "graphql-tag";
// import {familyTree} from './MyTreeData';
import {MyTreeView} from './MyTreeView';

const UsersGQL = gql`
{
  allUsers(filter: {families_some: {id: "cjiqdtajzeej90103krdzq5sx"}}) {
    id
    name
    gender
    dateOfBirth
    child {
      id
    }
    wife {
      id
      name
		}
    father {
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
        born: 2018
      },
      ...user.wife.length > 0 && {
        she: {
          name: user.wife[0].name,
          born: 2018
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
        born: 2018
      }
    }
  }
}

const refineData = (data) => {
  let userMap = new Map()
  let alphaUsers = []
  data.allUsers.forEach(user => {
    if(user.father == null && user.gender === "MALE") {
      alphaUsers.push(user)
    } else {
      userMap.set(user.id, user)
    }
  })
  return alphaUsers.map(user => {
    return getUserData(user, userMap)
  })
}

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Query query={UsersGQL} >
          {({ loading, error, data }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error :(</p>;
              console.log(refineData(data))
            return <MyTreeView familyTree={refineData(data)}/>;
          }}
        </Query>
      </ApolloProvider>
    );
  }
}

export default App;

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