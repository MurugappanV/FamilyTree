import gql from 'graphql-tag';

export const familiesByUserIdQuery = gql`
    query FamiliesByUserId($id : ID!) {
        allFamilies(filter: {users_some: {id: $id}}) {
            id
            name
            photoUrl
            _usersMeta {
                count
            }
        }
    }
`