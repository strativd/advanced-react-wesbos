import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';

// eslint-disable-next-line import/no-cycle
import {
  DELETE_PRODUCT_MUTATION,
  ALL_PRODUCTS_QUERY,
  PRODUCT_COUNT,
} from '../graphql';
import { perPage } from '../config';

// Update the cache directly with Apollo 3.0:
const update = (cache, payload) => {
  // remove cached item after deleting a product
  const cachedItem = cache.identify(payload.data.deleteProduct);
  cache.evict(cachedItem);
};

export default function DeleteProduct({ id, children }) {
  const { query } = useRouter();
  const page = Number(query?.page) || 1;
  const skip = page * perPage - perPage;
  const first = perPage;

  const [deleteProduct, { loading }] = useMutation(DELETE_PRODUCT_MUTATION, {
    variables: { id },
    refetchQueries: [
      {
        query: ALL_PRODUCTS_QUERY,
        variables: {
          skip,
          first,
        },
      },
      { query: PRODUCT_COUNT },
    ],
    // update,
  });

  const handleDelete = () => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm('Are you sure you want to delete this item?')) {
      // Delete product + catch errors after the request
      deleteProduct().catch((err) => alert(err.message));
    }
  };

  return (
    <button type="button" disabled={loading} onClick={handleDelete}>
      {children}
    </button>
  );
}
