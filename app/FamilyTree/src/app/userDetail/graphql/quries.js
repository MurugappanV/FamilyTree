import gql from 'graphql-tag';

export const updateUser = gql`
    mutation UpdateUser($id: ID!, $name: String, $email: String, $photoUrl: String, $dateOfBirth: DateTime, $address: String, $gender: Gender) {
        updateUser(id: $id, name: $name, email: $email, photoUrl: $photoUrl, dateOfBirth: $dateOfBirth, address: $address, gender: $gender) {
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