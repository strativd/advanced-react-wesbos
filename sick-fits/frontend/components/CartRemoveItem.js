import { useMutation } from '@apollo/client';
import styled from 'styled-components';

import { REMOVE_CART_ITEM_MUTATION } from '../graphql/cart';

const BigButton = styled.button`
  font-size: 3rem;
  background: none;
  border: 0;
  &:hover {
    color: var(--red);
    cursor: pointer;
  }
`;

function update(cache, payload) {
  cache.evict(cache.identify(payload.data.deleteCartItem));
}

export default function CartRemoveItem({ id }) {
  const [removeFromCart, { loading }] = useMutation(REMOVE_CART_ITEM_MUTATION, {
    variables: { id },
    update,
    /* REMOVE: optimistic response calling every query on the page ¯\_(シ)_/¯

    optimisticResponse: {
      deleteCartItem: {
        __typename: 'CartItem',
        id,
      },
    },
    
    */
  });
  return (
    <BigButton
      onClick={removeFromCart}
      disabled={loading}
      type="button"
      title="Remove This Item from Cart"
    >
      &times;
    </BigButton>
  );
}
