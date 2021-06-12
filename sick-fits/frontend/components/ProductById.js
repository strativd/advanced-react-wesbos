import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';

export const PRODUCT_QUERY = gql`
  query PRODUCT_QUERY($id: ID!) {
    Product(where: { id: $id }) {
      id
      name
      description
      price
    }
  }
`;

const ProductById = ({ id }) => {
  const { data, loading, error } = useQuery(PRODUCT_QUERY, {
    variables: { id },
  });

  return (
    <div>
      <code>{JSON.stringify(data)}</code>
    </div>
  );
};

export default ProductById;
