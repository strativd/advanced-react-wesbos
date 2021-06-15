import { useMutation } from '@apollo/client';
import { useRouter } from 'next/dist/client/router';
import { perPage } from '../config';

// eslint-disable-next-line import/no-cycle
import {
  DELETE_PRODUCT_MUTATION,
  PRODUCTS_PAGE_QUERY,
  PRODUCT_COUNT_QUERY,
} from '../graphql/products';

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
        query: PRODUCTS_PAGE_QUERY,
        variables: {
          skip,
          first,
        },
      },
      { query: PRODUCT_COUNT_QUERY },
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
