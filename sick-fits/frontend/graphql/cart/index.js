import gql from 'graphql-tag';

/* QUERIES */

/* MUTATIONS */

export const ADD_TO_CART_MUTATION = gql`
  mutation ADD_TO_CART_MUTATION($id: ID!) {
    addToCart(productId: $id) {
      id
      quantity
      user {
        email
      }
    }
  }
`;
