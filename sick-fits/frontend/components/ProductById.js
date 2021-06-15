import { useQuery } from '@apollo/client';
import Head from 'next/head';
import styled from 'styled-components';

import DisplayError from './ErrorMessage';
import { PRODUCT_QUERY } from '../graphql';

const ProductStyles = styled.div`
  display: grid;
  grid-auto-columns: 1fr;
  grid-auto-flow: column;
  max-width: var(--maxWidth);
  justify-content: center;
  align-items: top;
  gap: 2rem;
  img {
    width: 100%;
    object-fit: contain;
  }
`;

export default function ProductById({ id }) {
  const { data, loading, error } = useQuery(PRODUCT_QUERY, {
    variables: {
      id,
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <DisplayError error={error} />;

  const { Product } = data;
  const hasImage = Product?.photo?.id;

  return (
    <ProductStyles>
      <Head>
        <title>Sick Fits | {Product.name}</title>
      </Head>
      {hasImage && (
        <img
          src={Product.photo.image.publicUrlTransformed}
          alt={Product.photo.altText}
        />
      )}
      <div className="details">
        <h2>{Product.name}</h2>
        <p>{Product.description}</p>
      </div>
    </ProductStyles>
  );
}
