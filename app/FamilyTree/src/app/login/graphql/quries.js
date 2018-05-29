import gql from 'graphql-tag';

export const authenticateUser = gql`
    mutation authenticatePhoneNumber($firebaseToken : String!) {
        authenticateFirebaseUser(firebaseToken: $firebaseToken) {
            id
            token
        }
    }
`