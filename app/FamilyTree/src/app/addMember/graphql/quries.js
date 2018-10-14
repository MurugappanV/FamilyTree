import gql from 'graphql-tag';

export const createUser = gql`
    mutation CreateUser($phoneNumber: String!, $name: String, $email: String, $photoUrl: String, $dateOfBirth: DateTime, $address: String, $gender: Gender, $familiesIds: [ID!], $fatherId: ID, $wifeIds: [ID!], $husbandIds: [ID!]) {
        createUser(phoneNumber: $phoneNumber, name: $name, email: $email, photoUrl: $photoUrl, dateOfBirth: $dateOfBirth, address: $address, gender: $gender, familiesIds: $familiesIds, fatherId: $fatherId, wifeIds: $wifeIds, husbandIds: $husbandIds) {
            id
        }
    }
`

export const updateUser = gql`
    mutation UpdateUser($id: ID!, $phoneNumber: String!, $name: String, $email: String, $photoUrl: String, $dateOfBirth: DateTime, $address: String, $gender: Gender, $fatherId: ID, $wifeIds: [ID!], $husbandIds: [ID!]) {
        updateUser(id: $id, phoneNumber: $phoneNumber,name: $name, email: $email, photoUrl: $photoUrl, dateOfBirth: $dateOfBirth, address: $address, gender: $gender, fatherId: $fatherId, wifeIds: $wifeIds, husbandIds: $husbandIds) {
            id
        }
    }
`