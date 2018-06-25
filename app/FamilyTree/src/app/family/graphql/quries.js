import gql from 'graphql-tag';

export const familyDetail = gql`
    query familyDetail( $id: ID!, $metaId: ID) {
        Family(id: $id) {
            id
            users {
                id
                name
                photoUrl
                dateOfBirth
            }
            totalCount: _usersMeta {
                count
            }
            maleCount: _usersMeta(filter: {gender: MALE}) {
                count
            }
            femaleCount: _usersMeta(filter: {gender: FEMALE}) {
                count
            }
            marriedCount: _usersMeta(filter: {OR: [{husband_some: {id_not: $metaId} }, {wife_some: {id_not: $metaId} }]}) {
                count
            }
            unmarriedCount: _usersMeta(filter: {AND: [{husband_every: {id: $metaId} }, {wife_every: {id: $metaId} }]}) {
                count
            }
        }
    }
`
export const userCloseRelation = gql`
    query getUserCloseRelation($id: ID!) {
        User(id: $id) {
            id
            name
            gender
            dateOfBirth
            email
            phoneNumber
            photoUrl
            father {
                id
                name
                gender
                photoUrl
                wife {
                    id
                    name
                    gender
                    photoUrl
                }
                child {
                    id
                    name
                    gender
                    photoUrl
                }
            }
            husband {
                id
                name
                gender
                photoUrl
            }
            wife {
                id
                name
                gender
                photoUrl
            }
            child {
                id
                name
                gender
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