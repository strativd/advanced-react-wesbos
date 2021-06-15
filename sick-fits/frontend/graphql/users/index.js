import { gql } from '@apollo/client';

/* QUERIES */

export const CURRENT_USER_QUERY = gql`
  query {
    authenticatedItem {
      ... on User {
        id
        email
        name
        # TODO: Query the cart once we have it
      }
    }
  }
`;

/* MUTATIONS */

export const SIGNIN_MUTATION = gql`
  mutation SIGNIN_MUTATION($email: String!, $password: String!) {
    authenticateUserWithPassword(email: $email, password: $password) {
      ... on UserAuthenticationWithPasswordSuccess {
        item {
          id
          email
          name
        }
      }
      ... on UserAuthenticationWithPasswordFailure {
        code
        message
      }
    }
  }
`;

export const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION(
    $name: String!
    $email: String!
    $password: String!
  ) {
    createUser(data: { name: $name, email: $email, password: $password }) {
      id
      name
      email
    }
  }
`;

export const SIGNOUT_MUTATION = gql`
  mutation SIGNOUT_MUTATION {
    endSession
  }
`;
