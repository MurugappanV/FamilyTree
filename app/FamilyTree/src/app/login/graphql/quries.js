import gql from 'graphql-tag';

export const authenticateUser = gql`
    mutation authenticatePhoneNumber($firebaseToken : String!, $phoneNumber: String) {
        authenticateFirebaseUser(firebaseToken: $firebaseToken, phoneNumber: $phoneNumber) {
            id
            token
        }
    }
`

export const userByIdQuery = gql`
    query UserById($id : ID!) {
        User(id: $id) {
            id
            name
            email
            photoUrl
            phoneNumber
            dateOfBirth
            gender
            address
            husband {
                id
                name
                photoUrl
            }
            wife {
                id
                name
                photoUrl
            }
            families {
                id
                name
                photoUrl
                _usersMeta {
                    count
                }
            }
            father {
                id
                name
                photoUrl
            }
            child {
                id
                name
                photoUrl
            }
        }
    }
`