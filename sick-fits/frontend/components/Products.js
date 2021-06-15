import { useQuery } from '@apollo/client';
import styled from 'styled-components';

import { perPage } from '../config';
import { ALL_PRODUCTS_QUERY } from '../graphql';
// eslint-disable-next-line import/no-cycle
import Product from './Product';

const ProductsListStyles = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 60px;
`;

export default function Products({ page }) {
  const skip = page * perPage - perPage;

  const { data, error, loading } = useQuery(ALL_PRODUCTS_QUERY, {
    variables: {
      skip,
      first: perPage,
    },
  });

  if (loading) return <p>Loading...</p>;

  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <ProductsListStyles>
        {data.allProducts.map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </ProductsListStyles>
    </div>
  );
}
