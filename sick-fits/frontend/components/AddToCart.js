import { useMutation } from '@apollo/client';
import React from 'react';

import { useCart } from '../lib/cartState';
import { ADD_TO_CART_MUTATION } from '../graphql/cart';
import { CURRENT_USER_QUERY } from '../graphql/users';

export default function AddToCart({ id }) {
  const { openCart } = useCart();
  const [addToCart, { error, loading }] = useMutation(ADD_TO_CART_MUTATION, {
    variables: { id },
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });

  const handleClick = async () => {
    await addToCart();
    openCart();
  };

  if (error) alert(error);

  const buttonText = loading ? 'Adding to cart' : 'Add to cart';

  return (
    <button type="button" disabled={loading} onClick={handleClick}>
      {buttonText} 🛒
    </button>
  );
}
