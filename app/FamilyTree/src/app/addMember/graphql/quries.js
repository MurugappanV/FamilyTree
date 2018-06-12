import gql from 'graphql-tag';

export const createUser = gql`
    mutation CreateUser($phoneNumber: String!, $name: String, $email: String, $photoUrl: String, $dateOfBirth: DateTime, $address: String, $gender: Gender, $familiesIds: [ID!]) {
        createUser(phoneNumber: $phoneNumber, name: $name, email: $email, photoUrl: $photoUrl, dateOfBirth: $dateOfBirth, address: $address, gender: $gender, familiesIds: $familiesIds) {
            id
        }
    }
`