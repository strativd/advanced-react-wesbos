import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';

const DELETE_PRODUCT_MUTATION = gql`
  mutation DELETE_PRODUCT_MUTATION($id: ID!) {
    deleteProduct(id: $id) {
      id
      name
    }
  }
`;

// Update the cache directly with Apollo 3.0:
const update = (cache, payload) => {
  // remove cached item after deleting a product
  const cachedItem = cache.identify(payload.data.deleteProduct);
  cache.evict(cachedItem);
};

export default function DeleteProduct({ id, children }) {
  const [deleteProduct, { loading }] = useMutation(DELETE_PRODUCT_MUTATION, {
    variables: { id },
    update,
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
