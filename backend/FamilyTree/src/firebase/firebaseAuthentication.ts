import { fromEvent, FunctionEvent } from 'graphcool-lib'
import { GraphQLClient } from 'graphql-request'
// import * as fetch from 'isomorphic-fetch'
import * as admin from 'firebase-admin';

var serviceAccount = require('./medscan-firebase-adminsdk.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://familytree-f6684.firebaseio.com'
});

interface User {
  id: string
}

// interface GoogleUser {
//   id: string
//   email: string | null
// }

interface EventData {
  firebaseToken: string
  phoneNumber: string
}

export default async (event: FunctionEvent<EventData>) => {
  console.log(event)

  try {
    const graphcool = fromEvent(event)
    const api = graphcool.api('simple/v1')

    const { firebaseToken, phoneNumber } = event.data

    // call firebase API to obtain user data
    const firebaseUser = await getFirebaseUser(firebaseToken)
    
    // get graphcool user by firebase id
    const user: User = await getGraphcoolUser(api, phoneNumber)
      .then(r => r.User)

    // check if graphcool user exists, and create new one if not
    let userId: string | null = null

    if (!user) {
      userId = await createGraphcoolUser(api, firebaseUser, phoneNumber)
    } else {
      userId = user.id
    }

    // generate node token for User node
    const token = await graphcool.generateAuthToken(userId!, 'User')

    return { data: { id: userId, token} }
  } catch (e) {
    console.log(e)
    return { error: `An unexpected error occured during authentication. ${e}` }
  }
}

// async function getGoogleUser(firebaseToken: string): Promise<GoogleUser> {
//   const endpoint = `https://www.firebaseapis.com/oauth2/v3/tokeninfo?id_token=${firebaseToken}`
//   const data = await fetch(endpoint)
//     .then(response => response.json())

//   if (data.error_description) {
//     throw new Error(data.error_description)
//   }

//   return data
// }

async function getFirebaseUser(firebaseToken: string): Promise<string> {
  const uid = await admin.auth().verifyIdToken(firebaseToken)
  .then((decodedToken) => {
    return decodedToken.uid;
  }).catch((error) => {
    throw new Error(error)
  });

  return uid;
}



async function getGraphcoolUser(api: GraphQLClient, phoneNumber: string): Promise<{ User }> {
  const query = `
    query getUser($phoneNumber: String!) {
      User(phoneNumber: $phoneNumber) {
        id
      }
    }
  `

  const variables = {
    phoneNumber,
  }

  return api.request<{ User }>(query, variables)
}

async function createGraphcoolUser(api: GraphQLClient, firebaseUserId: string, phoneNumber: string): Promise<string> {
  const mutation = `
    mutation createUser($firebaseUserId: String!, $phoneNumber: String!) {
      createUser(
        firebaseUserId: $firebaseUserId,
        phoneNumber: $phoneNumber
      ) {
        id
      }
    }
  `

  const variables = {
    firebaseUserId,
    phoneNumber
  }

  return api.request<{ createUser: User }>(mutation, variables)
    .then(r => r.createUser.id)
}
