import gql from 'graphql-tag';

export const familyDetail = gql`
    query familyDetail( $id: ID!) {
        Family(id: $id) {
            id
            users {
                id
                name
                photoUrl
            }
        }
    }
`



// query {
//     Family(id: "cjhu3yfmkmc0q0111k6sjkjxr") {
//       id
//       users {
//         id
//         name
//         email
//         photoUrl
//         phoneNumber
//         dateOfBirth
//         gender
//         address
//       }
//     }
//   }