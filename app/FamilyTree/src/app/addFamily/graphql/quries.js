import gql from 'graphql-tag';

export const createFamily = gql`
    mutation createFamily($name: String!, $photoUrl: String, $createById: ID!, $usersIds: [ID!]) {
        createFamily(name: $name, photoUrl: $photoUrl, createById: $createById, usersIds: $usersIds) {
            id
        }
    }
`